import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css'
})
export class FiltersComponent {
  @Input() location: string = "";
  @Output() filters = new EventEmitter<any>();

  applyFilters() {
    const filterList = {
      location: this.location
    };
    this.filters.emit(filterList);
  }
}
