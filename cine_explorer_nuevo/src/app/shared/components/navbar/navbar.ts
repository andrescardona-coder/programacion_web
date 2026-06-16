//Navbar con buscador reactivo que usa debounce
import {Component, inject} from "@angular/core";
import {RouterLink, RouterLinkActive, Router} from "@angular/router";
//FormControl es un control de formulario reactivo
import {FormControl, ReactiveFormsModule} from "@angular/forms";
//Operador RxJS para el buscador
import {debounceTime, distinctUntilChanged, filter} from "rxjs";
import {FavoritesService} from "../../../core/services/favorites";
import {ThemeService} from "../../../core/services/theme";

@Component({
  selector: 'app-navbar',
  standalone: true,
  // ReactiveFormsModule es necesario para usar [formControl]
  imports: [RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})

export class Navbar{
  private favoritesServices= inject(FavoritesService);
  private router= inject(Router);
  private themeService= inject(ThemeService);
 //FormControl para el input de búsqueda
 //Cada vez que el usuario escribe, emite el nuevo valor como Observable
 searchControl= new FormControl('');

 get cantidadFavoritas(): number{
  return this.favoritesServices.obtenerCantidad();
 }

 get temaActual(): string{
  return this.themeService.obtenerTema();
 }

 toggleTema(): void{
  this.themeService.toggle();
 }

 constructor(){
   //valueChanges es un Observable que emite cada vez que el input cambia
   this.searchControl.valueChanges.pipe(
    //debounceTime(300): esoera 300ms despues del ultimo tecleo
    //Si el usuario sigue escribiendo, reinicia eñ timer
    debounceTime(300),
    //distictUntilChanged: solo emite si el valor es diferente al anterior
    //Evita peticiones duplicadas sin el usuario borra y reescribe lo mismo
    distinctUntilChanged(),
    //filter: solo emite si el texto tiene 2+ caracteres
    //Evita buscar con textos muy cortos
    filter(term=> !!term && term.length >= 2)
   ).subscribe(term=>{
      //Navega a la pagina de resultados con el termino query param
      this.router.navigate(['/search'], {queryParams: {q: term}}); 
    });
 }
}