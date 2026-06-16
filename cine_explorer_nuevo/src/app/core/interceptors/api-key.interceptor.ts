import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const apiKeyInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes('api.themoviedb.org')) {
    const clonedReq = req.clone({
      setParams: {
        api_key: environment.tmdbApiKey
      }
    });
    return next(clonedReq);
  }
  return next(req);
};