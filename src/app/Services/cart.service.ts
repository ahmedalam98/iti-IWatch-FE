import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly URL_DB = 'https://iwatch.up.railway.app/';

  constructor(private readonly myClient: HttpClient) {}

  getUserCart() {
    return this.myClient.get(this.URL_DB + 'user/cart');
  }

  removeMovieFromCart(movie: object) {
    return this.myClient.post(this.URL_DB + 'user/delete-movie', movie);
  }

  checkoutUserCart(cart: any) {
    return this.myClient.post(this.URL_DB + 'reserve/check-out/seats', cart, {
      headers: new HttpHeaders({
        accept: 'application/json',
      }),
    });
  }
}
