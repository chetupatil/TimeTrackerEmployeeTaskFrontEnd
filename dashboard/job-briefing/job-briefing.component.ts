import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { Http } from '@angular/http';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { JobBriefingService } from './job-briefing.service';
import { Route } from '@angular/compiler/src/core';


@Component({
    moduleId: module.id,
    selector: 'job-briefingdetails',
    templateUrl: './job-briefingdetails.component.html',
    providers: [JobBriefingService],
})

export class JobBriefingDetailsComponent implements OnInit {
    isCompleted:boolean=false;
    model:any;
    jobDetailObj:any;
    Resp:any = {};
    form1Model:any;
    editJob:boolean=false;
    jsonObject:any;
    user:any;
    job:any;
    jobClient:boolean=true;
    colorChange:boolean = true;
    steponeform:boolean=true;
    steptwoform:boolean=false;
    stepthreeform:boolean=false;
    clientBody:any;
    constructor(
        private router: Router,
        private http: Http,
        private jobBriefingService : JobBriefingService
    ) {this.user = JSON.parse(localStorage.getItem("currentUser"));}
    ngOnInit(): void
     {
        this.jobBriefingService.masterJsonObject(this.user.token).subscribe((res:Response)=>{this.jsonObject = res
       });
        this.getClientDetails();
      
       }
      getClientDetails(){

        this.jobBriefingService.getClientNameDetails("LABEL MAKERS",this.user.token).subscribe(res=>{

            console.log(res);
            if(res._body=="add record for label makers"){
            }else{
            this.clientBody = JSON.parse(res._body);
            }
        });
      }
        showStyle:boolean = false;

      /* getStyle() {
        if(this.showStyle) {
          return "#4ebf9b";
        } else {
          return "";
        }
      }*/

      getClientResponse(a:any){
       // console.log(bcn)
       this.getClientDetails();
       console.log(this.clientBody);
         if(a=="LABEL MAKERS"){
              this.jobBriefingService.getClientNameDetails(a,this.user.token).subscribe(res=>{
                  console.log(res);
                  if(res._body=="add record for label makers"){
                      this.jobClient = true;
                  }else{
                      this.jobClient =false;
                      this.job = JSON.parse(res._body);
                  }

            });
         }else{
            this.jobClient = true;
         }
      }

    
    onStepOne(model:any,event){
        
        var  obj = model.value;
        
        console.log(event);
        this.steponeform = false;
        this.steptwoform = true;
                
        console.log(model.value);
        this.form1Model=model.value;
        this.jobBriefingService.JobBriefCreate(model.value,this.user.token).subscribe(
             (res:Response) => {
                 this.Resp = res;
                 console.log(this.Resp);
                 this.form1Model.task_id1 = this.Resp.task_id1;
        });
    }

    onStepTwoPrevious(){
        this.steponeform = true;
        this.steptwoform = false;
     //   this.showStyle = !this.showStyle;
    }
    onStepTwoNext(form:any){
        this.stepthreeform = true;
        // this.steponeform = false;
        this.steptwoform = false;
        this.model = form.value;
        console.log(this.model);
    }
    onStepThreeNext(stepThreeForm:any){
        this.jobDetailObj = stepThreeForm.value;
         console.log(this.jobDetailObj);
         var obj = Object.assign({},this.model,this.jobDetailObj);
         console.log(obj);
 
         this.jobBriefingService.JobBriefCreate(this.form1Model,this.user.token).subscribe(
             (res:Response) => {
                 console.log(res);
                 this.Resp = res;
                 //this.form1Model.task_id1 = this.Resp.task_id1;
                 obj.task_fid1 = this.Resp.task_id1;
                 this.jobBriefingService.JobDetailCreate(obj,this.user.token).subscribe( res => {
                 //    console.log(res);
                     this.router.navigate(["job-listing"]);
                 });
                
                
             });
    }
    onStepThreePrevious(){
        this.steptwoform = true;
        this.stepthreeform = false;
    }
    
    // detailsFormFunc(form:NgForm){
    //     this.model = form.value;
    //    // console.log(form.value);
    //     //console.log(this.model);
    // }
    // createJob(a:NgForm) {
    //     // this.editJob=false;
       
