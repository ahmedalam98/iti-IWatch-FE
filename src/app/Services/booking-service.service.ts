import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookingServiceService {
  constructor(public http: HttpClient) {}

  getCinemas(movieName: any): Observable<any> {
    let headers = {
      headers: new HttpHeaders({
        accept: 'application/json',
      }),
    };
    return this.http.post<any>(
      'https://iwatch.up.railway.app/reserve/movie-name',
      movieName,
      headers
    );
  }
  getDates(details: {}) {
    let headers = {
      headers: new HttpHeaders({
        accept: 'application/json',
      }),
    };
    return this.http.post<any>(
      'https://iwatch.up.railway.app/reserve/cinema-name/dates',
      details,
      headers
    );
  }
  getTimes(details: {}) {
    let headers = {
      headers: new HttpHeaders({
        accept: 'application/json',
      }),
    };
    return this.http.post<any>(
      'https://iwatch.up.railway.app/reserve//cinema-name/dates/movies/times',
      details,
      headers
    );
  }
  getReservedSeats(details: {}) {
    let headers = {
      headers: new HttpHeaders({
        accept: 'application/json',
      }),
    };
    return this.http.post<any>(
      'https://iwatch.up.railway.app/reserve//reserved-seats',
      details,
      headers
    );
  }
  getMovieByName(name: {}) {
    let headers = {
      headers: new HttpHeaders({
        accept: 'application/json',
      }),
    };
    return this.http.post<any>(
      'https://iwatch.up.railway.app/movies/movie-name',
      name,
      headers
    );
  }

  addToCart(data: any) {
    let headers = {
      headers: new HttpHeaders({
        accept: 'application/json',
      }),
    };
    return this.http.post<any>(
      'https://iwatch.up.railway.app/reserve/add/seats',
      data,
      headers
    );
  }
}
