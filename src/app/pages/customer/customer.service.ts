import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Customer } from './customer';
import { Agent } from '../agent/agent'
import { CustomerLoan } from './customer-loan';

@Injectable({
  providedIn: 'root'
})

export class CustomerService {

  private token: string = "";
  private customerUrl = environment.domain + '/api/customer';
  private commonUrl = environment.domain + '/api/common';
  //private headers = new Headers({ 'Content-Type': 'application/json' })  'Content-Type': 'multipart/form-data',
  private headers: HttpHeaders;
  private multipartheaders: HttpHeaders;

  constructor(private httpclient: HttpClient) { 
   
  }

  getCustomers(userID: number = 0): Observable<Customer[]>{
    this.token = "Bearer " + localStorage.getItem('jwt');
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token})
    return this.httpclient.get<Customer[]>(this.customerUrl + '/list/' + userID, {headers : this.headers});
  }

  // getCustomers(userID: number = 0) : Promise<Customer[]> {
  //   return this.http.get(this.customerUrl + '/list/'+userID)  
  //   .map(res=>res.json())  
  //   .toPromise();
  //   //.then(res => res.json().data as Customer[]);
  // } 

  registerCustomer(formdata : any) : Observable<any> {    
      this.token = "Bearer " + localStorage.getItem('jwt');
      this.multipartheaders = new HttpHeaders({'Authorization': this.token})
      return this.httpclient.post(this.customerUrl + '/add', formdata, { headers : this.multipartheaders });
  }

  getAgent(): Observable<Agent[]> {    
    return this.httpclient.get<Agent[]>(this.commonUrl + '/getAgent');
  }

  getloantype(): Observable<any[]> {
    return this.httpclient.get<any[]>(this.commonUrl + '/getloantype');
  }

  changeStatus(id: number){
    this.token = "Bearer " + localStorage.getItem('jwt');
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token})
    return this.httpclient.get(this.customerUrl + '/changeStatus/'+ id, {headers: this.headers});
  }

  assignloan(loanrequest:any):Observable<any>{
    this.token = "Bearer " + localStorage.getItem('jwt');
    this.multipartheaders = new HttpHeaders({'Authorization': this.token})
    return this.httpclient.post(this.customerUrl + '/assign', loanrequest, { headers : this.multipartheaders });
  }
  
  uploadLoanDoc(formdata: FormData){
    this.token = "Bearer " + localStorage.getItem('jwt');
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token})
    return this.httpclient.post(this.customerUrl + '/UploadLoanDoc', formdata, {headers : this.headers});
  }

  getDocType(): Observable<any[]>{
    return this.httpclient.get<any[]>(this.commonUrl + '/getdocumenttypes');
  }

  getUplodedDoc(userId: number): Observable<any>{
    this.token = "Bearer " + localStorage.getItem('jwt');
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token})
    return this.httpclient.get<any>(this.customerUrl + '/getuploadedloandoc/' + userId,  {headers : this.headers});
  }

  getCustomerLoan(userID: number = 0): Observable<any>{
    this.token = "Bearer " + localStorage.getItem('jwt');
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token})
    return this.httpclient.get<any>(this.customerUrl + '/loanlist/' + userID, {headers : this.headers});
  }

  getLoanInstallments(customerLoanId:number=0):Observable<any>{
    this.token = "Bearer " + localStorage.getItem('jwt');
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token})
    return this.httpclient.get<any>(this.customerUrl + '/installmentlist/' + customerLoanId, {headers : this.headers});
  }

  getInstallmentData(id: number): Observable<any>{
    this.token = "Bearer " + localStorage.getItem('jwt');
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token})
    return this.httpclient.get<any>(this.customerUrl + '/getinstallment/' + id, {headers : this.headers});
  }

  markinstallmentpaid(data: CustomerLoan): Observable<any> {
    this.token = "Bearer " + localStorage.getItem('jwt');
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token})
    return this.httpclient.post<any>(this.customerUrl + '/markpaid', JSON.stringify(data), {headers : this.headers})
  }

  getCustomerbyAgent(agentId: number):Observable<Customer[]>{
    this.token = "Bearer " + localStorage.getItem('jwt');
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token})
    return this.httpclient.get<Customer[]>(this.customerUrl + '/getcustomersbyagent/' + agentId, {headers : this.headers});
  }

}
