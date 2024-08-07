import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../../services/restaurant.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {
  bookings: any[] = [];
  timezone: string;
  loading: boolean = true;

  constructor(
    private restaurantService: RestaurantService, 
    private datePipe: DatePipe,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  ngOnInit(): void {
    this.getReservations();
  }

  getReservations() {
    this.loading = true;
    const token = sessionStorage.getItem("token")!;
    const email = sessionStorage.getItem("email")!;
    this.restaurantService.getReservations(email, token).subscribe(response => {
      this.loading = false;
      if (response.status === 200) {
        this.bookings = response.data;
      }
    });
  }

  formatDate(timestamp: number): string {
    const dateObj = new Date(timestamp);
    const formattedDate = this.datePipe.transform(dateObj, 'medium', this.timezone);
    return formattedDate!.split(",")[0] + ", " + formattedDate!.split(",")[1];
  }

  formatTime(timestamp: number): string {
    const dateObj = new Date(timestamp);
    const formattedTime = this.datePipe.transform(dateObj, 'shortTime', this.timezone);;
    return formattedTime!;
  }

  goToRestaurant(restaurantId: string) {
    this.router.navigate(['details', restaurantId]);
  }

  cancelBooking(reservationId: number) {
    this.loading = true;
    const token = sessionStorage.getItem("token")!;
    const email = sessionStorage.getItem("email")!;
    this.restaurantService.cancelReservation(email, reservationId, token).subscribe(response => {
      this.loading = false;
      if (response.status === 200) {
        this.toastr.success(response.message, "Reservation Cancelled!");
        this.getReservations();
      } else {
        this.toastr.error(response.error, "Cancellation Failed!")
      }
    });
  }
}
