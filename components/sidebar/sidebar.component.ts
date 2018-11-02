import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    isActive: boolean = false;
    showMenu: string = '';
    pushRightClass: string = 'push-right';
    userObj:any;
    jobBriefing:boolean = true;
    userSettings:boolean = true;
    userManagement:boolean = true;
    workFlow:boolean = true;
    list:boolean=true;
    flow:boolean=false;
    flowQc:boolean = false;
    report:boolean = true;
    listTask:boolean = false;
    constructor(private translate: TranslateService,public router: Router)
     {
        this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de']);
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de/) ? browserLang : 'en');

        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {
        this.userObj = JSON.parse(localStorage.getItem('currentUser'));
       // console.log(this.userObj.userType);

        if(this.userObj.userType == 'AccountManager'){
           // this.workFlow = false;
            this.userManagement = false;
            
        }
        if(this.userObj.userType == 'Manager'){
           // this.jobBriefing = true;
            this.userManagement = false;
            this.flow = true;
            this.report = false;
            this.flowQc=true;
            this.list = false;
            this.listTask = true;
        }

        if(this.userObj.userType == 'Admin'){
          //  this.jobBriefing = true;
            this.list = false;
            this.report = false;
            this.workFlow = false;
        }

        if(this.userObj.userType == 'TeamLead'){
         //   this.jobBriefing = false;
            this.userManagement = false;
            this.flowQc=true;
            this.list = false;
            this.listTask = true;
        }

        if(this.userObj.userType == 'Employee'){
            this.jobBriefing = false;
            this.userManagement = false;
         }


    }

    eventCalled() {
        this.isActive = !this.isActive;
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    changeLang(language: string) {
        this.translate.use(language);
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
    }
}
