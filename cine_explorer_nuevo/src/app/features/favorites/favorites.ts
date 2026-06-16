//Pagina que muestra las peliculas marcadas como favoritas
import { Component, inject } from '@angular/core';
import { MovieCard } from '../../shared/components/movie-card/movie-card';
import { FavoritesService } from '../../core/services/favorites';
import { Movie } from '../../core/models/movie';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [MovieCard],
  templateUrl: './favorites.html',
})

export class Favorites {
  private favoritesService= inject(FavoritesService);

  //Obtener las pelicuas favoritas del servicio
  get favoritas(): Movie[] {
    return this.favoritesService.obtenerTodas();
  }

  //Quitar de favoritos
  toggleFavorito(movie: Movie): void {
    this.favoritesService.toggle(movie);
  }
}
