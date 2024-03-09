import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly URL_DB = 'https://iwatch.up.railway.app/user/profile';

  constructor(private readonly myClient: HttpClient) {}

  getUser() {
    return this.myClient.get(this.URL_DB);
  }
}
