import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-search',
  standalone: true,
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  imports: [ReactiveFormsModule]
})
export class SearchComponent {
  searchControl = new FormControl('');
  @Output() searchEvent = new EventEmitter<string>();

  constructor(private weatherService: WeatherService) {}

  search() {
    const location = this.searchControl.value?.trim();
    if (location) {
      this.searchEvent.emit(location);  
    }
  }
}