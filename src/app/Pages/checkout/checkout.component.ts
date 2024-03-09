import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MoviesService } from '../../Services/movies.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../Services/cart.service';
import { render } from 'creditcardpayments/creditCardPayments';

import { FormsModule } from '@angular/forms';
import { AuthServiceService } from '../../Services/auth-service.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [HttpClientModule, RouterModule, CommonModule, FormsModule],
  providers: [MoviesService, CartService, AuthServiceService],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  // Data will be fetched from the query string + service
  paymentOption: string = '';
  movies: any[] = [];
  userCart: any = {};

  movieCinema: string = '';
  movieDate: string = '';
  movieTime: string = '';
  movieName: string = '';
  movieImg: string = '';
  movieSeats: number[] = [];
  movieRows: number[] = [];

  constructor(
    private moviesService: MoviesService,
    private cartService: CartService,
    private httpClient: HttpClient,
    private authService: AuthServiceService
  ) {
    this.cartService.getUserCart().subscribe({
      next: (data: any) => {
        this.userCart = data;

        if (this.userCart?.cart.length !== 0) {
          this.extractDataFromCart();
        }
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  async ngOnInit(): Promise<void> {
    window.scrollTo(0, 0);

    // PayPal API Integration
    render({
      id: '#myPaypalButtons',
      currency: 'USD',
      value: '100.00',
      onApprove: (details: any) => {
        alert('Transaction Done Successfully');
      },
    });

    try {
      await this.getUserCartWithRetry();
      if (this.userCart?.cart.length !== 0) {
        this.extractDataFromCart();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getUserCartWithRetry(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const retryInterval = setInterval(async () => {
        try {
          const data = await this.cartService.getUserCart().toPromise();
          clearInterval(retryInterval);
          this.userCart = data;
          resolve();
        } catch (error) {
          console.log('Error fetching user cart:', error);
        }
      }, 3500);
    });
  }

  async extractDataFromCart(): Promise<void> {
    for (const item of this.userCart.cart) {
      this.movieCinema = item.cinema;
      this.movieDate = item.date;
      this.movieTime = item.time;
      this.movieName = item.movieName;
      this.movieImg = item.movieImg;
      this.movieSeats = item.seats.map((seat: any) => seat.num);
      this.movieRows = item.seats.map((seat: any) => seat.row);
    }
  }

  async removeMovie(movie: any): Promise<void> {
    try {
      await this.cartService
        .removeMovieFromCart({ deletedMovie: movie })
        .toPromise();
      const data = await this.cartService.getUserCart().toPromise();
      this.userCart = data;
      if (this.userCart?.cart.length !== 0) {
        await this.extractDataFromCart();
      }
    } catch (error) {
      console.log(error);
    }
  }

  checkoutUserCart(cart: any) {
    this.cartService.checkoutUserCart(cart).subscribe({
      next: (data: any) => {
        this.userCart.cart = [];
        this.userCart.totalPrice = 0;
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.extractDataFromCart();
  }

  disableCheckoutButton() {
    if (this.userCart?.cart.length === 0) {
      return true;
    }
    return false;
  }
}
