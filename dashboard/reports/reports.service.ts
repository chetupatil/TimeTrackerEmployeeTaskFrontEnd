import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { HttpClient,HttpParams} from '@angular/common/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as GlobalVariables  from '../../../global';

@Injectable()
export class ReportsService {

    constructor(private http: Http, private _router: Router) {
        // this.user = JSON.parse(localStorage.getItem('currentUser'));
        // this.token = this.user.token;
    }

    public categoryData(token:any){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append("Authorization",token);
        let options = new RequestOptions({ headers: headers });
        //return this.http.get(GlobalVariables.pmsServiceURL+"reportsData/deliveredJobs",options)
        return this.http.get("http://localhost:8084/pmsService/Reports/categoryList",options)
        .map((res: Response) => res.json()
        ).catch(this.handleError);
    }
    
    public BrandData(token:any){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append("Authorization",token);
        let options = new RequestOptions({ headers: headers });
        //return this.http.get(GlobalVariables.pmsServiceURL+"reportsData/deliveredJobs",options)
        return this.http.get("http://localhost:8084/pmsService/Reports/brandList",options)
        .map((res: Response) => res.json()
        ).catch(this.handleError);
    }
    public JobTypeData(token:any){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append("Authorization",token);
        let options = new RequestOptions({ headers: headers });
        //return this.http.get(GlobalVariables.pmsServiceURL+"reportsData/deliveredJobs",options)
        return this.http.get("http://localhost:8084/pmsService/Reports/JobTypeList",options)
        .map((res: Response) => res.json()
        ).catch(this.handleError);
    }
    public masterJsonData(token:any){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append("Authorization",token);
        let options = new RequestOptions({ headers: headers });
        //return this.http.get(GlobalVariables.pmsServiceURL+"reportsData/deliveredJobs",options)
        return this.http.get("http://localhost:8084/pmsService/masterJson/JsonObjectFile",options)
        .map((res: Response) => res.json()
        ).catch(this.handleError);
    }

    public JobsByYear(jobsyear:any,token:any){
        console.log(jobsyear);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append("year",jobsyear.year);
        headers.append("client_name",jobsyear.client_name);
        headers.append("Authorization",token);
        console.log(headers);
        let options = new RequestOptions({ headers: headers });
        return this.http.get(GlobalVariables.pmsServiceURL+"Reports/completedJobs",options)
        //return this.http.get("http://localhost:8084/pmsService/Reports/completedJobs",options)
        .map((res: Response) => res.json()
        ).catch(this.handleError);
    }

    public JobsByJobType(jobType:any,token:any){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append("Authorization",token);
        let options = new RequestOptions({ headers: headers });
        return this.http.post(GlobalVariables.pmsServiceURL+"Reports/JobTypes",jobType,options)
       // return this.http.get("http://localhost:8084/pmsService/reportsData/jobTypes",options)
        .map((res: Response) => res.json()
        ).catch(this.handleError);
    }

    public JobsByCategory(job:any,token:any){
        console.log(job);
        let headers = new Headers({ 'Content-Type': 'application/json' });
       
        headers.append("Authorization",token);
        let options = new RequestOptions({ headers: headers });
        return this.http.post(GlobalVariables.pmsServiceURL+"Reports/JobCategory",job,options)
       // return this.http.get("http://localhost:8084/pmsService/reportsData/jobCategory",options)
        .map((res: Response) => res.json()
        ).catch(this.handleError);
    }

    public JobsByBrand(jobType:any,token:any){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append("Authorization",token);
        let options = new RequestOptions({ headers: headers });
        return this.http.post(GlobalVariables.pmsServiceURL+"Reports/JobBrand",jobType,options)
       // return this.http.get("http://localhost:8084/pmsService/reportsData/brands",options)
        .map((res: Response) => res.json()
        ).catch(this.handleError);
    }
    

    public JobsByPd(job:any,token:any){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append("Authorization",token);
        let options = new RequestOptions({ headers: headers });
        return this.http.post(GlobalVariables.pmsServiceURL+"Reports/PdJobs",job,options)
       // return this.http.get("http://localhost:8084/pmsService/reportsPD/PackageDesigners",options)
        .map((res: Response) => res.json()
        ).catch(this.handleError);
    }

    public JobsByQc(job:any,token:any){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append("Authorization",token);
        let options = new RequestOptions({ headers: headers });
        // return this.http.post(GlobalVariables.pmsServiceURL+"Reports/QcJobs",job,options)
        return this.http.post("http://localhost:8084/pmsService/Reports/QcJobs",job,options)
        // 
        .map((res: Response) => res.json()
        ).catch(this.handleError);
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