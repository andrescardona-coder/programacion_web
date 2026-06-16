//Pipe que convierte una puntuación numerica (0-10) en estrellas visuales
import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'stars',
  standalone: true
})

export class StarsPipe implements PipeTransform{
  //value: puntuación de 0 a 10
  //maxStars: cantidad maxima de estrellas (por defecto 5)
  transform(value: number, maxStars: number= 5): string{
    //Convertir escala 0-10 a escala-maxStars
    //Math.round redondea al entero más cercano
    const filledStars= Math.round((value/10) * maxStars);
    //Crear string de estrellas llenas + estrellas vacias
    const filled='★'.repeat(filledStars);
    const empty= '☆'.repeat(maxStars - filledStars);
    return filled + empty;
  }
}
