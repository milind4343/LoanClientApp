import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { HttpClient} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Agent } from '../agent/agent-list/agent';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  private agentUrl = environment.domain + '/api/agent';
  private commonUrl = environment.domain + '/api/common';
  
  private headers = new Headers({ 'Content-Type': 'application/json' })

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
    return this.httpclient.get<Agent[]>(this.commonUrl + '/getAgent');
  }

  editAgent(agentId){
    return this.http.get(this.agentUrl + '/editAgent?userId='+agentId,{ headers: this.headers }).map(res=>res.json());
  }
  
  changeStatus(userId,isActive){
    return this.http.get(this.agentUrl + '/changeStatus?userId='+userId+'&isActive='+isActive,{ headers: this.headers });
  }


  addAgentfund(model:any){
    return this.http.post(this.agentUrl+'/addAgentfund',JSON.stringify(model),{ headers: this.headers })
    .map(res => res.json())
      .toPromise();
  }


  getAgentfund(userId){
    return this.http.get(this.agentUrl + '/getAgentfund?userId='+userId,{ headers: this.headers }).map(res=>res.json());
  }
  

  isreceivefund(agentfundId,isreceive){
    return this.http.get(this.agentUrl + '/isreceivefund?agentfundId='+agentfundId+'&isreceive='+isreceive,{ headers: this.headers });
  }


  
  // getAgent(){
  //   return this.http.get(this.agentUrl+'/getAgent',{ headers: this.headers })
  //   .map(res => res.json())
  //     .toPromise();
  // }

  
}
