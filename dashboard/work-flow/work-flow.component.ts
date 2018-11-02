import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute, Params } from '@angular/router';

import { NgForm } from '@angular/forms';
import { WorkFlowService } from './work-flow.service';
import { JobBriefingService } from '../job-briefing/job-briefing.service';

@Component({
    moduleId: module.id,
    selector: 'work-flow',
    templateUrl: './work-flow.component.html',
    providers: [WorkFlowService,JobBriefingService],
})

export class WorkFlowComponent implements OnInit {

    jobs:any = [];
    activeTaskId:any;
    jobsList:any=[];
    start_date:any;
    end_date:any;
    user:any;
    first_name:any;
    playStatus:boolean = false;
    showHide:boolean;
   
    model:any = {};
    obj:any = {};
    startObj:any={};
    startTimeObj:any = {};
    index1:any;
    wfDetail:any;
    controlEnabled:boolean=true;
    // showSaveButton:boolean=false;
    startTimeRecord:any;
    userName:any;
    element:any = {};
    job:any;
    assignBy_id:any;
    modelList:any=[];
    selectedValue:any;
    masterJsonList:any;
    // taskTime:any;
    wfId:any;
    message:any;
    retVal:any;
    alertShow:boolean = false;
    option:any = "Current Jobs";
    playStatusConversion:any;
    currentJobsshow :boolean = true;
    arr:any = [];
    pastJobs:any=[];
    updatedStatus:any;

    constructor(
        private _WorkFlowService: WorkFlowService,
        private router: Router,
        private jobBriefingService:JobBriefingService
    ) {}
    
    ngOnInit(): void {
        this.user =JSON.parse(localStorage.getItem('currentUser'));
        this.getJobDetails();

       this.arr = [
            {name:'Current Jobs'},
            {name:'Past Jobs'}
        ]

    }

    getJobDetails(){
         
            this._WorkFlowService.getJobDetails(this.user.user_id,this.user.token).subscribe(res=>{
                console.log(res);
                this.jobs = res;
                console.log(this.jobs);
                for(let job of this.jobs){
                    if (job.wf_status == 'Close' ) {
                        this.pastJobs.push(job);
                    }                        
                } 
                this.addKeyvalue();
                this.updated_status();
                // for(let i=0;i<this.jobs.length;i++){
                //     let currObj = this.jobs[i];
                //     console.log(currObj);
                // }
               
            });
        this._WorkFlowService.readUser(this.user.token).subscribe(
            res=>this.userName = res
        )
        this.jobBriefingService.masterJsonObject(this.user.token).subscribe(res=>{
            //console.log(res)
        this.masterJsonList = res;
        });
    }

    selctedValue(options:any){        
        
        if(options == "Current Jobs"){
            this.currentJobsshow = true;
        }
        else{
            this.currentJobsshow = false;        
        }

    }
    updated_status(){
        for(let i=0;i<this.jobs.length;i++){
        if ((this.jobs[i].hasOwnProperty('wf_status')) && (this.jobs[i]['wf_status'] == 'Open')) {
                console.log(this.jobs[i]['wf_status']);
                this.jobs[i].status = this.jobs[i]['status'];
                console.log(this.jobs[i].status);
               /* this.jobs[i].updatedStatus = this.jobs[i]['status'];
                console.log(this.jobs[i].updatedStatus);*/
                break;   // so that it doesn't keep looping, after finding a match
            }
        }
    }

    addKeyvalue(){
        for (let i = 0; i < this.jobs.length; i++) 
        {
            
            this.element = this.jobs[i];
       
            this.element.isDisabled = false;
            this.element.showPlay = true;
            this.element.showSaveButton =true;
            this.element.action = true;
            
        }   
    }
    
