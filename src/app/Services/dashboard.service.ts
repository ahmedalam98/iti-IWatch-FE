import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly URL_DB = 'https://iwatch.up.railway.app/dashboard/report';

  constructor(private readonly myClient: HttpClient) {}

  getDashboard() {
    return this.myClient.get(this.URL_DB);
  }
}
