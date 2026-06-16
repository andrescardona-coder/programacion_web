//Definición de todas las rutas de la aplicación
import {Routes} from "@angular/router";

//Importar los componentes de cada pagina
//No importamos Home directamente. Todas las rutas usan lazy loading
// con lo cual se mejora el tiempo de carga inicial
//Route es un array de objetos que mapean URLs a componentes
export const routes: Routes= [
    //Ruta raiz: muestra Home cuando la URL es "/"
    {
        path: '', 
        loadComponent:() =>
        import('./features/home/home')
        .then(m=> m.Home)
    },

    //Ruta con parametro dinamico: :id se reemplaza por el id real
    // /movie/550 → MovieDetail con params['id'] = '550'
    {
        path: 'movie/:id',
        // loadComponent: lazy loading — solo carga el código cuando se visita la ruta
    // Mejora el tiempo de carga inicial de la app
    loadComponent: () =>
      import('./features/movie-detail/movie-detail')
        .then(m => m.MovieDetail)
    },

    //Ruta de favoritos
    {
    path: 'favorites',
    loadComponent: () =>
      import('./features/favorites/favorites')
        .then(m => m.Favorites)
  },

  //Ruta de busqueda
  {
        path: 'search',
        loadComponent: () => import('./features/search-results/search-results').then(m => m.SearchResults)
    },

  // Ruta wildcard: cualquier URL no definida redirige al inicio
  // DEBE ir al final del array (Angular evalúa en orden)
  { path: '**', redirectTo: '' }

];