import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Card } from 'src/app/models/card';
import { environment } from 'environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private url:string = `${environment.url}/card`;

  constructor(private http: HttpClient) { 
  }

  getAll() {
    return this.http.get(this.url);
  }

  getById(id:string) {
    return this.http.get(this.url + `/${id}`);
  }

  post(body:Card) {
    return this.http.post(this.url, body);
  }

  put(id:string, body:Card) {
    return this.http.put(this.url + `/${id}`, body);
  }

  delete(id:string) {
    return this.http.delete(this.url+`/${id}`);
  }
}
