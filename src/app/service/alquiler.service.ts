import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlquilerService {
  private apiUrl = 'https://localhost:44317/clientes/consultar';

  constructor(private http: HttpClient) {}

  getAlquileres(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
