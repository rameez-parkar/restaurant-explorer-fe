import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BACKEND_URL } from '../config';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  constructor(private http: HttpClient) { }

  getRestaurants(request: any, token: string) {
    return this.http.post<any>(`${BACKEND_URL}/restaurant/search`, request, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
  }

  getRestaurantDetails(request: any, token: string) {
    return this.http.post<any>(`${BACKEND_URL}/restaurant/details`, request, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
  }

  reserveTable(request: any, token: string) {
    return this.http.post<any>(`${BACKEND_URL}/restaurant/reservation`, request, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
  }

  getReservations(email: string, token: string) {
    const request = {
      userEmail: email
    };
    return this.http.post<any>(`${BACKEND_URL}/reservations`, request, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
  }

  cancelReservation(email: string, id: number, token: string) {
    const request = {
      userEmail: email,
      id: id
    };
    return this.http.post<any>(`${BACKEND_URL}/cancel-reservation`, request, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
  }

  getCurrentLocation() {
    return this.http.get<any>('https://geolocation-db.com/json');
  }
}
