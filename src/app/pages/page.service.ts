import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  headers:any;
  private master = environment.domain + '/api/menu';
  

  constructor(private http: Http,private httpClient : HttpClient) { }


  getMenuList() {
    let token = 'Bearer'+' '+localStorage.getItem('jwt');
    this.headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': token });
    return this.http.get(this.master + '/list', { headers: this.headers })
      .map(res => res.json())
      .toPromise();
  }

}
