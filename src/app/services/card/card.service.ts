import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Card } from 'src/app/models/card';
import { environment } from 'environments/environment.development';
import { firstValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private url:string = `${environment.url}/card`;

  constructor(private http: HttpClient) { 
  }

  getAll() {
    return firstValueFrom(this.http.get(this.url));
  }

  getById(id:string) {
    return firstValueFrom(this.http.get(this.url + `/${id}`));
  }

  post(body:Card) {
    return firstValueFrom(this.http.post(this.url, body));
  }

  put(id:string, body:Card) {
    return this.http.put(this.url + `/${id}`, body).subscribe();
  }

  delete(id:string) {
    return this.http.delete(this.url+`/${id}`).subscribe();
  }
}