    AddWorkFlow(task_id1:any,model:any,brief_date:any,index:any,event){
        this.model = model;
        console.log(this.model);
       //  if(this.model.assign_to == model.assign_to && this.model.assigned_to_id == model.assigned_to_id){
         //    this.modelList.push(this.model.assign_to);
            this.jobs[index].action = !(this.jobs[index].action);
            this.jobs[index].playStatus = !(this.jobs[index].playStatus);
            console.log(this.jobs[index].showSaveButton );
            this.jobs[index].showSaveButton = !(this.jobs[index].showSaveButton);
            console.log(this.jobs[index].showSaveButton );
            let assignedToId = this.model.assigned_to_id;
            let assignedToUserName ='';
            for ( let  user of this.userName ) {
                if ( user.userId == assignedToId) {
                    //console.log(user.userName);
                    assignedToUserName = user.userName;
                }
            }

            // let assignToInfo =  this.model.assigned_to_id.split("&&");
            // this.modelList.push(assignToInfo[0]);
            // this.modelList.push(assignToInfo[1]);
            // console.log(this.modelList);
             
            this.jobs[index].isDisabled = !(this.jobs[index].isDisabled);
            event.target.classList.add('class5');
            event.target.classList.remove('class6');

            let currentDate = new Date();
            let currentDateTime = (currentDate.getDate()) + '/' + (currentDate.getMonth() + 1) + '/' + (currentDate.getFullYear())+','+currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
          //  console.log(currentDateTime);
        
            this.first_name=this.user.firstName;
            this.assignBy_id = this.user.user_id;
        
            var obj = {
                task_id : task_id1,
                assign_by: this.first_name,
                //assign_to: this.modelList[1],
                assign_to: assignedToUserName,
                status:model.status,
                date:brief_date,
                play_status:this.playStatus,
                wfId:this.model.wfId,
                assignById:this.assignBy_id,
                //assignToId:this.modelList[2],
                assignToId:assignedToId,
                taskTime:currentDateTime
            }
            console.log(obj.status);

            this.alertShow = true;
                // this.message='You are assigning job to Yourself which is not allowed.';
                // this.jobs[index].showSaveButton = !(this.jobs[index].showSaveButton);
                // this.jobs[index].action = !(this.jobs[index].action);
                 
                //  this.jobs[index].playStatus = !(this.jobs[index].playStatus);
                // this._WorkFlowService.AddWorkFlow(obj).subscribe(res => {
                //     this.wfDetail=res;
                //     console.log(res);
                //     console.log(this.wfDetail);
                //      this.getJobDetails();
                // });
                // event.target.classList.add('class6');
                // event.target.classList.remove('class5');    
           
                this._WorkFlowService.AddWorkFlow(obj,this.user.token).subscribe(res => {
                    this.wfDetail=res;
                    console.log("==========================");
                    this.getJobDetails();
                    console.log("=====================");

                 });
                
    }
    showError() {
        this.alertShow = true;
        window.setTimeout(function () {
            this.alertShow = false;
        }.bind(this), 4000);
    }
    EnableSave(jobb:any,index:any,event)
    {
         this.jobs[index].action = !(this.jobs[index].action);
         this.jobs[index].playStatus = !(this.jobs[index].playStatus);
         event.target.classList.add('class5');
         event.target.classList.remove('class6');
        
        this.jobs[index].isDisabled = !(this.jobs[index].isDisabled);
        this.jobs[index].showSaveButton = !(this.jobs[index].showSaveButton);
    }

    confirmActionTask(task_id:any,wfId:any,index:any,event){
       this.jobs[index].playStatus = !(this.jobs[index].playStatus);
      // console.log(this.jobs[index].playStatus);
       this.jobs[index].showPlay = !(this.jobs[index].showPlay);
       this.start_date = new Date();
    //    console.log("todays date is :"+this.start_date.now);
       this.start_date = (this.start_date.getDate()) + '/' + (this.start_date.getMonth() + 1) + '/' + (this.start_date.getFullYear())+','+this.start_date.getHours() + ":" + this.start_date.getMinutes() + ":" + this.start_date.getSeconds();
       this.activeTaskId=task_id;
      //  if(this.wfDetail.play_status=="0"){this.playStatusConversion = true}else{this.playStatusConversion=false;}
        //console.log(this.playStatusConversion);
        //  if(this.wfDetail==null){
          var startTimeObj ={
            wfId:wfId,
            task_id : task_id,
            play_status:this.jobs[index].playStatus,
            assignBy:this.user.firstName,
            user : this.model.assignTo,
            status : this.model.status,
            start_timer : this.start_date
          }
      /*  }else{
            var startTimeObj ={
                wfId:this.wfDetail.wf_id,
                task_id : task_id,
                play_status:this.playStatusConversion,
                assignBy:this.user.firstName,
                user : this.model.assignTo,
                status : this.model.status,
                start_timer : this.start_date
              }
            }*/
            
        this._WorkFlowService.StartTimer(startTimeObj,this.user.token).subscribe(res=>{
            this.startTimeRecord = res;
            let a = this.startTimeRecord;
            console.log(this.startTimeRecord);
            
            this.getJobDetails();
        });
    
}

