import { Component, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) {}
  logout(): void {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("profilePictureUrl");
    this.router.navigate(['signin']);
  }

  subscribeToOffers(): void {
    const token = sessionStorage.getItem("token")!;
    const email = sessionStorage.getItem("email")!;
    this.authService.subscribeToOffers(email, token).subscribe(response => {
      if (response.status === 200) {
        this.toastr.success("Please accept the subscription request sent to your email ID.", "Verification Required");
      } else {
        this.toastr.error("An error has occurred.", "Error");
      }
    })
  }

  bookings(): void {
    this.router.navigate(['reservations'])
  }

  goToResults(): void {
    this.router.navigate(['results']);
  }

  help(): void {
    this.router.navigate(['help']);
  }

  getProfilePicUrl(): string {
    return sessionStorage.getItem("profilePictureUrl") || "assets/images/default-user.png";
  }
}
