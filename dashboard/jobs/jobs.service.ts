import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as GlobalVariables  from '../../../global';

@Injectable()
export class JobsService {
    
    constructor(private http: Http, private _router: Router) {
      // this.user = JSON.parse(localStorage.getItem('currentUser'));
      // this.token = this.user.token;
      }

      getJobDetails(token:any){
          let headers = new Headers({ 'Content-Type':'application/json' });
          headers.append("Authorization",token);
          let options = new RequestOptions({ headers: headers});
          return this.http.get(GlobalVariables.pmsServiceURL+"workFlow/readAllWorkFlow",options)
       //   return this.http.get("http://localhost:8084/pmsService/workFlow/readAllWorkFlow",options)
          .map((res:Response)=>res.json()).catch(this.handleError);
      }

      getJobDetailsOfUser(token:any){
        let headers = new Headers({ 'Content-Type':'application/json' });
        var user = JSON.parse(localStorage.getItem('currentUser'));
        headers.append('userId', user.id);
        headers.append("Authorization",token);
        let options = new RequestOptions({ headers: headers});
        return this.http.get(GlobalVariables.pmsServiceURL+"workFlow/readWorkFlowOfUser",options)
      //  return this.http.get("http://localhost:8084/pmsService/workFlow/readAllWorkFlow",options)
        .map((res:Response)=>res.json()).catch(this.handleError);
    }

      public AddWorkFlow(obj:any,token:any){
        let headers = new Headers({ 'Content-Type':'application/json' });
        headers.append("Authorization",token);
        let options = new RequestOptions({ headers: headers});
        return this.http.post(GlobalVariables.pmsServiceURL+"workFlow/updateWorkFlow",obj,options)
       // return this.http.post("http://localhost:8084/pmsService/workFlow/updateWorkFlow",obj,options)
        .map(res=>res.json()).catch(this.handleError);
      }
      public readUser(token:any){
        let headers = new Headers({ 'Content-Type':'application/json' });
        headers.append("Authorization",token);
        let options = new RequestOptions({ headers: headers});
       // return this.http.get("http://localhost:8084/pmsService/user/readAllUserName",options)
        return this.http.get(GlobalVariables.pmsServiceURL+"user/readAllUserName",options)
        .map(res=>res.json()).catch(this.handleError);
      }

      public StartTimer(startTimeObj:any,token:any){
        let headers = new Headers({ 'Content-Type':'application/json' });
        headers.append("Authorization",token);
        let options = new RequestOptions({ headers: headers});
       // return this.http.post("http://localhost:8084/pmsService/workFlow/startTimer",startTimeObj,options)
        return this.http.post(GlobalVariables.pmsServiceURL+"workFlow/startTimer",startTimeObj,options)
        .map((res:Response)=>res.json()).catch(this.handleError);

      }

      public PauseTimer(pauseTimeObj:any,token:any){
        let headers = new Headers({ 'Content-Type':'application/json' });
        headers.append("Authorization",token);
        let options = new RequestOptions({ headers: headers});
       // return this.http.post("http://localhost:8084/pmsService/workFlow/pauseTimer",pauseTimeObj,options)
        return this.http.post(GlobalVariables.pmsServiceURL+"workFlow/pauseTimer",pauseTimeObj,options)
        
        
        .map((res:Response)=>res.json()).catch(this.handleError);

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