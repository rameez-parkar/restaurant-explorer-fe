import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../../services/restaurant.service';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent implements OnInit {
  restaurants: any[] = [];
  location: string = "";
  filters: any = {};
  defaultFilters: any = {
    location: ""
  };
  loading: boolean = true;

  constructor(
    private authService: AuthService,
    private restaurantService: RestaurantService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.restaurantService.getCurrentLocation().subscribe((response) => this.defaultFilters.location = response.city);
    this.defaultFilters.location = "Halifax";
    this.getRestaurants();
  }

  getRestaurants() {
    this.loading = true;
    const token = sessionStorage.getItem("token")!;
    const email = sessionStorage.getItem("email");
    this.filters = {
      location: this.location ? this.location : this.defaultFilters.location
    };
    const request = {
      userEmail: email,
      filters: this.filters,
      sort_by: "best_match"
    };
    this.restaurantService.getRestaurants(request, token).subscribe(response => {
      this.loading = false;
      this.restaurants = response.data.businesses
    });
  }

  selectRestaurant(restaurantId: any) {
    this.router.navigate(['details', restaurantId]);
  }

  applyFilters(event: any) {
    this.location = event.location;
    this.getRestaurants();
  }
}
