//Servicio de favoritos con persistencia en localStorage
import {Injectable, inject} from "@angular/core";
//BehavioSubject: Observable que tiene un valor actual y emite a nuevos suscriptores
import {BehaviorSubject, Observable} from "rxjs";
import {map} from "rxjs";
import {Movie} from "../models";
//Importar el servicio storage
import {Storage} from './storage';

@Injectable({providedIn: 'root'})
export class FavoritesService{
  private storage= inject(Storage);
  //Clave para guardar en localStorage
  private readonly KEY= 'cine-explorer-favoritas';

  //Inicializar el BehaviorSubject con los datos guardados en localStorage
  //Si no hay datos guardados, usa un array vacio
  private favoritasSubject= new BehaviorSubject<Movie[]>(
    this.storage.get<Movie[]>(this.KEY, [])
  );

  //Observable publico para que los componentes se suscriban
  favoritas$: Observable<Movie[]>= this.favoritasSubject.asObservable();

  //Observable derivado: cantidad de favoritas
  cantidad$: Observable<number>= this.favoritas$.pipe(
    map(favs=> favs.length)
  );

  agregar(movie: Movie): void{
    const actuales= this.favoritasSubject.value;
    if(!actuales.find(m=> m.id === movie.id)){
      const nuevas= [...actuales, movie];
      //Emitir el nuevo valor de todos los suscriptores
      this.favoritasSubject.next(nuevas);
      //Persistir en localStorage
      this.storage.set(this.KEY, nuevas);
    }
  }

  eliminar(id: number): void{
    const nuevas= this.favoritasSubject.value.filter(m => m.id !== id);
    this.favoritasSubject.next(nuevas);
    //Actualizar localStorage
    this.storage.set(this.KEY, nuevas);
  }

  esFavorita(id: number): boolean {
    return this.favoritasSubject.value.some(m => m.id === id);
  }

  toggle(movie: Movie): void {
    if (this.esFavorita(movie.id)) {
      this.eliminar(movie.id);
    } else {
      this.agregar(movie);
    }
  }

  obtenerTodas(): Movie[] {
    return this.favoritasSubject.value;
  }

  obtenerCantidad(): number {
    return this.favoritasSubject.value.length;
  }


}


