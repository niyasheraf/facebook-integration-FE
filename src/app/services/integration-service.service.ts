import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

// import 'rxjs/add/observable/of';


@Injectable({
  providedIn: 'root'
})
export class IntegrationServiceService {

  constructor(private _http: HttpClient, ) { }

  public root = "http://10.8.10.96:7890/"; //django backend

  validateUser(params) {
    return this._http.post(this.root + "integration/validate_user/", params);
  }
  getUserPages(params) {
    return this._http.get(this.root + "integration/user_accounts/", { params: params });
  }
  postPageDetails(params) {
    return this._http.post(this.root + "integration/user_accounts/", params);
  }
}
