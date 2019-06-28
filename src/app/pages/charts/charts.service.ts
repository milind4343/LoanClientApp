import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  private token: string = "";
  private agentUrl = environment.domain + '/api/agent';
  private headers: HttpHeaders;
  
  constructor(private httpclient: HttpClient) { }

  getChartData(data:any){    
    this.token = "Bearer " + localStorage.getItem('jwt');
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token});
    return this.httpclient.post<any[]>(this.agentUrl +'/chartData', JSON.stringify(data),{ headers : this.headers });
  }
}
