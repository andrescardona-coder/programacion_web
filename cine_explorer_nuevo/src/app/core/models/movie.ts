
//Pelicula basica
export interface Movie {
id: number; //Id unico de la pelicula  
title: string; //Titulo de la pelicula
overview: string; //Sinopsis
poster_path: string; //Ruta de poster
backdrop_path: string; //Ruta de la imagen de fondo
vote_average: number; //Puntuación de la pelicula
release_date: string; //Fecha estreno YYYY-MM-DD
genre_ids: number[]; //Array de id's de generos 
} 

//Interfaz para la respuesta paginada de la API
export interface MovieResponse{
    page: number; //# Pagina actual
    results: Movie[]; //Array de peliculas en la pagina
    total_pages: number; //Total paginas disponibles
    total_results: number; //Total resultados encontrados
}

//Detalle completo de una pelicula
// "extends" hereda todas las propiedades de Pelicula
export interface MovieDetail extends Movie{
    runtime: number; //Duración en minutos
    genres: Genre[]; //Array de objetos genero 
    budget: number; //Presupuesto en dolares
    revenue: number; //Recaudación en dolares
    tagline: string; //Frase promocional  
    original_language: string;
}


//Genero de la pelicula
export interface Genre{
    id: number; //ID del genero
    name: string; //Nombre del genero(comedio, acción, etc)
}


//Creditos de la pelicula
export interface Credits{
    cast: CastMember[]; //Actores
    crew: CrewMember[]; //Equipo tecnico (director, asistentes, etc)
}

//Miembros del grupo de actores
export interface CastMember{
    id: number; //ID del actor
    name: string; //Nombre del actor
    character: string; //Personaje que interpreta
    profile_path: string|null; //Foto del actor(puede ser null) 
}

//Miembros del equipo tecnico
export interface CrewMember{
    id: number; //ID del miembro
    name: string; //Nombre
    job: string; //Rol (director, productor, etc)
}

