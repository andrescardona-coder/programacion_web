import {Component, input, output} from "@angular/core";
import {RouterLink} from "@angular/router";
import {Movie} from "../../../core/models/movie";
//Importar pipes personalizados
import {TruncatePipe} from  "../../pipes/truncate-pipe";
import {TmdbImagePipe} from "../../pipes/tmdb-image-pipe";
import {StarsPipe} from "../../pipes/stars-pipe";

@Component({
  selector: 'app-movie-card',
  standalone: true,
  //Agregar los pipes a imports para usarlos en el template
  imports: [RouterLink, TruncatePipe, TmdbImagePipe, StarsPipe],
  templateUrl: './movie-card.html',
  styleUrls: ['./movie-card.css']
})

export class MovieCard{
  movie= input.required<Movie>();
  esFavorita= input<boolean>(false);
  toggleFavorito= output<Movie>();

  onToggleFavorito(): void{
    this.toggleFavorito.emit(this.movie());
  }
}