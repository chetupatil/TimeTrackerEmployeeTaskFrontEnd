import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as _ from 'underscore';
import * as GlobalVariables  from '../../../global';

@Injectable()
export class WorkFlowService {

    constructor(private http: Http, private _router: Router) {
      //this.user = JSON.parse(localStorage.getItem('currentUser'));
      //this.token = this.user.token;
      }
       
      getPager(totalItems: number, currentPage: number = 1, pageSize: number = 10) {
        // calculate total pages
        let totalPages = Math.ceil(totalItems / pageSize);
        
        let startPage: number, endPage: number;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        // calculate start and end item indexes
        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        let pages = _.range(startPage, endPage + 1);

        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }

      getJobDetails(userId,token:any){
       
          let headers = new Headers({ 'Content-Type':'application/json' });
          headers.append("userId",userId);
          headers.append("Authorization",token);
          let options = new RequestOptions({ headers: headers});
          return this.http.get(GlobalVariables.pmsServiceURL+"workFlow/readWorkFlowOfUser",options)
       //   return this.http.get("http://localhost:8084/pmsService/workFlow/readWorkFlowOfUser",options)
          .map((res:Response)=>res.json()).catch(this.handleError);
      }
      updateStatus(obj:any,token:any)
      {
        let headers = new Headers({ 'Content-Type':'application/json' });
        headers.append("Authorization",token);
        let options = new RequestOptions({ headers: headers});
        return this.http.post(GlobalVariables.pmsServiceURL+"workFlow/updateApprovedStatus",obj,options)
       // return this.http.post("http://localhost:8084/pmsService/workFlow/updateApprovedStatus",obj,options)
        .map(res=>res.json()).catch(this.handleError);
      }
      
      getUserDetail(assignTo:any,token:any)
      {
        let headers = new Headers({ 'Content-Type':'application/json' });
        headers.append("Authorization",token);
        let options = new RequestOptions({ headers: headers});
        return this.http.post(GlobalVariables.pmsServiceURL+"user/readUserDetail",assignTo,options)
       // return this.http.post("http://localhost:8084/pmsService/user/readUserDetail",assignTo,options)
        .map(res=>res.json()).catch(this.handleError);
      }
      public pagination(index:any,recordPerPage,token:any)
      {
        let headers = new Headers({ 'Content-Type':'application/json' });
        headers.append("index",index);
        headers.append("Authorization",token);
        headers.append("RecordperPage",recordPerPage);
        let options = new RequestOptions({ headers: headers});
        return this.http.get(GlobalVariables.pmsServiceURL+"historyView/pagination",options)
      //  return this.http.get("http://localhost:8084/pmsService/historyView/pagination",options)
        .map(res=>res.json()).catch(this.handleError);
      }

      public AddWorkFlow(obj:any,token:any){
        let headers = new Headers({ 'Content-Type':'application/json' });
        headers.append("Authorization",token);
        let options = new RequestOptions({ headers: headers});
        return this.http.post(GlobalVariables.pmsServiceURL+"workFlow/insertWorkFlow",obj,options)
      //  return this.http.post("http://localhost:8084/pmsService/workFlow/insertWorkFlow",obj,options)
        .map(res=>res.json()).catch(this.handleError);
      }
      public readStartTimer(id:any,token:any){
      //  console.log(id);
        let headers = new Headers({ 'Content-Type':'application/json' });
        headers.append("wfId",id);
        headers.append("Authorization",token);
        let options = new RequestOptions({ headers: headers});
        return this.http.get(GlobalVariables.pmsServiceURL+"workFlow/readStartTimer",options)
       // return this.http.get("http://localhost:8084/pmsService/workFlow/readStartTimer",options)
        .map(res=>res.json()).catch(this.handleError);
      }
      public readUser(token:any){
        let headers = new Headers({ 'Content-Type':'application/json' });
        headers.append("Authorization",token);
        let options = new RequestOptions({ headers: headers});
        return this.http.get(GlobalVariables.pmsServiceURL+"user/readAllUserName",options)
       // return this.http.get("http://localhost:8084/pmsService/user/readAllUserName",options)
        .map(res=>res.json()).catch(this.handleError);
      }
      public search(key:any,token:any)
      {
        let headers = new Headers({ 'Content-Type':'application/json' });
        headers.append("search",key);
        headers.append("Authorization",token);
        let options = new RequestOptions({ headers: headers});
        return this.http.get(GlobalVariables.pmsServiceURL+"historyView/search",options)
       // return this.http.get("http://localhost:8084/pmsService/historyView/search",options)
        .map(res=>res.json()).catch(this.handleError);
      }

      public StartTimer(startTimeObj:any,token:any){
        console.log(startTimeObj);
        let headers = new Headers({ 'Content-Type':'application/json' });
        headers.append("Authorization",token);
        let options = new RequestOptions({ headers: headers});
        return this.http.post(GlobalVariables.pmsServiceURL+"workFlow/startTimer",startTimeObj,options)
       // return this.http.post("http://localhost:8084/pmsService/workFlow/startTimer",startTimeObj,options)
        .map((res:Response)=>res.json()).catch(this.handleError);

      }

      public PauseTimer(pauseTimeObj:any,token:any){
        console.log(pauseTimeObj.startTimer);
        let headers = new Headers({ 'Content-Type':'application/json' });
        headers.append("Authorization",token);
        
        let options = new RequestOptions({ headers: headers});
        return this.http.post(GlobalVariables.pmsServiceURL+"workFlow/pauseTimer",pauseTimeObj,options)
       // return this.http.post("http://localhost:8084/pmsService/workFlow/pauseTimer",pauseTimeObj,options)
        .map((res:Response)=>res.json()).catch(this.handleError);

      }

      public getWorkHistroy(token:any){
        // console.log(this.token);
        let headers = new Headers({ 'Content-Type':'application/json' });
        headers.append('Authorization',token);
        let options = new RequestOptions({ headers: headers})
        // console.log(GlobalVariables.pmsServiceURL+"historyView/readHistory");
        console.log(options);
        return this.http.get(GlobalVariables.pmsServiceURL+"historyView/readHistory",options)
       // return this.http.post("http://localhost:8084/pmsService/historyView/readHistory",options)
        .map(res=>res.json()).catch(this.handleError);
      }

      public WorkHistroy(id:any,token:any){
      //  console.log(id);
        let headers = new Headers({ 'Content-Type':'application/json' });
        headers.append("taskId",id);
        headers.append("Authorization",token);
        let options = new RequestOptions({ headers: headers});
        return this.http.get(GlobalVariables.pmsServiceURL+"historyView/readTaskHistory",options)
     //   return this.http.get("http://localhost:8084/pmsService/historyView/readTaskHistory",options)
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