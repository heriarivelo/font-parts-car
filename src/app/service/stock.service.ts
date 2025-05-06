import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getStocks(): Observable<any> {
    return this.http.get(`${this.apiUrl}/stock/list`);
  }

  getStockAnalytics(): Observable<any> {
    return this.http.get(`${this.apiUrl}/stock/analytics`);
  }
}