import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserLoginService {

    constructor(private http: Http, private _router: Router) {
        // this.user = JSON.parse(localStorage.getItem('currentUser'));
        // this.token=this.user.token;
      }

    //  AddUser(a:any){
    //     let headers = new Headers({ 'Content-Type': 'application/json' });
        
    //     let options = new RequestOptions({ headers: headers });
    //     return this.http.post("http://localhost:8084/pmsService/user/addUser",a,options)
    //     .map((res: Response) => res.json()
    //     ).catch(this.handleError);
    //   }

    //   ManageUsers(){
    //     let headers = new Headers({ 'Content-Type': 'application/json' });
        
    //     let options = new RequestOptions({ headers: headers });
    //     return this.http.get("http://localhost:8084/pmsService/user/readAll",options)
    //     .map((res: Response) => res.json()
    //     ).catch(this.handleError);
    //   }

    private handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}