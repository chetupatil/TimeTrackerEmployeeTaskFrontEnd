import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from "../../../login/login.service";
import { UserSetingsService } from "./user-settings.service";
@Component({
    moduleId: module.id,
    selector: 'change-password',
    templateUrl: './change-password.component.html',
    providers: [LoginService],
})

export class ChangePasswordComponent implements OnInit {
    failed:boolean=false;
    message:any;
    messagecolor:any;
    oldPassword:any;
    newPassword:any;
    cnfNewPassword:any;
    user:any;
    result:any;
    password:any;
    resultSet:any;
    constructor(
        // private _service: CustomerService,
        // private orderService: OrdersService,
        private router: Router,
        private _loginService:LoginService
    ) {}
    ngOnInit(): void {
       this.user = JSON.parse(localStorage.getItem("currentUser"));
      console.log(this.user);
    }
    submit(f:NgForm)
    {
      console.log(f.value.oldPassword);
      this._loginService.passwordConversion(f.value.oldPassword,this.user.token).subscribe(res=>{console.log(res)
      this.password = res._body;
      console.log(this.password);
    });
      
      if(f.value.oldPassword===f.value.newPassword && !(this.password.equals(this.user.password)))
        {
        this.failed =true;
         this.showError();
        }else if(f.value.newPassword != f.value.cnfNewPassword){
            this.result = true;
            // this.displayError();
        }else if(f.value.oldPassword!=f.value.newPassword && f.value.newPassword == f.value.cnfNewPassword){
         this.resultSet = true;
         this._loginService.changePassword(f.value.newPassword,this.user.user_id,this.user.token).subscribe(res=>{
        //     console.log(res);
             if(res.status == 200){
                 this.router.navigate(['/dashboard']);
             }
            })
        }
    }
    showError() {
        this.failed = true;
        window.setTimeout(function () {
            this.failed = false;
        }.bind(this), 4000);
    }
}

@Component({
    moduleId: module.id,
    selector: 'view-profile',
    templateUrl: './view-profile.component.html',
    providers: [UserSetingsService],
})

export class ViewProfileComponent implements OnInit {

    users:any;
    user:any;
    constructor(
        // private _service: CustomerService,
         private _UserSetingsService: UserSetingsService,
        private router: Router
    ) {}
    ngOnInit(): void {
        this.user = JSON.parse(localStorage.getItem('currentUser'));
     //   console.log(this.user);
       /* this._UserSetingsService.getUser(this.user.user_id).subscribe(res => {
            this.users = res;
            console.log(this.users);
        })*/


    }
}

@Component({
    moduleId: module.id,
    selector: 'reset-password',
    templateUrl: './reset-password.component.html',
    providers: [UserSetingsService],
})

export class ResetPasswordComponent implements OnInit {

    failed:boolean=true;
    result:boolean=false;
    message:any;
    model:any={};
    user:any;
    constructor(
         private _UserSetingsService: UserSetingsService,
        private router: Router
    ) {}
    ngOnInit(): void {
        this.user = JSON.parse(localStorage.getItem('currentUser'));
       // console.log(this.user.user_id);
    }

    resetPassword(obj:any){
        //console.log(obj.value);
        if(obj.value.newPassword != obj.value.cnfNewPassword){
            this.failed = false;
          //  this.message = "passwords do not match";
            this.showError();
        }
        else{
            this.result = true;
           // this.message = "passwords match";
           this.success();

         this._UserSetingsService.resetPassword(obj.value.newPassword,this.user.user_id,this.user.token).subscribe(res =>{
          //   console.log(res);
             if(res.status == 200){
                this.router.navigate(["/dashboard"])
             }
            })

        }
    }
    showError() {
        this.failed = false;
        window.setTimeout(function () {
            this.failed =true;
        }.bind(this), 4000);
    }
    success()
    {
        this.result = true;
        window.setTimeout(function () {
            this.result =false;
        }.bind(this), 4000);
    }
}