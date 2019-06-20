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

  private token = "Bearer " + localStorage.getItem('jwt');
  private agentUrl = environment.domain + '/api/agent';
  private commonUrl = environment.domain + '/api/common';
  private customerUrl = environment.domain + '/api/customer';
  private headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this.token });
  private headerClient = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token });

  constructor(private http: Http, private httpclient: HttpClient) {
  }

  register(model:any){
    return this.http.post(this.agentUrl+'/registration',JSON.stringify(model),{ headers: this.headers })
    .map(res => res.json())
      .toPromise();
  }

  getState(){
    return this.http.get(this.commonUrl+'/getstate',{ headers: this.headers })
    .map(res => res.json())
      .toPromise();
  }

  getCity(stateId){
    return this.http.get(this.commonUrl+'/getcity?stateid='+stateId,{ headers: this.headers })
    .map(res => res.json())
      .toPromise();
  }

  getArea(cityId){
    return this.http.get(this.commonUrl+'/getarea?cityId='+cityId,{ headers: this.headers })
    .map(res => res.json())
      .toPromise();
  }

  getAgent(): Observable<Agent[]>{
    // return this.httpclient.get<Agent[]>(this.agentUrl + '/getAgent');
    return this.httpclient.get<Agent[]>(this.commonUrl + '/getAgent',{ headers: this.headerClient });
  }

  editAgent(agentId){
    return this.http.get(this.agentUrl + '/editAgent?userId='+agentId,{ headers: this.headers }).map(res=>res.json());
  }
  
  changeStatus(userId,isActive){
    return this.http.get(this.agentUrl + '/changeStatus/'+ userId+"/"+isActive ,{ headers: this.headers });
  }

  addAgentfund(model:any) {
    return this.http.post(this.agentUrl+'/addAgentfund',JSON.stringify(model),{ headers: this.headers })
      .toPromise();
  }

  // getAgentfund(userId, IsAgent){
  getAgentfund(IsAgent,AgentId){
    debugger;
    // return this.http.get(this.agentUrl + '/getAgentfund/'+ userId + '/'+IsAgent,{ headers: this.headers }).map(res=>res.json());
    return this.http.get(this.agentUrl + '/getAgentfund/'+IsAgent+"/"+AgentId,{ headers: this.headers }).map(res=>res.json());
  }

  isreceivefund(agentfundId, isreceive){
    return this.http.get(this.agentUrl + '/isreceivefund/'+agentfundId+"/"+isreceive,{ headers: this.headers }).map(res=>res.json());
  }

  getCustomerbyAgent(agentId: number):Observable<Customer[]>{
    return this.httpclient.get<Customer[]>(this.customerUrl + '/getcustomersbyagent/' + agentId, {headers : this.headerClient});
  }
}
