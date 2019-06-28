import { Injectable } from "@angular/core";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class DashboardService {

  private token: string = "";
  private customerUrl = environment.domain + '/api/customer';
  private agentUrl = environment.domain + '/api/agent';
  //private headers = new Headers({ 'Content-Type': 'application/json' })  'Content-Type': 'multipart/form-data',
  private headers: HttpHeaders;

  constructor(private httpclient: HttpClient) {

  }

  getLoanInstallments(customerLoanId:number=0):Observable<any>{
    this.token = "Bearer " + localStorage.getItem('jwt');
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token})
    return this.httpclient.get<any>(this.customerUrl + '/installmentlist/' + customerLoanId, {headers : this.headers});
  }

  getinstallment(txnId:number=0):Observable<any>{
    this.token = "Bearer " + localStorage.getItem('jwt');
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token})
    return this.httpclient.get<any>(this.customerUrl + '/getinstallment/' + txnId, {headers : this.headers});
  }


  getvbtranslist():Observable<any>{
    this.token = "Bearer " + localStorage.getItem('jwt');
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token})
    return this.httpclient.get<any>(this.agentUrl + '/getvbtranslist', {headers : this.headers});
  }

 
}
