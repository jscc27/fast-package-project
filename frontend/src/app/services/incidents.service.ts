import { Injectable } from '@angular/core';
import {HttpClient  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IncidentsService {

  private URL = 'http://localhost:3000/api'


  constructor(private http: HttpClient) { }

  getPrivateIncidents(){;
    return this.http.get<any>(this.URL + '/private-incidents');
  }



}
