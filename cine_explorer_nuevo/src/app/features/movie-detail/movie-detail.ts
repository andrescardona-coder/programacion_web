//Pagina de detalle que carga datos reales de la API
import {Component, OnInit, inject, ChangeDetectorRef} from '@angular/core';
//ActivateRoute da acceso a los parametros de la ruta actual
import {ActivatedRoute, RouterLink} from '@angular/router';
import {UpperCasePipe} from '@angular/common';
import {TmdbService} from '../../core/services/tmdb.service';
import {FavoritesService} from '../../core/services/favorites';
import {MovieDetail as MovieDetailInterface, Credits} from '../../core/models/movie';
import {ReviewForm} from './review-form/review-form';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [RouterLink, UpperCasePipe, ReviewForm],
  templateUrl: './movie-detail.html',
})

export class MovieDetail implements OnInit {
  //ActivateRoute contiene información de la ruta actual
  private route= inject(ActivatedRoute);
  private tmdbService= inject(TmdbService);
  private favoritesService= inject(FavoritesService);
  private cdr= inject(ChangeDetectorRef);

  //Estado del componente
  pelicula: MovieDetailInterface | null= null; //null mientras carga
  creditos: Credits | null= null;
  cargando: boolean= true;
  error: string= '';


  ngOnInit(): void {
    //Leer el parametro :id de la URL
    //snapchot contiene los parametros de la ruta
    //params['id'] corresponde al :id definido en app.route.ts
    //El + convierte el string en número
    const id= +this.route.snapshot.params['id'];
    this.cargarPelicula(id);
    this.cargarCreditos(id);
  }

  //Cargar detalle de la pelicula
   cargarPelicula(id: number): void {
    this.tmdbService.obtenerDetalle(id).subscribe({
      next: (data) => {
        this.pelicula = data;
        this.cargando = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.error = 'No se pudo cargar la película';
        this.cargando = false;
        this.cdr.markForCheck();
      }
    });
  }

  //Cargar creditos
  cargarCreditos(id: number): void {
    this.tmdbService.obtenerCreditos(id).subscribe({
      next: (data) => {
        this.creditos = data;
        this.cdr.markForCheck();
      }
    });
  }

  //Verificar si es favorita
  get esFavorita(): boolean {
    return this.pelicula ? this.favoritesService.esFavorita(this.pelicula.id) : false;
  }

  // Alternar favorito
  toggleFavorito(): void {
    if (this.pelicula) {
      this.favoritesService.toggle(this.pelicula);
    }
  }

}