    cancelActionTask(index:any,workflowId:any,timerId:any){
     // console.log(startTimeRecord);
    //  console.log(workflowId);
      
        this.jobs[index].showPlay = !(this.jobs[index].showPlay);
        this.jobs[index].playStatus = !(this.jobs[index].playStatus);
        this.end_date = new Date();
        this.end_date = (this.end_date.getDate()) + '/' + (this.end_date.getMonth() + 1) + '/' + (this.end_date.getFullYear())+','+this.end_date.getHours() + ":" + this.end_date.getMinutes() + ":" + this.end_date.getSeconds();
                 
                var stopTimeObj={    
                wfId:workflowId,
                timerId:timerId,
                play_status:this.jobs[index].playStatus,
                stop_timer : this.end_date
                }
            console.log(stopTimeObj);
         this._WorkFlowService.PauseTimer(stopTimeObj,this.user.token).subscribe(res=>{
             console.log(res)
            this.getJobDetails();
        });
         }
    }
 


@Component({
    moduleId: module.id,
    selector: 'work-flow-histroy',
    templateUrl: './work-flow-histroy.component.html',
    providers: [WorkFlowService],
})

export class WorkFlowHistroyComponent implements OnInit {

    approvedJobs : any;
    searchList:any;
    search:any;
    user:any;
    workHistroy : any;
    model:any;
    workHistroyTable:boolean = false;
    count:number = 0;
    pagination:any;
    pager: any = {};
    pagedItems: any[];
    
        constructor(
            private _WorkFlowService: WorkFlowService,
            private router: Router
        ) {this.user = JSON.parse(localStorage.getItem('currentUser'));}
        
        ngOnInit(): void {
            
           this.getWorkHistroy();
        }

        getWorkHistroy(){
            this._WorkFlowService.getWorkHistroy(this.user.token).subscribe(res => {
            //    console.log(res),
                this.approvedJobs = res;
              //  console.log(this.approvedJobs.length);
                this.setPage(1);
            });
        }
        showWorkHistroy(wf_id:any,id:any){
          //  console.log(id);
           // console.log(wf_id);
            this.router.navigate(["complete-histroy",wf_id])
        //     this.workHistroyTable = true;
        //     console.log(this.workHistroyTable);
        //    let count = this.count++;
        //     console.log(count++);
        //     if(count % 2 == 0){
        //         this.workHistroyTable = false;
        //     }

        //     this._WorkFlowService.WorkHistroy(wf_id).subscribe(res => {
        //         // console.log(res),
        //         this.workHistroy = res;
        //         // this.router.navigate(['/complete-histroy']);
        //     });
        }
        Search(key:NgForm)
        {
            console.log(key.value);
            this._WorkFlowService.search(key.value.search,this.user.token).subscribe(res=>{
            //    console.log(res);
                this.searchList = res;
              //  console.log(res)
            });
        }
        paginationPage(index:any)
        {
            let recordPerPage = 5;
            this._WorkFlowService.pagination(index,recordPerPage,this.user.token).subscribe(res=>{
            //    console.log(res);
                this.pagination = res;
            })
        }

        setPage(page: number) {
            if (page < 1 || page > this.pager.totalPages) {
                return;
            }
    
            // get pager object from service
            this.pager = this._WorkFlowService.getPager(this.approvedJobs.length, page);
            console.log(this.pager);
            // get current page of items
            this.pagedItems = this.approvedJobs.slice(this.pager.startIndex, this.pager.endIndex + 1);
        }
       
}


@Component({
    moduleId: module.id,
    selector: 'qc-approved',
    templateUrl: './approvedByQc.component.html',
    providers: [WorkFlowService],
})

export class ApprovedByQcComponent implements OnInit {
    user:any;
    end_date:any;
    jobs:any=[];
    status:any;
    statusActive:boolean = false;
    submit:boolean = false;
        constructor(
            private _WorkFlowService: WorkFlowService,
            private router: Router
        ) {}
        
        ngOnInit(): void {
            this.user =JSON.parse(localStorage.getItem('currentUser'));
          
         //  this.getWorkHistroy();
         this. getJobDetails();
        // console.log(this.user)
        }
        getJobDetails(){
            
               this._WorkFlowService.getJobDetails(this.user.user_id,this.user.token).subscribe(res=>{
                 //  console.log(res);
                   this.jobs = res;
                  // console.log(this.jobs);
               });  
       }
       AddStatus(wfStatus:any,wfId:any)
      {
         // console.log(wfStatus);
          //console.log(wfId);
         
          this.end_date = new Date();
          this.end_date = (this.end_date.getDate()) + '/' + (this.end_date.getMonth() + 1) + '/' + (this.end_date.getFullYear())+','+this.end_date.getHours() + ":" + this.end_date.getMinutes() + ":" + this.end_date.getSeconds();
   
          var obj ={
              wf_status:wfStatus,
              wf_id:wfId,
              endTime:this.end_date,
              submit:true,
              
          }
          this._WorkFlowService.updateStatus(obj,this.user.token).subscribe(res=>{
              console.log(res);
            this.status = res;
            this.statusActive = true;
           // this.submit = true;
          }
        )
      }
}

