import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, take, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AdminLoginRequest } from '../model/DTO/adminLoginRequest';
import { AdminLoginResult } from '../model/DTO/adminLoginResult';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly baseUrl = `${environment.apiBaseUrl}/api/login`;
  private httpClient = inject(HttpClient);

  constructor() { }

  public tryLoginAsAdmin(waitlistCode: string, password: string): Observable<any> {
    const body: AdminLoginRequest = {
      waitlistCode: waitlistCode,
      password: password
    };

    return this.httpClient.post<AdminLoginResult>(`${this.baseUrl}/token`, body).pipe(
      take(1),
      tap((result) => {
        localStorage.setItem("adminToken", result.token);
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  public logout(): void {
    localStorage.removeItem("adminToken");
  }

  public getToken(): string | null {
    return localStorage.getItem("adminToken");
  }

  public validateToken(token: string): boolean {
    try {
      const decodedToken = jwtDecode<any>(token);
      const { exp } = decodedToken;

      const isTokenExpired = exp * 1000 < Date.now();

      return !isTokenExpired;
    }
    catch {
      return false;
    }
  }

  public getTokenPayload(token: string): any {
    try {
      const decodedToken = jwtDecode<any>(token);
      return decodedToken;
    }
    catch {
      return {};
    }
  }
}
