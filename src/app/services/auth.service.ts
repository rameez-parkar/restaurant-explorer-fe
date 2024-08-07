import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BACKEND_URL } from '../config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  signIn(request: any) {
    return this.http.post<any>(`${BACKEND_URL}/auth/signin`, request);
  }

  signUp(request: any) {
    return this.http.post<any>(`${BACKEND_URL}/auth/signup`, request);
  }

  getPresignedUrl(email: any) {
    return this.http.post<any>(`${BACKEND_URL}/auth/getPresignedUrl`, {email});
  }

  uploadProfilePic(profilePicture: File, presignedUrl: string) {
    const formData = new FormData();
    formData.append('file', profilePicture);

    return this.http.put(presignedUrl, profilePicture, {
      headers: { 'Content-Type': 'image/jpeg' }
    });
  }

  subscribeToOffers(email: string, token: string) {
    const request = {
      userEmail: email
    };
    return this.http.post<any>(`${BACKEND_URL}/subscribe`, request, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
  }
}
