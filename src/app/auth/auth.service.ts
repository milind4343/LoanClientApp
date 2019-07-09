import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class AuthService {

  private acountUrl = environment.domain + '/api/account';
  
  private headers = new Headers({ 'Content-Type': 'application/json' })

  constructor(private http: Http,private httpclient: HttpClient) {

  }

  login(model: any) {
    return this.http.post(this.acountUrl + '/login', JSON.stringify(model), { headers: this.headers })
      .map(res => res.json())
      .toPromise();
  }

  register(model:any){
    return this.http.post(this.acountUrl+'/registration',JSON.stringify(model),{ headers: this.headers })
    .map(res => res.json())
      .toPromise();
  }

  forgotpassword(email:string){
    return this.http.get(this.acountUrl+'/forgotpassword/'+email,{headers: this.headers })
  }
}
