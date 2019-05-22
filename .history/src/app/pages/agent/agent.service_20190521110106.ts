import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  private agentUrl = environment.domain + '/api/agent';
  
  private headers = new Headers({ 'Content-Type': 'application/json' })

  constructor(private http: Http) {

  }

  register(model:any){
    return this.http.post(this.agentUrl+'/registration',JSON.stringify(model),{ headers: this.headers })
    .map(res => res.json())
      .toPromise();
  }

  getState(){
    return this.http.get(this.agentUrl+'/getstate',{ headers: this.headers })
    .map(res => res.json())
      .toPromise();
  }

  getCity(stateId){
    return this.http.get(this.agentUrl+'/getcity?stateid='+stateId,{ headers: this.headers })
    .map(res => res.json())
      .toPromise();
  }

  getArea(cityId){
    return this.http.get(this.agentUrl+'/get?getarea='+cityId,{ headers: this.headers })
    .map(res => res.json())
      .toPromise();
  }

  
}
