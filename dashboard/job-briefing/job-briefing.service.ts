import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as GlobalVariables  from '../../../global';

@Injectable()
export class JobBriefingService {
// user:any;
// token:any;
    constructor(private http: Http, private _router: Router) {
        // this.user = JSON.parse(localStorage.getItem('currentUser'));
        // this.token = this.user.token;
      }
      assignManagerDetail(taskId:any,token:any)
      {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append("taskId",taskId);
        headers.append("Authorization",token);
        let options = new RequestOptions({ headers: headers });
       // return this.http.get("http://localhost:8084/pmsService/workFlow/assignManagerInfo",options)
        return this.http.get(GlobalVariables.pmsServiceURL+"workFlow/assignManagerInfo",options)
        .map((res: Response) => res.json()
        ).catch(this.handleError); 
      }

      public readUserByUserId(userId:any,token:any){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append("userId",userId);
        headers.append("Authorization",token);
        let options = new RequestOptions({ headers: headers });
      //  return this.http.get("http://localhost:8084/pmsService/packagingTaskFirst/readJobInfo",options)
       return this.http.get(GlobalVariables.pmsServiceURL+"packagingTaskFirst/readJobInfo",options)
        .map((res: Response) => res.json()
        ).catch(this.handleError); 
      }
      
      public readUserByTaskId(taskId:any,token:any){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append("taskId",taskId);
        headers.append("Authorization",token);
        let options = new RequestOptions({ headers: headers });
        return this.http.get(GlobalVariables.pmsServiceURL+"packagingTaskFirst/jobDetails",options)
       // return this.http.get("http://localhost:8084/pmsService/packagingTaskFirst/jobDetails",options)
        .map((res: Response) => res.json()
        ).catch(this.handleError); 
      }

    public JobBriefCreate(a: any,token:any){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append("Authorization",token);
      //  headers.append("userName",a.username);
       // headers.append("Password",a.password);
        let options = new RequestOptions({ headers: headers });
        return this.http.post(GlobalVariables.pmsServiceURL+"packagingTaskFirst/createJob",a,options)
        //return this.http.post("http://localhost:8084/pmsService/packagingTaskFirst/createJob",a,options)
        .map((res: Response) => res.json()
        ).catch(this.handleError);     
    }
    getJobDetails(Id:any,token:any)
    {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append("taskId",Id);
        headers.append("Authorization",token);
        let options = new RequestOptions({ headers: headers });
       // return this.http.get("http://localhost:8084/pmsService/packagingTaskFirst/jobDetails",options)
        return this.http.get(GlobalVariables.pmsServiceURL+"packagingTaskFirst/jobDetails",options)
        .map((res: Response) => res.json()
        ).catch(this.handleError);     

    }
    public addWorkFlow(addWorkFlow:any,token:any)
    {
        let headers = new Headers({ 'Content-Type': 'application/json' });
       let options = new RequestOptions({ headers: headers });
       headers.append("Authorization",token);
    return this.http.post(GlobalVariables.pmsServiceURL+"workFlow/addWorkFlow",addWorkFlow,options)
   // return this.http.post("http://localhost:8084/pmsService/workFlow/addWorkFlow",addWorkFlow,options)
    .map((res: Response) => res.json()
     ).catch(this.handleError);

    }

    public StartWork(a:any,token:any){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append("Authorization",token);
        let options = new RequestOptions({ headers: headers });
        return this.http.post(GlobalVariables.pmsServiceURL+"packagingTaskSecond/startWork",a,options)
       // return this.http.post("http://localhost:8084/pmsService/packagingTaskSecond/startWork",a,options)
        .map((res: Response) => res.json()
        ).catch(this.handleError);
    }
    
    public JobEdit(a:any,token:any){
        let headers = new Headers({'Content-Type': 'application/json' });
        headers.append("Authorization",token);
        // console.log(this.token);
        let options = new RequestOptions({ headers: headers });
        return this.http.post(GlobalVariables.pmsServiceURL+"packagingTaskFirst/updateRecord",a,options)
      //  return this.http.post("http://localhost:8084/pmsService/packagingTaskFirst/updateRecord",a,options)
        .map((res: Response) => res
        ).catch(this.handleError);
    }
    public getClientName(a:any,bar:any,token:any){
        let headers = new Headers({'Content-Type': 'application/json' });
        headers.append("Authorization",token);
        headers.append("clientName",a);
        headers.append("barCodeNumber",bar);
        // console.log(this.token);
        let options = new RequestOptions({ headers: headers });
        return this.http.get(GlobalVariables.pmsServiceURL+"packagingTaskFirst/readClientNameFilter",options)
      //  return this.http.post("http://localhost:8084/pmsService/packagingTaskFirst/updateRecord",a,options)
        .map((res: Response) => res
        ).catch(this.handleError);
    }
    public getClientNameDetails(a:any,token:any){
        let headers = new Headers({'Content-Type': 'application/json' });
        headers.append("Authorization",token);
        headers.append("clientName",a);
        // console.log(this.token);
        let options = new RequestOptions({ headers: headers });
        return this.http.get(GlobalVariables.pmsServiceURL+"packagingTaskFirst/readClientName",options)
      //  return this.http.post("http://localhost:8084/pmsService/packagingTaskFirst/updateRecord",a,options)
        .map((res: Response) => res
        ).catch(this.handleError);
    }

    public detailsFormEdit(obj:any,token:any){

        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append("Authorization",token);
        let options = new RequestOptions({ headers: headers });
       // return this.http.post("http://localhost:8084/pmsService/packagingTaskSecond/updateRecord",obj,options)
        return this.http.post(GlobalVariables.pmsServiceURL+"packagingTaskSecond/updateRecord",obj,options)
                .map((res: Response) => res
                ).catch(this.handleError);

    }

    public JobDetailCreate(obj: any,token:any){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append("Authorization",token);
        let options = new RequestOptions({ headers: headers });
        return this.http.post(GlobalVariables.pmsServiceURL+"packagingTaskSecond/createJob",obj,options)
       // return this.http.post("http://localhost:8084/pmsService/packagingTaskSecond/createJob",obj,options)
        .map((res: Response) => res
        ).catch(this.handleError);     
    }
     public masterJsonObject(token:any)
     {
         let headers = new Headers({'Content-Type':'application/json'});
        
         let options = new RequestOptions({headers:headers})
         headers.append("Authorization",token);
         return this.http.get(GlobalVariables.pmsServiceURL+"masterJson/JsonObjectFile",options)
       //  return this.http.get("http://localhost:8084/pmsService/masterJson/JsonObjectFile",options)
         .map((res:Response)=> res.json()).catch(this.handleError);
     }
     public selectiveUserDetail(token:any){
        let type = 'Manager';
        let headers = new Headers({'Content-Type':'application/json'});
        headers.append("userType",type);
        headers.append("Authorization",token);
         let options = new RequestOptions({headers:headers})
         return this.http.get(GlobalVariables.pmsServiceURL+"user/readTypeOfUser",options)
       //  return this.http.get("http://localhost:8084/pmsService/user/readTypeOfUser",options)
         .map((res:Response)=> res.json()).catch(this.handleError);

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