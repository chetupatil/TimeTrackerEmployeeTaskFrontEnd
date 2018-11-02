import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute, Params  } from '@angular/router';
import {LoginService} from '../../../login/login.service';
import {NgForm } from '@angular/forms';
import { FormsModule }from '@angular/forms';

@Component({
    moduleId: module.id,
    selector: 'add-user',
    templateUrl: './add-user.component.html',
    providers: [LoginService],
})

export class AddUserComponent implements OnInit {
    password:any;
    users:any;
    user:any;
    model:any={};
    compare:any={};
    failed:boolean =false;
    constructor(
        // private _service: CustomerService,
        // private orderService: OrdersService,
        private router: Router,
        private loginService:LoginService
    ) {}
    ngOnInit(): void {
        this.user = JSON.parse(localStorage.getItem('currentUser'));
        this.loginService.getDefaultPasseord(this.user.token).subscribe(res=>{
        this.password = res._body;
        //console.log(this.password);
        });       
        this.loginService.UnqiueUsers(this.user.token).subscribe(res=>{console.log(res)
        this.users = res;
        });
    }

    AddUser(f:NgForm){
               this.loginService.AddUser(f.value,this.user.token).subscribe(res=>{
                  console.log(res);
                  if(res._body ==" Email Id and Employee code are already exist")
                    {
                     this.compare = res._body;
                     this.failed = true;
                     this.showError();
                    }else if(res._body == "Email Id already Exist")
                    {
                    this.compare = res._body;
                    this.failed = true;
                    this.showError();
                    }else if(res._body == "Employee code already Exist")
                    {
                    this.compare = res._body;
                    console.log(this.compare)
                    this.failed = true;
                    this.showError();
                    }else{
                  
                    this.router.navigate(['manage-users']);
                    }
                })
      
        
        
    }
    showError() {
        this.failed = true;
        window.setTimeout(function () {
            this.failed =false;
        }.bind(this), 6000);
    }
    
    
}

@Component({
    moduleId: module.id,
    selector: 'edit-user',
    templateUrl: './edit-user.component.html',
    providers: [LoginService],
})

export class EditUserComponent implements OnInit {
    usersRecord:any;
    user:any;
    constructor(
        // private _service: CustomerService,
        private loginService:LoginService,
        private router: Router,
        public activatedRoute: ActivatedRoute
    ) {}
    ngOnInit(): void {
        this.user = JSON.parse(localStorage.getItem('currentUser'));
        this.activatedRoute.params.subscribe((params: Params) => {
            let userId = params['id'];
              //console.log(userId);
          this.loginService.getUsers(userId,this.user.token).subscribe(
              res => { 
                  this.usersRecord = res
                //  console.log(this.usersRecord)
            })
          });  
    } 

    public EditUser(editUserObj:NgForm){
      //  console.log(editUserObj.value);
        this.loginService.EditUser(editUserObj.value,this.user.token).subscribe(res => 
            {
               // console.log(res);
                this.router.navigate(['manage-users']);
            });
           
    }
}

@Component({
    moduleId: module.id,
    selector: 'manage-users',
    templateUrl: './manage-users.component.html',
    providers: [LoginService],
})

export class MangeUsersComponent implements OnInit {
    users:any;
    user:any;
     disable:any;
     enable:any;
     status:boolean=false;
    constructor(
        // private _service: CustomerService,
        private loginService:LoginService,
        private router: Router
    ) {}
    ngOnInit(): void {
        this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.ManageUsers();
     }

    
    AddKey(){
        for(let i=0;i<this.users.length;i++){
            let userObj = this.users[i];
            userObj.isDisabled = true;
          // console.log(userObj); 
        }
    }


    public ManageUsers(){
        // this.loginService.AddUser(f.value).subscribe(res=>console.log(res));
      /*   let check = localStorage.getItem('tableObj');
          console.log(check);
         if( (check !== 'undefined' )) { 
            this.users = JSON.parse(check);
         }
       else {*/
            this.loginService.ManageUsers(this.user.token).subscribe(res=>{
                this.users=res,
              //  console.log(this.users),
                this.AddKey();
            });
        }
    
    enableStatus(userId:any,index:any)
    {
        this.status = true;
        this.loginService.activeStatus(userId,this.user.token).subscribe(res=>{
            this.enable = res;
            console.log(this.enable)});
        // this.disable=true;
        this.users[index].isDisabled = !this.users[index].isDisabled;
        // console.log(this.users[index].isDisabled );
        this.enable = this.users[index].isDisabled;
        // localStorage.setItem('tableObj',JSON.stringify(this.users));
    }
    disableStatus(userId:any,index:any){
        this.status = false;
        this.loginService.InactiveStatus(userId,this.user.token).subscribe(res=>{
            this.disable = res;
            console.log(this.disable)});
        // this.disable=false;
        this.users[index].isDisabled = !this.users[index].isDisabled;
        this.disable = this.users[index].isDisabled;
        // console.log(this.users[index].isDisabled );
        // localStorage.setItem('tableObj',JSON.stringify(this.users));
    }

    editUser(userId:any){
        // console.log(emp_code);
        this.router.navigate(['edit-user',userId]);
    }
    
}