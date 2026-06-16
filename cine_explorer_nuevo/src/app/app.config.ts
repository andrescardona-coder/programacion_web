//Configuración global de la aplicación
import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';
//provideHttpClient habilita HttpClient en toda la app
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {routes} from './app.routes';
import {apiKeyInterceptor} from './core/interceptors/api-key.interceptor';  // ← Sin "core/"

export const appConfig: ApplicationConfig = {
  providers: [
    //Habilitar el sistema de rutas
    provideRouter(routes),
    //Habilitar HttpClient para hacer peticiones HTTP
    provideHttpClient(withInterceptors([apiKeyInterceptor]))
  ]
};