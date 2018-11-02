import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { Http } from '@angular/http';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { CompletedTaskService } from './completed-tasks.service';
import { Route } from '@angular/compiler/src/core';
import { LoginService } from '../../../login/login.service';

//import { WizardStepComponent } from './wizard-step.component';

@Component({
    moduleId: module.id,
    selector: 'completed-tasks',
    templateUrl: './completed-tasks.component.html',
    providers: [CompletedTaskService],
})

export class CompletedTasksComponent implements OnInit {
   history:any;
   user:any;
    constructor(
        private router: Router,
        private http: Http,
        private completedTasksService : CompletedTaskService
    ) {}
    ngOnInit(): void {
        this.user = JSON.parse(localStorage.getItem('currentUser'));
        console.log(this.user)
        this.completedTasksService.getWorkHistroy(this.user.token).subscribe(res=>{
            this.history = res;
            console.log(this.history);
        });

      }

}

@Component({
    moduleId: module.id,
    selector: 'completed-tasks',
    templateUrl: './completed-tasks-details.component.html',
    providers: [CompletedTaskService],
})

export class CompletedTasksDetailsComponent implements OnInit {
   history:any;
   user:any;
    constructor(
        private router: Router,
        private http: Http,
        private completedTasksService : CompletedTaskService
    ) {}
    ngOnInit(): void {
        this.user = JSON.parse(localStorage.getItem('currentUser'));
        console.log(this.user);
      this.getHistory();
       }
      getHistory()
      {
        //   console.log(token);
          this.completedTasksService.getJobs(this.user.token).subscribe(res=>{
              //console.log(res)
            this.history = res;
        });
      }
      addExternalError(id:any)
      {
         // console.log(id);
          this.router.navigate(["list-external-error",id])
      }

}

@Component({
    moduleId: module.id,
    selector: 'list-error',
    templateUrl: './list-external-error.component.html',
    providers: [CompletedTaskService],
       
})
 export class ListExternalErrorComponent implements OnInit {
     id:any;
     user:any;
     errorDetail:any;
     constructor(
         private router: Router,
         private http: Http,
         private completedTasksService : CompletedTaskService,
         public activatedRoute: ActivatedRoute
     ) {}
     ngOnInit(): void {
        this.user = JSON.parse(localStorage.getItem("currentUser"));
         this.activatedRoute.params.subscribe((params: Params)=>{
             this.id = params['id']
            // console.log(this.id);
             this.completedTasksService.readExternalErrors(this.id,this.user.token).subscribe(res=>{
                // console.log(res);
                 this.errorDetail = res;
             })
         })
        }
        addErrorDetail()
        {
            this.router.navigate(['add-external-error',this.id])
        }
        modifyErrorDetail(id:any)
        {
            this.router.navigate(['modify-external-error',id])
        }
}
@Component({
    moduleId: module.id,
    selector: 'add-error',
    templateUrl: './add-external-error.component.html',
    providers: [CompletedTaskService,LoginService ],
       
})
 export class AddExternalErrorComponent implements OnInit {
       task_id:any;
       user:any;
       tr_number:any;
       reported_on:any;
       added_datetime:any;
       added_by:any;
       qc_person:any;
       pd_person:any;
       error_description:any;
       trNumber:any;
     
     constructor(
         private router: Router,
         private http: Http,
         private completedTasksService : CompletedTaskService,
         public activatedRoute: ActivatedRoute,
         public loginService :LoginService 
     ) {this.user = JSON.parse(localStorage.getItem("currentUser"));}
     ngOnInit(): void {
        this.activatedRoute.params.subscribe((params: Params)=>{
            this.task_id = params['id']

        })
        this.loginService.ManageUsers(this.user.token).subscribe(res=>{
            console.log(res);
            this.user = res;
        })
        this.completedTasksService.readTrNumber(this.user.token).subscribe(res=>{
            console.log(res);
            this.trNumber = res;
        })
     }

    AddExternalError(details:NgForm)
     {
        console.log(details.value);
     this.user = JSON.parse(localStorage.getItem("currentUser"));
     this.added_datetime = new Date();
     this.added_datetime = (this.added_datetime.getDate()) + '/' + (this.added_datetime.getMonth() + 1) + '/' + (this.added_datetime.getFullYear())+','+this.added_datetime.getHours() + ":" + this.added_datetime.getMinutes() + ":" + this.added_datetime.getSeconds();
     var obj={
         task_id:details.value.task_id,
         tr_number:details.value.tr_number,
         error_description:details.value.error_description,
         reported_on:details.value.reported_on,
         added_datetime:this.added_datetime,
         added_by:details.value.added_by,
         qc_person:details.value.qc_person,
         pd_person:details.value.pd_person,
     }
     this.completedTasksService.addExternalErrors(obj,this.user.token).subscribe(res=>{
         console.log(res)
        
         this.router.navigate(["list-external-error",this.task_id])
     });
     
     
    }
}
@Component({
    moduleId: module.id,
    selector: 'modify-error',
    templateUrl: './modify-external-error.component.html',
    providers: [CompletedTaskService,LoginService ],
       
})
 export class ModifyExternalErrorComponent implements OnInit {
      id:any;
      listError:any = {};
      added_datetime:any;
      user:any;
      trNumber:any;
     constructor(
         private router: Router,
         private http: Http,
         private completedTasksService : CompletedTaskService,
         public activatedRoute: ActivatedRoute,
         public loginService:LoginService 
     ) {this.user = JSON.parse(localStorage.getItem("currentUser"));}
     ngOnInit(): void {
        this.activatedRoute.params.subscribe((params: Params)=>{
            this.id = params['id']
        this.completedTasksService.readExternalErrorBasedOnId(this.id,this.user.token).subscribe(res=>{
            console.log(res);
            this.listError = res;

        })
        this.loginService.ManageUsers(this.user.token).subscribe(res=>{
            console.log(res)
            this.user= res;
        })
        })
        this.completedTasksService.readTrNumber(this.user.token).subscribe(res=>{
            console.log(res);
            this.trNumber = res;
        })
        }
        updateExternalError(error:NgForm)
        {
            console.log(error.value);
            this.added_datetime = new Date();
            this.added_datetime = (this.added_datetime.getDate()) + '/' + (this.added_datetime.getMonth() + 1) + '/' + (this.added_datetime.getFullYear())+','+this.added_datetime.getHours() + ":" + this.added_datetime.getMinutes() + ":" + this.added_datetime.getSeconds();
            var obj={
                id:error.value.id,
                task_id:error.value.task_id,
                tr_number:error.value.tr_number,
                error_description:error.value.error_description,
                reported_on:error.value.reported_on,
                added_datetime:this.added_datetime,
                added_by:error.value.added_by,
                qc_person:error.value.qc_person,
                pd_person:error.value.pd_person
            }
            this.completedTasksService.updateExternalErrors(obj,this.user.token).subscribe(res=>{
                console.log(res);
                this.router.navigate(["list-external-error",error.value.task_id])
            })
           
        }
}