import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' 
})
export class WeatherService {

  private apiUrl = 'https://api.openweathermap.org/data/2.5/forecast';
  private apiKey = 'cbf364a5b6689550e42f35163f90fc33';

  constructor(private http: HttpClient) {}

  getCurrentWeather(lat: number, lon: number): Observable<any> {
    const url = `${this.apiUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`;
    return this.http.get<any>(url);
  }

  getForecast(lat: number, lon: number): Observable<any> {
    const url = `${this.apiUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`;
    return this.http.get<any>(url);
  }

  getCurrentWeatherByCity(city: string): Observable<any> {
    const url = `${this.apiUrl}?q=${city}&appid=${this.apiKey}&units=metric`;
    return this.http.get<any>(url);
  }

  getForecastByCity(city: string): Observable<any> {
    const url = `${this.apiUrl}?q=${city}&appid=${this.apiKey}&units=metric`;
    return this.http.get<any>(url);
  }

  processForecastData(forecastList: any[]): any[] {
    const dailyForecast: any[] = [];
    
    const dateMap: { [key: string]: any } = {};
    
    forecastList.forEach((entry) => {
      console.log(entry.dt);
      const date = new Date(entry.dt * 1000).toLocaleDateString();
      if (!dateMap[date]) {
        dateMap[date] = entry; 
      }
    });

    let count = 0;
    for (let key in dateMap) {
      if (count < 5) {
        console.log(dateMap[key]);
        dailyForecast.push(dateMap[key]);
        count++;
      }
    }
    
    return dailyForecast;
  }
}