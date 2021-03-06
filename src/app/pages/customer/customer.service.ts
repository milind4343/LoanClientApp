import { Injectable, Optional } from '@angular/core';
import { Http, Headers} from '@angular/http';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Customer } from './customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private token = "Bearer " + localStorage.getItem('jwt');
  private customerUrl = environment.domain + '/api/customer';
  //private headers = new Headers({ 'Content-Type': 'application/json' })  'Content-Type': 'multipart/form-data',
  private headers = new HttpHeaders({'Authorization': this.token})
  

  constructor(private http: Http, private httpclient: HttpClient) { }

  getCustomers(userID: number = 0): Observable<Customer[]>{
    debugger;
    return this.httpclient.get<Customer[]>(this.customerUrl + '/list/' + userID, {headers : this.headers});
  }

  // getCustomers(userID: number = 0) : Promise<Customer[]> {
  //   return this.http.get(this.customerUrl + '/list/'+userID)  
  //   .map(res=>res.json())  
  //   .toPromise();
  //   //.then(res => res.json().data as Customer[]);
  // } 


  //registerCustomer(req : Customer) {
    registerCustomer(formdata : any) : Observable<any> {
    return this.httpclient.post(this.customerUrl + '/add', formdata, { headers : this.headers });
    // .map(res => res.json())
    // .toPromise();
  }


  changeStatus(id: number){
    return this.httpclient.get(this.customerUrl + '/changeStatus/'+ id, {headers: this.headers});
    //return
  }

}
