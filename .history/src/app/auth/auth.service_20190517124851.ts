import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';


@Injectable()
export class AuthService {

  private acountUrl = environment.domain + '/api/account';
  
  private headers = new Headers({ 'Content-Type': 'application/json' })

  constructor(private http: Http) {

  }

  login(model: any) {
    return this.http.post(this.acountUrl + '/login', JSON.stringify(model), { headers: this.headers })
      .map(res => res.json())
      .toPromise();
  }

  register(model:any){
    return this.http.post(this.acountUrl+'/registration')
  }
}
