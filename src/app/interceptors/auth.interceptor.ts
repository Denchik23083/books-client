import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenStorageService } from '../services/token-storage-service';
import { AuthService } from '../services/auth-service';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenStorage = inject(TokenStorageService);
  const authService = inject(AuthService);
  const router = inject(Router);

  const access = tokenStorage.getAccessToken();

  // добавляем access token
  const authReq = access
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${access}`
        }
      })
    : req;

  return next(authReq).pipe(
    catchError((error) => {
      // если не 401 — пробрасываем
      if (error.status !== 401) {
        return throwError(() => error);
      }

      const refresh = tokenStorage.getRefreshToken();

      // если нет refresh → logout
      if (!refresh) {
        tokenStorage.clearTokens();
        router.navigateByUrl('/login');
        return throwError(() => error);
      }

      // пробуем refresh
      return authService.refresh(refresh).pipe(
        switchMap((tokens) => {
          // сохраняем новые токены
          tokenStorage.setTokens(tokens.accessToken, tokens.refreshToken);

          // повторяем оригинальный запрос с новым access
          const newReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${tokens.accessToken}`
            }
          });

          return next(newReq);
        }),
        catchError((refreshError) => {
          // refresh не прошёл → logout
          tokenStorage.clearTokens();
          router.navigateByUrl('/login');
          return throwError(() => refreshError);
        })
      );
    })
  );
};