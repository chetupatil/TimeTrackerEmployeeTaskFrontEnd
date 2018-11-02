import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NgForm } from '@angular/forms';
import { JobsService } from './jobs.service';

@Component({
    moduleId: module.id,
    selector: 'jobs',
    templateUrl: './jobs.component.html',
    providers: [JobsService],
})

export class JobsComponent implements OnInit {

    jobs:any = [];
    // showPlay:boolean = true;
    start_date:any;
    end_date:any;
    user:any;
    a:any;
    playStatus:boolean;
    showHide:boolean;
   
    model:any = {};
    obj:any = {};
    startTimeObj:any = {};
    index1:any;
    wfDetail:any;
    controlEnabled:boolean=true;
    // showSaveButton:boolean=false;
    startTimeRecord:any;
    userName:any;
    element:any = {};
    job:any;

    constructor(
        private _JobsService: JobsService,
        private router: Router
    ) {}
    
    ngOnInit(): void {
        this.getJobDetails();
        this.user = JSON.parse(localStorage.getItem('currentUser'));
    }
   
    getJobDetails(){
        // let jobObj = JSON.parse(localStorage.getItem('workflowObj'));

      
            this._JobsService.getJobDetailsOfUser(this.user.token).subscribe(res=>{
                this.jobs=(res);
             console.log(this.jobs);
                this.addKeyvalue();
            });
    
        this._JobsService.readUser(this.user.token).subscribe(
            res=>this.userName = res
        )
    }

    addKeyvalue(){
        for (let i = 0; i < this.jobs.length; i++) 
        {
            this.element = this.jobs[i];
       
            this.element.isDisabled = false;
            this.element.showPlay = true;
            this.element.showSaveButton =true;
            this.element.play_status = false;

            console.log(this.element);
        }   
    }
    
    AddWorkFlow(task_id1:any,model:any,brief_date:any,index:any,event){
        this.model = model;
        
        this.jobs[index].showSaveButton = !(this.jobs[index].showSaveButton);
         this.jobs[index].isDisabled = !(this.jobs[index].isDisabled);
         event.target.classList.add('class3');
         event.target.classList.remove('class2');
        
        this.user =JSON.parse(localStorage.getItem('currentUser'));
        this.a=this.user.firstName;
        var obj = {
            task_id : task_id1,
            assign_by: this.a,
            assign_to: model.assignTo,
            status:model.status,
            date:brief_date,
            play_status:this.playStatus
        }

        this._JobsService.AddWorkFlow(obj,this.user.token).subscribe(res => {
            this.wfDetail=res;
            console.log(res);
            this.getJobDetails();
        });
        console.log(obj);
        // localStorage.setItem('workflowObj',JSON.stringify(this.jobs));
        // localStorage.removeItem('workflowObj');
    }

    EnableSave(jobb:any,index:any,event)
    {
        console.log(this.jobs);
        
         this.jobs[index].isDisabled = !(this.jobs[index].isDisabled);
         this.jobs[index].showSaveButton = !(this.jobs[index].showSaveButton);
        //event.target.classList.add('class3');
        console.log(this.jobs);
    }

    confirmActionTask(task_id:any,wfId:any,index:any,event){
        // this.playStatus = true;
        //  console.log(this.model);
        this.jobs[index].play_status = !(this.jobs[index].play_status);
        this.jobs[index].showPlay = !(this.jobs[index].showPlay);
        
        this.user =JSON.parse(localStorage.getItem('currentUser'));

        // if(this.jobs[index].showSaveButton == true){
        //     event.target.classList.add('class3');
        //     event.target.classList.remove('class2');
        // }

        
        // event.target.classList.remove('class2');
  
        this.start_date = new Date();
        this.start_date = this.start_date.getHours() + ":" + this.start_date.getMinutes() + ":" + this.start_date.getSeconds();
        // console.log(this.start_date);
        //  console.log(this.model.status)
        
        if(this.model.status!=null &&this.model.assignTo!=null){
            
        var startTimeObj ={
            wfId:wfId,
            task_id : task_id,
            play_status:this.jobs[index].play_status,
            user : this.model.assignTo,
            status : this.model.status,
            start_timer : this.start_date
        }
    }else{
        var startTimeObj ={
            wfId:wfId,
            task_id : task_id,
            play_status:this.jobs[index].play_status,
            user : null,
            status : null,
            start_timer : this.start_date
        }
    }
    console.log(startTimeObj);

        this._JobsService.StartTimer(startTimeObj,this.user.token).subscribe(res=>{console.log(res),
            this.startTimeRecord = res,console.log(this.startTimeRecord)}
    );

    // localStorage.setItem('workflowObj',JSON.stringify(this.jobs));
    
    }

    cancelActionTask(index:any){
        this.jobs[index].showPlay = !(this.jobs[index].showPlay);
       // this.playStatus = false;
       this.jobs[index].play_status = !(this.jobs[index].play_status);
        this.end_date = new Date();
        this.end_date = this.end_date.getHours() + ":" + this.end_date.getMinutes() + ":" + this.end_date.getSeconds();
        console.log(this.end_date);
        var stopTimeObj = {
                wfId:this.startTimeRecord.wfId,
                timerId:this.startTimeRecord.timerId,
                play_status:this.jobs[index].play_status,
                stop_timer : this.end_date
            }
            console.log(stopTimeObj);
        this._JobsService.PauseTimer(stopTimeObj,this.user.token).subscribe(res=>console.log(res));
    // localStorage.setItem('workflowObj',JSON.stringify(this.jobs));
    
    }
}



@Component({
    moduleId: module.id,
    selector: 'past-jobs',
    templateUrl: './past-jobs.component.html',
    providers: [JobsService],
})

export class PastJobsComponent implements OnInit {

    jobs:any=[];
    user:any;
    constructor(
        private _JobsService: JobsService,
        private router: Router
    ) {}
    
    ngOnInit(): void {
        this.getJobDetailsOfUser();
        this.user = JSON.parse(localStorage.getItem('currentUser'));
    }
    
    getJobDetailsOfUser(){           
        this._JobsService.getJobDetails(this.user.token).subscribe(res=>{
        this.jobs=(res);
        console.log(this.jobs);
        });
    }
}