@Component({
    moduleId: module.id,
    selector: 'complete-histroy',
    templateUrl: './complete-histroy.component.html',
    providers: [WorkFlowService],
})

export class CompleteHistroyComponent implements OnInit {
        workHistroy:any;
        user:any;
        filterWorkHistroy = [];
   
        constructor(
            private _WorkFlowService: WorkFlowService,
            private router: Router,
            public activatedRoute: ActivatedRoute,
        ) {}
        
        ngOnInit(): void {
            this.user = JSON.parse(localStorage.getItem('currentUser'));
            this.activatedRoute.params.subscribe((params: Params) => {
                let Id = params['id'];
               //  console.log(Id);
                 this._WorkFlowService.WorkHistroy(Id,this.user.token).subscribe(res => {
                     console.log(res),
                    this.workHistroy = res;
                   for(let i=0;i<this.workHistroy.length;i++)
                    {
                       if(this.workHistroy[i].status!='ArtWork' &&
                        this.workHistroy[i].status!='QC-CORR' && this.workHistroy[i].status!='QC' && this.workHistroy[i].status!='QC-CHECK'&&
                            this.workHistroy[i].status!='QC-CORR-CHECK' && this.workHistroy[i].status!='QC-CORR-DONE')
                       { 
                           this.filterWorkHistroy.push(this.workHistroy[i]);

                       }else{
                           continue;
                       }
                    }
                });
            });
        }
    }

    @Component({
        moduleId: module.id,
        selector: 'job-briefing-details',
        templateUrl: './job-briefing-details.component.html',
        providers: [JobBriefingService],
    })
    
    export class JobBriefingDetailsComponent implements OnInit {
        
            jobs:any;
            user:any;
            constructor(
                private jobBriefingService: JobBriefingService,
                private router: Router,
                public activatedRoute: ActivatedRoute,
            ) {}
            
            ngOnInit(): void {
               this.user =  this.user =JSON.parse(localStorage.getItem('currentUser'));
               this.getJobs();
            }

            jobIdInfo(taskId:any){
              //  console.log(taskId);
                this.router.navigate(["complete-job-details",taskId])
                // this.router.navigate([/complete-job-details]);
            }

           getJobs(){
                this.jobBriefingService.readUserByUserId(this.user.user_id,this.user.token).subscribe(res=>{
                    this.jobs = res;
                  console.log(this.jobs);
                });
            }
        }

        @Component({
            moduleId: module.id,
            selector: 'complete-job-details',
            templateUrl: './complete-job-details.component.html',
            providers: [JobBriefingService],
        })
        
        export class CompleteJobDetailsComponent implements OnInit {
                jobs:any;
                user:any;
                particularJob:any={};
                print_sequence_array:any=[];
                constructor(
                    private jobBriefingService: JobBriefingService,
                    private router: Router,
                    public activatedRoute: ActivatedRoute,
                ) {}
                
                ngOnInit(): void {
                   this.user =  this.user =JSON.parse(localStorage.getItem('currentUser'));
                   this.getJobs();
                   this.activatedRoute.params.subscribe((params: Params) => {
                    let Id = params['id'];
                    // console.log(Id);
                     this.jobBriefingService.readUserByTaskId(Id,this.user.token).subscribe(res => {
                      //  console.log(res),
                        this.particularJob = res;
                        //console.log(this.particularJob.print_sequence);
                        // for(let i=0;i<this.particularJob.print_sequence.length;i++){
                            this.print_sequence_array = this.particularJob.print_sequence.split(",");
                          //  console.log(this.print_sequence_array);
                        //    this.print_sequence_array.push(print_sequence[0]);
                        //    this.print_sequence_array.push(print_sequence[1]);
                        // }

                        // this.router.navigate(['/complete-histroy']wf_id);
                    });
                });
                }
    
               getJobs(){
                    this.jobBriefingService.getJobs(this.user.token).subscribe(res=>{
                        this.jobs = res;
                      //  console.log(this.jobs);
                    });
                }
            }
    