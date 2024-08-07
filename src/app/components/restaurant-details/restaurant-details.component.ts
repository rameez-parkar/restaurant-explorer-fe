import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantService } from '../../services/restaurant.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.css']
})
export class RestaurantDetailsComponent implements OnInit {
  restaurant: any;
  selectedDate: Date;
  selectedDateTime: number | null;
  selectedTimeSlot: string;
  timeSlots: string[] = ['12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM',
  '9:00 PM', '9:30 PM', '10:00 PM', '10:30 PM', '11:00 PM'];
  minDate;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) { 
    this.selectedDate = new Date();
    this.selectedTimeSlot = '';
    this.selectedDateTime = null;
    this.minDate = new Date();
  }

  ngOnInit(): void {
    const restaurantId = this.route.snapshot.paramMap.get('id');
    const token = sessionStorage.getItem("token")!;
    const email = sessionStorage.getItem("email");
    const request = {
      userEmail: email,
      restaurantId: restaurantId
    };
    this.restaurantService.getRestaurantDetails(request, token).subscribe(response => {
      this.loading = false;
      this.restaurant = response.data;
    });
  }

  getCuisines(cuisines: any[]) {
    return cuisines.reduce((cuisineString, cuisine) => {
      return cuisineString === "" ? cuisine.title : cuisineString + ", " + cuisine.title;
    }, "");
  }

  updateDateTime(): void {
    if (this.selectedDate && this.selectedTimeSlot) {
      const [time, meridiem] = this.selectedTimeSlot.split(' ');
  
      let [hours, minutes] = time.split(':').map(Number);
  
      if (meridiem === 'PM' && hours < 12) {
        hours += 12;
      } else if (meridiem === 'AM' && hours === 12) {
        hours = 0;
      }
  
      this.selectedDate.setHours(hours, minutes);
  
      this.selectedDateTime = this.selectedDate.getTime();
    } else {
      this.selectedDateTime = null;
    }
  }

  onDateChange(event: any): void {
    this.selectedDate = event.value;
    this.updateDateTime();
  }

  onTimeSlotChange(slot: string): void {
    this.selectedTimeSlot = slot;
    this.updateDateTime();
  }

  dateFilter = (date: Date | null): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0 for comparison
    return !date || date >= today;
  };

  formatTimestamp(timestamp: number): string {
    const dateObj = new Date(timestamp);
    const date = dateObj.toLocaleDateString();
    const time = dateObj.toLocaleTimeString();
    return `${date} ${time}`;
  }

  reserveTable(): void {
    this.loading = true;
    const token = sessionStorage.getItem("token")!;
    const email = sessionStorage.getItem("email");
    const request = {
      "userEmail": email,
      "restaurantId": this.restaurant.id,
      "restaurantName": this.restaurant.name,
      "reservationTimestamp": this.selectedDateTime
    };
    this.restaurantService.reserveTable(request, token).subscribe(response => {
      this.loading = false;
      if (response.status === 200) {
        this.toastr.success(`Your Resevation ID is ${response.reservationId} at ${response.restaurantName} on ${this.formatTimestamp(+response.reservationTimestamp)} in the name of ${response.reservedByName}.`, response.message);
      } else {
        this.toastr.error("An error has occurred.", "Error");
      }
    });
  }
}
