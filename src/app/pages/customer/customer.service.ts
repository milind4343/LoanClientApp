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
  private headers = new Headers({ 'Content-Type': 'application/json' })

  constructor(private http: Http, private httpclient: HttpClient) { }

  getCustomers(): Observable<Customer[]>{
    return this.httpclient.get<Customer[]>(this.customerUrl + '/list');
  }

  registerCustomer(req : Customer) {
    return this.http.post(this.customerUrl + '/add', JSON.stringify(req), { headers: this.headers })
    .map(res => res.json())
    .toPromise();
  }


}
