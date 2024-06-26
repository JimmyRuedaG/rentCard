// rental.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  private apiUrl = 'https://localhost:44317/clientes/estadistica';

  constructor(private http: HttpClient) {}

  getRentalsStatistics(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }
}
