//Servicio que consume la API de TMDB para obtener datos de peliculas
import {Injectable, inject} from '@angular/core';
//HttpClient es el cliente HTTP de angular
import {HttpClient} from '@angular/common/http';
//Observable es el tipo de retorno de las peticiones HTTP en Angular
import {Observable, catchError, throwError} from 'rxjs';
//Importar las interfaces que se crearon en el capitulo 1
import {Movie, MovieResponse, MovieDetail, Credits, Genre } from './../models/movie';
import {environment} from '../../../environments/environment';

@Injectable ({providedIn: 'root'})
export class TmdbService{
   private apiUrl= environment.tmdbBaseUrl;
   private http= inject(HttpClient);
    

        // Obtener peliculas populares
    obtenerPopulares(page: number = 1): Observable<MovieResponse> {
        return this.http.get<MovieResponse>(`${this.apiUrl}/movie/popular`, {
            params: {
                language: 'es-ES',
                page: page.toString()
            }
        }).pipe(
            catchError(error => {
                console.error('Error HTTP:', error);
                if (error.status === 0) return throwError(() => new Error('Sin conexión a internet'));
                if (error.status === 401) return throwError(() => new Error('API key inválida'));
                if (error.status === 404) return throwError(() => new Error('Recurso no encontrado'));
                return throwError(() => new Error('Error del servidor'));
            })
        );
    }

    // Obtener peliculas mejor valoradas
    obtenerTopRated(page: number = 1): Observable<MovieResponse> {
        return this.http.get<MovieResponse>(`${this.apiUrl}/movie/top_rated`, {
            params: {
                language: 'es-ES',
                page: page.toString()
            }
        }).pipe(
            catchError(error => {
                console.error('Error HTTP:', error);
                if (error.status === 0) return throwError(() => new Error('Sin conexión a internet'));
                if (error.status === 401) return throwError(() => new Error('API key inválida'));
                if (error.status === 404) return throwError(() => new Error('Recurso no encontrado'));
                return throwError(() => new Error('Error del servidor'));
            })
        );
    }

    // Obtener próximos estrenos
obtenerUpcoming(page: number = 1): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(`${this.apiUrl}/movie/upcoming`, {
        params: {
            language: 'es-ES',
            page: page.toString()
        }
    }).pipe(
        catchError(error => {
            console.error('Error HTTP:', error);
            if (error.status === 0) return throwError(() => new Error('Sin conexión a internet'));
            if (error.status === 401) return throwError(() => new Error('API key inválida'));
            if (error.status === 404) return throwError(() => new Error('Recurso no encontrado'));
            return throwError(() => new Error('Error del servidor'));
        })
    );
}

    // Obtener detalle completo de una pelicula por su ID
    obtenerDetalle(id: number): Observable<MovieDetail> {
        return this.http.get<MovieDetail>(`${this.apiUrl}/movie/${id}`, {
            params: {language: 'es-ES'}
        }).pipe(
            catchError(error => {
                console.error('Error HTTP:', error);
                if (error.status === 0) return throwError(() => new Error('Sin conexión a internet'));
                if (error.status === 401) return throwError(() => new Error('API key inválida'));
                if (error.status === 404) return throwError(() => new Error('Recurso no encontrado'));
                return throwError(() => new Error('Error del servidor'));
            })
        );
    }

    // Buscar peliculas por texto
    buscar(query: string, page: number = 1): Observable<MovieResponse> {
        return this.http.get<MovieResponse>(`${this.apiUrl}/search/movie`, {
            params: {
                query: query,
                language: 'es-ES',
                page: page.toString()
            }
        }).pipe(
            catchError(error => {
                console.error('Error HTTP:', error);
                if (error.status === 0) return throwError(() => new Error('Sin conexión a internet'));
                if (error.status === 401) return throwError(() => new Error('API key inválida'));
                if (error.status === 404) return throwError(() => new Error('Recurso no encontrado'));
                return throwError(() => new Error('Error del servidor'));
            })
        );
    }

    // Obtener creditos de una pelicula
    obtenerCreditos(id: number): Observable<Credits> {
        return this.http.get<Credits>(`${this.apiUrl}/movie/${id}/credits`, {}).pipe(
            catchError(error => {
                console.error('Error HTTP:', error);
                if (error.status === 0) return throwError(() => new Error('Sin conexión a internet'));
                if (error.status === 401) return throwError(() => new Error('API key inválida'));
                if (error.status === 404) return throwError(() => new Error('Recurso no encontrado'));
                return throwError(() => new Error('Error del servidor'));
            })
        );
    }

    // Obtener lista de generos
    obtenerGeneros(): Observable<{ genres: Genre[] }> {
        return this.http.get<{ genres: Genre[] }>(`${this.apiUrl}/genre/movie/list`, {
            params: { language: 'es-ES' }
        }).pipe(
            catchError(error => {
                console.error('Error HTTP:', error);
                if (error.status === 0) return throwError(() => new Error('Sin conexión a internet'));
                if (error.status === 401) return throwError(() => new Error('API key inválida'));
                if (error.status === 404) return throwError(() => new Error('Recurso no encontrado'));
                return throwError(() => new Error('Error del servidor'));
            })
        );
    }
}