    //    // console.log(a.value);
    //     this.form1Model=a.value;
    //     //console.log(this.form1Model);
    //      this.jobBriefingService.JobBriefCreate(a.value).subscribe(
    //          (res:Response) => {
    //            //  console.log(res);
    //              this.Resp = res;
    //              this.form1Model.task_id1 = this.Resp.task_id1;
               
    //         });
        
    // }
     
    // addJobDetails(detailsform:NgForm){
    //     // this.editJob=false;
    //     this.jobDetailObj = detailsform.value;
       
    //     //console.log(this.jobDetailObj);

    //     var obj = Object.assign({},this.model,this.jobDetailObj);

    //     this.jobBriefingService.JobBriefCreate(this.form1Model).subscribe(
    //         (res:Response) => {
    //           //  console.log(res);
    //             this.Resp = res;
    //             //this.form1Model.task_id1 = this.Resp.task_id1;
    //             obj.task_fid1 = this.Resp.task_id1;
    //             this.jobBriefingService.JobDetailCreate(obj).subscribe( res => {
    //             //    console.log(res);
    //                 this.router.navigate(["job-listing"]);
    //             });
               
               
    //         });

    // }
    // EditJob(){
    //     this.editJob=true;
    // }
    
    onComplete(event) {
        //console.log('Submit');
         this.isCompleted = true;
      }

}

@Component({
    moduleId: module.id,
    selector: 'job-listing',
    templateUrl: './job-listing.component.html',
    providers: [JobBriefingService],
})

export class JobListingComponent implements OnInit {
    
    isCompleted:boolean=false;
    jobs:any;
    assignManagerC:boolean =false;
    workFlowDetail:any;
    user:any;
    userList:any;
    Manager:any;  
    assignPerson:boolean =false;  
    constructor(
        private http: Http,
        private jobBriefingService : JobBriefingService,
        private router: Router
    ) {}
    ngOnInit(): void {

        this.user = JSON.parse(localStorage.getItem('currentUser'));
        this.jobBriefingService.getJobs(this.user.token).subscribe(res=>{
            this.jobs = res;
            console.log(this.jobs);
        });
        this.jobBriefingService.selectiveUserDetail(this.user.token).subscribe(
            res =>{
                console.log(res);
                this.userList = res;
           }
        )
      
        //console.log(this.user);
     //   this.getAssignWork();
     //   console.log(this.workFlowDetail)
    }

    editRecord(id:any)  {
        //console.log(id);
        this.router.navigate(["job-briefingdetailsEdit",id])

    }
    assignManager(user:any,event,id:any)
    {
        console.log(user);
        console.log(id);
        this.assignManagerC = true;
        let currentDate = new Date();
        let currentDateTime = (currentDate.getDate()) + '/' + (currentDate.getMonth() + 1) + '/' + (currentDate.getFullYear())+','+currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
        let userInfo = user.split("&&");
        event.target.classList.add('class5');
        //console.log(userInfo)
        let obj;
        //console.log(obj);
        if(userInfo[3]=="Manager"){
            console.log("iam manager");
          obj={
            task_id:userInfo[2],
            assign_by:this.user.firstName,
            assigned_by_id:this.user.user_id,
            assign_to:userInfo[0],
            assigned_to_id:userInfo[1],
            play_status:false,
            startTime:currentDateTime,
            wf_status:'Open',
            status:'Pre Flight',
            assignDisablity:'close'
       }
    } else{
        obj={
            task_id:userInfo[2],
            assign_by:this.user.firstName,
            assigned_by_id:this.user.user_id,
            assign_to:userInfo[0],
            assigned_to_id:userInfo[1],
            play_status:false,
            startTime:currentDateTime,
            wf_status:'Open',
            status:'Pre Flight-Check',
            assignDisablity:'close'
       }

    }
     console.log(obj);
       this.jobBriefingService.addWorkFlow(obj,this.user.token).subscribe(res=>{
          //  console.log(res);
            this.workFlowDetail = res;
            //console.log(this.workFlowDetail);
            this.jobBriefingService.assignManagerDetail(this.workFlowDetail.taskId,this.user.token).subscribe(res=>{
              //  console.log(res)
                  this.Manager = res;
                  this.Manager.idx = id;
                  console.log(this.Manager);
            });
       });
    }
    
