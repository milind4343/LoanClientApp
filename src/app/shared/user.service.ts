import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = environment.domain + '/api/common';
  private header = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private httpclient: HttpClient) { }

  getUserByEmail(email:string, userId: string){  
    return this.httpclient.get<any>(this.url + '/isuniquemail/' + email + '/' + userId, { headers: this.header });
  }

}
