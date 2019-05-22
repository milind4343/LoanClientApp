import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';

@Injectable()
export class DashboardService {

  private token = 'Bearer' + localStorage.getItem('jwt');
  private weatherUrl = environment.domain + '/api/SampleData';
  private headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this.token });



  constructor(private http: Http) {

  }

  getWeatherInfo() {

    return this.http.get(this.weatherUrl + '/WeatherForecasts', { headers: this.headers })
      .map(res => res.json())
      .toPromise();
  }

}