    StartWork(id:any){
        var user = JSON.parse(localStorage.getItem('currentUser'));
        var workflowRecord : any = {};
        workflowRecord.assigned_by_id = user.user_id;
        workflowRecord.assign_by = user.firstName;
        workflowRecord.task_id = id;

        this.jobBriefingService.StartWork(workflowRecord,this.user.token).subscribe(res=>{
            //console.log(res);
            this.jobBriefingService.getJobs(this.user.token).subscribe(res=>{
                this.jobs = res;
            });
        });

    }
}


@Component({
    moduleId: module.id,
    selector: 'job-briefingdetailsEdit',
    templateUrl: './job-briefingdetailsEdit.component.html',
    providers: [JobBriefingService],
})

export class JobBriefingDetailsEditComponent implements OnInit {
    //data:any;
    id:any;
    jobRecord :any;
    isCompleted:boolean=false;
    jsonObject:any;
    model:any;
    formValues:any;
    form1Model:any;
    Resp:any;
    user:any;
    jobDetailObj:any;
    client_name:any;
    jobDetailEditObj : any;
    steponeform:boolean=true;
    steptwoform:boolean=false;
    stepthreeform:boolean=false;
    constructor(
        // private _service: CustomerService,
       private _JobBriefingService: JobBriefingService,
       public activatedRoute: ActivatedRoute,
       // public params: Params,
        private router: Router
    ) {}
    ngOnInit(): void {
       this.activatedRoute.params.subscribe((params: Params) => {
          this.id = params['id'];
          this.user = JSON.parse(localStorage.getItem('currentUser'));
           //console.log(Id);
        this._JobBriefingService.getJobDetails(this.id,this.user.token).subscribe(
            res => {
            this.jobRecord = res;
            console.log(res);
            console.log(this.jobRecord);
          }
         )
        });

        this._JobBriefingService.masterJsonObject(this.user.token).subscribe((res:Response)=>{this.jsonObject = res
            //console.log(res)
        })

       }
       cancel(){
           this.router.navigate(['job-listing']);
       }

       onStepOne(model:any,event){
        
        var  obj = model.value;
        
        // console.log(event);
        this.steponeform = false;
        this.steptwoform = true;
                
        console.log(model.value);
        // this.form1Model=model.value;
        this._JobBriefingService.JobEdit(obj,this.user.token).subscribe(
             (res:Response) => {
                 this.jobDetailEditObj = res;
                 console.log(this.jobDetailEditObj);
                //  this.form1Model.task_id1 = this.Resp.task_id1;
        });
    }
    onStepTwoPrevious(){
        this.steponeform = true;
        this.steptwoform = false;
     //   this.showStyle = !this.showStyle;
    }
    onStepTwoNext(form:any){
        this.stepthreeform = true;
        // this.steponeform = false;
        this.steptwoform = false;
        this.model = form.value;
        console.log(this.model);
    }
    onStepThreeNext(stepThreeForm:any){
        this.jobDetailObj = stepThreeForm.value;
         console.log(this.jobDetailObj);
         var obj = Object.assign({},this.model,this.jobDetailObj);
         console.log(obj);
 
        //  this._JobBriefingService.JobEdit(this.form1Model).subscribe(
        //      (res:Response) => {
        //          console.log(res);
        //          this.Resp = res;
                 //this.form1Model.task_id1 = this.Resp.task_id1;
                //  obj.task_fid1 = this.Resp.task_id1;
                 this._JobBriefingService.detailsFormEdit(obj,this.user.token).subscribe( res => {
                    console.log(res);
                     this.router.navigate(["job-listing"]);
                 });
                
            //  });
    }
    onStepThreePrevious(){
        this.steptwoform = true;
        this.stepthreeform = false;
    }
    
    //    createJobEdit(a:NgForm){
    //    // console.log(a.value);
    //     this._JobBriefingService.JobEdit(a.value).subscribe(res=>console.log(res));
    //    }

    //    detailsFormEdit(b:NgForm){
    //      //  console.log(b.value);
    //        this.model=b.value;
    //    }
    //    onComplete(a:any){}
    //    editJobDetails(c:NgForm){
    //        //console.log(c.value);
    //        this.formValues=c.value;

    //        var obj = Object.assign({},this.model,this.formValues);
    //        //console.log(obj); 

    //        this._JobBriefingService.detailsFormEdit(obj).subscribe(res=>console.log(res));
    //        this.router.navigate(["job-listing"])
    //    }
}

