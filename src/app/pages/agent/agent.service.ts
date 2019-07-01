import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Agent } from '../agent/agent';
import { Observable } from 'rxjs';
import { Customer } from '../customer/customer';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  private token: string = "";
  private headers: Headers;
  private headerClient:HttpHeaders;
  private agentUrl = environment.domain + '/api/agent';
  private commonUrl = environment.domain + '/api/common';
  private customerUrl = environment.domain + '/api/customer';


  constructor(private http: Http, private httpclient: HttpClient) {
  }

  register(model:any){
   this.token = "Bearer " + localStorage.getItem('jwt');
   this.headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this.token });
 
    return this.http.post(this.agentUrl+'/registration',JSON.stringify(model),{ headers: this.headers })
    .map(res => res.json())
      .toPromise();
  }

  getState(){
    this.token = "Bearer " + localStorage.getItem('jwt');
    this.headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this.token });
 
    return this.http.get(this.commonUrl+'/getstate',{ headers: this.headers })
    .map(res => res.json())
      .toPromise();
  }

  getCity(stateId){
    this.token = "Bearer " + localStorage.getItem('jwt');
    this.headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this.token });
 
    return this.http.get(this.commonUrl+'/getcity?stateid='+stateId,{ headers: this.headers })
    .map(res => res.json())
      .toPromise();
  }

  getArea(cityId){
    this.token = "Bearer " + localStorage.getItem('jwt');
    this.headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this.token });
 
    return this.http.get(this.commonUrl+'/getarea?cityId='+cityId,{ headers: this.headers })
    .map(res => res.json())
      .toPromise();
  }

  getAgent(): Observable<Agent[]>{
    this.token = "Bearer " + localStorage.getItem('jwt');
    this.headerClient = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token });
 
    // return this.httpclient.get<Agent[]>(this.agentUrl + '/getAgent');
    return this.httpclient.get<Agent[]>(this.commonUrl + '/getAgent',{ headers: this.headerClient });
  }

  editAgent(agentId){
    this.token = "Bearer " + localStorage.getItem('jwt');
    this.headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this.token });
 
    return this.http.get(this.agentUrl + '/editAgent?userId='+agentId,{ headers: this.headers }).map(res=>res.json());
  }
  
  changeStatus(userId,isActive){
    this.token = "Bearer " + localStorage.getItem('jwt');
    this.headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this.token });
 
    return this.http.get(this.agentUrl + '/changeStatus/'+ userId+"/"+isActive ,{ headers: this.headers });
  }

  addAgentfund(model:any) {
    this.token = "Bearer " + localStorage.getItem('jwt');
    this.headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this.token });
 
    return this.http.post(this.agentUrl+'/addAgentfund',JSON.stringify(model),{ headers: this.headers })
      .toPromise();
  }

  // getAgentfund(userId, IsAgent){
  getAgentfund(IsAgent,AgentId){
    this.token = "Bearer " + localStorage.getItem('jwt');
    this.headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this.token });
 
    // return this.http.get(this.agentUrl + '/getAgentfund/'+ userId + '/'+IsAgent,{ headers: this.headers }).map(res=>res.json());
    return this.http.get(this.agentUrl + '/getAgentfund/'+IsAgent+"/"+AgentId,{ headers: this.headers }).map(res=>res.json());
  }

  isreceivefund(agentfundId, isreceive){
    this.token = "Bearer " + localStorage.getItem('jwt');
    this.headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this.token });
 
    return this.http.get(this.agentUrl + '/isreceivefund/'+agentfundId+"/"+isreceive,{ headers: this.headers }).map(res=>res.json());
  }

  getCustomerbyAgent(agentId: number):Observable<Customer[]>{
    this.token = "Bearer " + localStorage.getItem('jwt');
    this.headerClient = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token });
 
    return this.httpclient.get<Customer[]>(this.customerUrl + '/getcustomersbyagent/' + agentId, {headers : this.headerClient});
  }

  // getAgentVBDetail(agentId:number):Observable<any>{
  //   return this.httpclient.get<any>(this.agentUrl + '/getVB/'+ agentId, {headers: this.headerClient});
  // }

  getAgentVBDetail():Observable<any>{
    this.token = "Bearer " + localStorage.getItem('jwt');
    this.headerClient = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token });
 
    return this.httpclient.get<any>(this.agentUrl + '/getVB',{headers: this.headerClient});
  }

  markAgentVBPaid(vb:any):Observable<any>{
    this.token = "Bearer " + localStorage.getItem('jwt');
    this.headerClient = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token });
    return this.httpclient.post(this.agentUrl + '/paidVB', JSON.stringify(vb), {headers: this.headerClient})
  }

}
