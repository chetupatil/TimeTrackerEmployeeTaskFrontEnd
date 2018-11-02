import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as GlobalVariables  from '../../../global';

@Injectable()
export class UserSetingsService {
// user:any;
// token:any;
    constructor(private http: Http, private _router: Router) {
        // this.user = JSON.parse(localStorage.getItem('currentUser'));
        // this.token=this.user.token;

      }

    public getUser(userId:any,token:any){
        let headers =new Headers({ 'Content-Type': 'application/json'});
        headers.append("userId",userId);
        headers.append("Authorization",token);
        let options = new RequestOptions({headers:headers})
        return this.http.get(GlobalVariables.pmsServiceURL+"user/viewProfile",options)
       // return this.http.get("http://localhost:8084/pmsService/user/viewProfile",options)
        .map((res: Response) =>res.json()).catch(this.handleError);
    }

    public resetPassword(PassObj:any,userId:any,token){
        let headers = new Headers({ 'Content-Type': 'application/json'});
        headers.append("userId",userId);
        headers.append("Password",PassObj);
        headers.append("Authorization",token)
        let options = new RequestOptions({headers:headers})
        return this.http.get(GlobalVariables.pmsServiceURL+"user/changePassword",options)
       // return this.http.get("http://localhost:8084/pmsService/user/changePassword",options)
        .map((res: Response) =>res).catch(this.handleError);
    }

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