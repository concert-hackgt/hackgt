import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpMethodService {
  constructor(private http: HttpClient) { }

  response: any;

  get(url: string): Observable<any> {
    return this.http.get<any>(url);
  }

  post(url: string, data: any): Observable<any> {
    return this.http.post<any>(url, data);
  }
}
