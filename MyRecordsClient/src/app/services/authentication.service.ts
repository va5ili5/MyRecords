import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../domain/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  endpoint = environment.apiUrl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private userId: string;

  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) { }

  private setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("userId", userId);
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const userId = localStorage.getItem("userId");
    if(!token || !expirationDate || !userId) {
      return
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId
    }
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getToken() {
    return this.token;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  registerUser(user: User) {
    this.http
      .post(this.endpoint + '/users/register', user)
      .subscribe(() => {
        this.router.navigate(["/"]);
      }, error => {
        this.authStatusListener.next(false);
      });
  }

  loginUser(email: string, password: string) {
    const authData: User = { email: email, password: password, username: '', firstname: '', lastname:'' };
    this.http
      .post<{ token: string; expiresIn: number; userId: string }>(
        this.endpoint + '/users/login',
        authData
      )
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.userId = response.userId;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + expiresInDuration * 1000
          );
          this.saveAuthData(token, expirationDate, this.userId);
          this.router.navigate(["/"]);
        }
      }, error => {
        this.authStatusListener.next(false);
      });
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userId = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/"]);
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if(expiresIn > 0) {
      this.token = authInformation.token;
      this.userId = authInformation.userId;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }
}
