import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router'


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  signIn(user: {}) {
    throw new Error('Method not implemented.');
  }

  private URL = 'http://localhost:3000/api'

  constructor(private http: HttpClient, private router: Router) { }

  signUp(user: { email: string; password: string; }){
    return this.http.post<any>(this.URL + '/signup', user)
  }

  sigIn(user: any) {
  return this.http.post<any>(this.URL + '/signin', user)
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken () {
    return localStorage.getItem('token');
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/incidents'])
  }
}
