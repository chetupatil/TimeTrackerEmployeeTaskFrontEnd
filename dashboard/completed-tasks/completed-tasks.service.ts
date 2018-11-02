import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as GlobalVariables  from '../../../global';

@Injectable()
export class CompletedTaskService {
  user:any;
  token:any;
    constructor(private http: Http, private _router: Router) {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
        this.token = this.user.token;
      }
      public getWorkHistroy(token:any){
        let headers = new Headers({ 'Content-Type':'application/json' });
      //  console.log(this.token);
        headers.append("Authorization",token);
        let options = new RequestOptions({ headers: headers});
        return this.http.get(GlobalVariables.pmsServiceURL+"historyView/readHistory",options)
        .map(res=>res.json()).catch(this.handleError);
      }
      public getJobs(token:any){
        let headers =new Headers({ 'Content-Type': 'application/json'});
        // console.log(this.token);
        headers.append("Authorization",token);
        let options = new RequestOptions({headers:headers})
      //  return this.http.get("http://localhost:8084/pmsService/packagingTaskFirst/readAllJobInfo",options)
        return this.http.get(GlobalVariables.pmsServiceURL+"packagingTaskFirst/readAllJobInfo",options)
        
        .map((res: Response) =>res.json()).catch(this.handleError);
    }
      public addExternalErrors(error:any,token:any){
        let headers = new Headers({ 'Content-Type':'application/json' });
        headers.append("Authorization",token);
        let options = new RequestOptions({ headers: headers});
        return this.http.post(GlobalVariables.pmsServiceURL+"externalError/addErrorInfo",error,options)
      //  return this.http.post("http://localhost:8084/pmsService/externalError/addErrorInfo",error,options)
        .map(res=>res).catch(this.handleError);
      }
      public updateExternalErrors(updateError:any,token:any){
      let headers = new Headers({ 'Content-Type':'application/json' });
      headers.append("Authorization",this.token);
      let options = new RequestOptions({ headers: headers});
      return this.http.post(GlobalVariables.pmsServiceURL+"externalError/updateErrorDetail",updateError,options)
     // return this.http.post("http://localhost:8084/pmsService/externalError/updateErrorDetail",updateError,options)
      .map(res=>res).catch(this.handleError);
    }
      public readExternalErrors(taskId:any,token:any){
      let headers = new Headers({ 'Content-Type':'application/json' });
      headers.append("taskId",taskId);
      headers.append("Authorization",token);
      let options = new RequestOptions({ headers: headers});
      return this.http.get(GlobalVariables.pmsServiceURL+"externalError/readAll",options)
    //  return this.http.get("http://localhost:8084/pmsService/externalError/readAll",options)
      .map(res=>res.json()).catch(this.handleError);
    }
    public readExternalErrorBasedOnId(Id:any,token:any){
        let headers = new Headers({ 'Content-Type':'application/json' });
        headers.append("id",Id);
        headers.append("Authorization",token);
        let options = new RequestOptions({ headers: headers});
        return this.http.get(GlobalVariables.pmsServiceURL+"externalError/readBasedOnId",options)
       // return this.http.get("http://localhost:8084/pmsService/externalError/readBasedOnId",options)
        .map(res=>res.json()).catch(this.handleError);
      }
      public readTrNumber(token:any){
        let headers = new Headers({ 'Content-Type':'application/json' });
        headers.append("Authorization",token);
        let options = new RequestOptions({ headers: headers});
        return this.http.get(GlobalVariables.pmsServiceURL+"externalError/readTrNumber",options)
       // return this.http.get("http://localhost:8084/pmsService/externalError/readTrNumber",options)
        .map(res=>res.json()).catch(this.handleError);
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