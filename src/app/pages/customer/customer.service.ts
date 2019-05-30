import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Customer } from './customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private customerUrl = environment.domain + '/api/customer';
  //private headers = new Headers({ 'Content-Type': 'application/json' })
  private headers = new Headers({ 'Content-Type': 'multipart/form-data' })
  

  constructor(private http: Http, private httpclient: HttpClient) { }

  getCustomers(userID: number = 0): Observable<Customer[]>{
    return this.httpclient.get<Customer[]>(this.customerUrl + '/list/'+userID);
  }

  // getCustomers(userID: number = 0) : Promise<Customer[]> {
  //   return this.http.get(this.customerUrl + '/list/'+userID)  
  //   .map(res=>res.json())  
  //   .toPromise();
  //   //.then(res => res.json().data as Customer[]);
  // } 


  //registerCustomer(req : Customer) {
    registerCustomer(formdata : any) {
    return this.http.post(this.customerUrl + '/add', formdata)
    .map(res => res.json())
    .toPromise();
  }


  activeCustomer(IsActive:boolean){
    //return 


  }

}
