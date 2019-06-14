import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class DashboardService {

  private token = "Bearer " + localStorage.getItem('jwt');
  private customerUrl = environment.domain + '/api/customer';
  private commonUrl = environment.domain + '/api/common';
  //private headers = new Headers({ 'Content-Type': 'application/json' })  'Content-Type': 'multipart/form-data',
  private headers = new HttpHeaders({'Authorization': this.token})




  constructor(private httpclient: HttpClient) {

  }

  getLoanInstallments(customerLoanId:number=0):Observable<any>{
    debugger;
    return this.httpclient.get<any>(this.customerUrl + '/installmentlist/' + customerLoanId, {headers : this.headers});
  }

  getinstallment(txnId:number=0):Observable<any>{
    return this.httpclient.get<any>(this.customerUrl + '/getinstallment/' + txnId, {headers : this.headers});
  }

}
