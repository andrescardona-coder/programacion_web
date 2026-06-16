//Pagina principal que carga peliculas reales de la API
import { Component, OnInit, inject, ChangeDetectorRef } from "@angular/core";
import { MovieCard } from "../../shared/components/movie-card/movie-card";
import { TmdbService } from "../../core/services/tmdb.service";
import { FavoritesService } from "../../core/services/favorites";
import { Movie } from "../../core/models/movie";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MovieCard],
  templateUrl: './home.html'
})

export class Home implements OnInit{
  //Inyectar los servicios
  private tmdbService= inject(TmdbService);
  private favoritesService= inject(FavoritesService);

  // ChangeDetectorRef permite notificar a Angular que los datos cambiaron
  // Lo necesitamos porque las respuestas HTTP pueden llegar en un momento
  // en que Angular no está "escuchando" cambios (especialmente en la primera carga)
  private cdr= inject(ChangeDetectorRef);

  //Estado del componente
  peliculas: Movie[] = [] //Lista de peliculas cargadas
  peliculasTopRated: Movie[] = [];
  peliculasUpcoming: Movie[] = [];
  cargando: boolean= true; //Indicador de carga
  error: string= ''; //mensaje de error (vacio=sin error)

  //ngOnInit se ejecuta al crear el componente
  ngOnInit(): void {
    this.cargarPeliculas();
    this.cargarTopRated();
    this.cargarUpcoming();
  }

  //Cargar peliculas populares
  cargarPeliculas(): void{
    this.cargando= true; //Mostrar spinner
    this.error= ''; //Limpiar error anterior

    //subscribe() se suscribe el observable que retorna el servicio
    //next: se ejecuta cuando llegan los datos
    //error: se ejecuta si la petición falla
    this.tmdbService.obtenerPopulares().subscribe({
      next: (response)=> {
        //response es de tipo MovieResponse 
        this.peliculas= response.results;
        this.cargando= false;
        // markForCheck() le dice a Angular: "los datos cambiaron, actualizá la vista"
        // Sin esto, el spinner puede quedarse girando para siempre en la primera carga
        this.cdr.markForCheck();
      },
      error: (err)=> {
        console.error('Error al cargar las peliculas:', err);
        this.error= 'No se pueden cargar las peliculas. Verifique su conexión a internet'
        this.cargando= false;
        this.cdr.markForCheck();
      }
    });
  }

  // Cargar películas mejor valoradas
cargarTopRated(): void {
  this.tmdbService.obtenerTopRated().subscribe({
    next: (response) => {
      this.peliculasTopRated = response.results;
      this.cdr.markForCheck();
    },
    error: (err) => {
      console.error('Error al cargar mejor valoradas:', err);
    }
  });
}

// Cargar próximos estrenos
cargarUpcoming(): void {
  this.tmdbService.obtenerUpcoming().subscribe({
    next: (response) => {
      this.peliculasUpcoming = response.results;
      this.cdr.markForCheck();
    },
    error: (err) => {
      console.error('Error al cargar próximos estrenos:', err);
    }
  });
}

  esFavorita(id: number): boolean{
    return this.favoritesService.esFavorita(id);
  }

  toggleFavorito(movie:Movie): void{
    this.favoritesService.toggle(movie);
  }

}