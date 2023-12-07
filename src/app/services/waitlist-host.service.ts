import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WaitlistHost } from '../model/waitlistHost';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { environment } from 'src/environments/environment';
import { WaitlistHostCreateRequest } from '../model/DTO/waitlistHostCreateRequest';
import { WaitlistHostUpdateRequest } from '../model/DTO/waitlistHostUpdateRequest';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class WaitlistHostService {
  private readonly baseUrl = `${environment.apiBaseUrl}/api`;

  constructor(private httpClient: HttpClient, private loginService: LoginService) { }

  public getWaitlistHost(waitlistCode: string): Observable<WaitlistHost> {
    return this.httpClient.get<WaitlistHost>(`${this.baseUrl}/waitlistHost/${waitlistCode}`);
  }

  public getWaitlistQueue(waitlistCode: string): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.baseUrl}/waitlistHost/${waitlistCode}/queue`);
  }

  public getWaitlistByUserId(userId: string): Observable<string> {
    return this.httpClient.get(`${this.baseUrl}/user/${userId}/currentWaitlist`, { responseType: "text" });
  }

  public createWaitlistHost(waitlistHost: WaitlistHostCreateRequest): Observable<WaitlistHost> {
    return this.httpClient.post<WaitlistHost>(`${this.baseUrl}/waitlistHost`, waitlistHost);
  }

  public updateWaitlistHost(waitlistCode: string, waitlistHost: WaitlistHostUpdateRequest) : Observable<WaitlistHost> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.loginService.getToken()}`,
    });

    return this.httpClient.put<WaitlistHost>(`${this.baseUrl}/waitlistHost/${waitlistCode}`, waitlistHost, { headers });
  }

  public deleteWaitlistHost(waitlistCode: string) : Observable<WaitlistHost> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.loginService.getToken()}`,
    });

    return this.httpClient.delete<WaitlistHost>(`${this.baseUrl}/waitlistHost/${waitlistCode}`, { headers });
  }
}
