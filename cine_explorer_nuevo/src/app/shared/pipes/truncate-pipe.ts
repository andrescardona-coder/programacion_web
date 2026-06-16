//Pipe que trunca texto largo y agrega "..." al final
import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  //name: nombre que se usa en el template |
  name: 'truncate',
  //standalone: true para poder importarlo directamente
  standalone: true
})

//PipeTransform obliga a implementar el metodo transform()
export class TruncatePipe implements PipeTransform{
  //transform recibe el valor original y parametros opcionales
  //value: el texto a truncar
  //limit: maximo de caracteres (por defecto 100)
  //trail: texto que se agrega al final (por defecto "...")
  transform(value: string, limit: number= 100, trail: string= '...'): string{
    //Si no hay valor, retorna vacio
    if(!value) return'';
    //Si el texto es más corto que el limite, retornarlo completo
    if (value.length <= limit) return value;
    //Cortar el texto y agregar el trail
    return value.substring(0, limit).trim()+ trail;
  }

}
