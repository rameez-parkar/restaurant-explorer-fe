import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-restaurant-item',
  templateUrl: './restaurant-item.component.html',
  styleUrls: ['./restaurant-item.component.css']
})
export class RestaurantItemComponent {
  @Input() restaurant: any;
  @Output() restaurantDetails = new EventEmitter<string>();

  getCuisinesString(cuisines: any[]) {
    return cuisines.reduce((cuisineString, cuisine) => {
      return cuisineString === "" ? cuisine.title : cuisineString + ", " + cuisine.title;
    }, "");
  }

  selectRestaurant(restaurantId: string) {
    this.restaurantDetails.emit(restaurantId);
  }
}
