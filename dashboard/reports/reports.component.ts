import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute, Params  } from '@angular/router';
import { ReportsService } from './reports.service';
import { LoginService } from '../../../login/login.service';
import {NgForm } from '@angular/forms';
import { FormsModule }from '@angular/forms';
import { isEmpty } from 'rxjs/operators/isEmpty';
import { element } from 'protractor';

@Component({
    moduleId: module.id,
    selector: 'reports',
    templateUrl: './reports.component.html',
    providers: [ReportsService],
})

export class ReportsComponent implements OnInit {
   
    constructor(
        private router: Router,
        private reportsService:ReportsService
    ) {}
    yearArr:any = [];
    clientName:any = [];
    user:any;
    jobsYear:any;
    //date:any;
    year:any;
    client_name:any = "HARMAN";

    ngOnInit(): void {
     this.user = JSON.parse(localStorage.getItem('currentUser'));
     this.getDate();
     console.log(this.yearArr);
     this.year = this.yearArr[0].year
     this.getMasterJsonData();
     this.JobsByYear({'value':{'year':this.year,'client_name':'HARMAN'}})
    }
    getMasterJsonData(){
      this.reportsService.masterJsonData(this.user.token).subscribe(res=>{
           this.clientName=res;
           console.log(this.clientName);
      });
    }
    
    getDate()
    {
      const date = new Date();
      let year = date.getFullYear();
      console.log(year);      
      let Year = year.toString();
      this.yearArr.push({year:Year});
      let count=1;
      for(let i=1;i<=5;i++){
          year = year-count;
          Year = year.toString();
          this.yearArr.push({year:Year});
      }
      console.log(this.yearArr);
    }
      title = "Reports Based on Number of Jobs";
      
      public barChartOptions:any = {
        scaleShowVerticalLines: false,
        responsive: true
      };
      public barChartLabels:string[] = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN','JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
      public barChartType:string = 'bar';
      public barChartLegend:boolean = true;
     
      public barChartData:any[] = [
        {data: [65, 59, 80, 81, 56, 55, 40,65, 59, 80, 81, 56,], label: 'Jobs'},
      ];
      // events
      public chartClicked(e:any):void {
        console.log(e);
      }
     
      public chartHovered(e:any):void {
        console.log(e);
      }

      public randomize(){

      }
     
        JobsByYear(job:any){
          console.log(job.value);
          this.reportsService.JobsByYear(job.value,this.user.token).subscribe(res=>{
            this.jobsYear=res;
            console.log(this.jobsYear);
            let jobsArray = [];
            for(let i=0;i<this.jobsYear.length;i++){
               jobsArray.push(this.jobsYear[i].DeliveredJobs);
            }
            console.log(jobsArray);
            let clone = JSON.parse(JSON.stringify(this.barChartData));
            clone[0].data = jobsArray;
            console.log(clone);
            this.barChartData = clone;
          });
        }
        
      
}


@Component({
  moduleId: module.id,
  selector: 'report-qc',
  templateUrl: './reportsByQc.component.html',
  providers: [ReportsService,LoginService],
})

export class ReportsByQcComponent implements OnInit {
  constructor(
    private router: Router,
    private reportsService:ReportsService,
    private loginService:LoginService
) {}
users:any = [];
user:any;
QcPerson:any;
year:any;
user_id:any = 6;
masterArr:any = [];
QcPersons:any = [];
ngOnInit(): void {
  this.user = JSON.parse(localStorage.getItem('currentUser'));
  this.getUsers();
  this.getDate();
  this.getMasterJSONData();
  this.year = this.yearArr[0].year;
  this.getJobsByQc({'value':{year: "2018", client_name: "HARMAN", QcPerson: "Nelson"}},this.user.token);
  
}
yearArr:any = [];
client_name = "HARMAN";

      getDate()
      {
        const date = new Date();
        let year = date.getFullYear();
        console.log(year);      
        let Year = year.toString();
        this.yearArr.push({year:Year});
        let count=1;
        for(let i=1;i<=5;i++){
            year = year-count;
            Year = year.toString();
            this.yearArr.push({year:Year});
        }
        console.log(this.yearArr);
      }
      getUsers(){
        this.loginService.ManageUsers(this.user.token).subscribe(res=>{
             this.users=res;
             console.log(this.users);
        });
      }
      getMasterJSONData(){
        this.reportsService.masterJsonData(this.user.token).subscribe(res=>{
             this.masterArr=res;
             console.log(this.masterArr);
        });
      }

title = 'Chart Based on Qc';
public barChartOptions:any = {
  scaleShowVerticalLines: false,
  responsive: true
};
public barChartLabels:string[] = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN','JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
public barChartType:string = 'bar';
public barChartLegend:boolean = true;

public barChartData:any[] = [
  {data: [65, 59, 80, 81, 56, 55, 40,65, 59, 80, 81, 56,], label: 'External Error'},
  {data: [65, 59, 80, 81, 56, 55, 40,65, 59, 80, 81, 56,], label: 'Qc Checked'},  
];
// events
public chartClicked(e:any):void {
  console.log(e);
}

public chartHovered(e:any):void {
  console.log(e);
}
public randomize(){
        
      }
  getJobsByQc(obj:any,token:any){
      console.log(obj.value);  
      this.reportsService.JobsByQc(obj.value,this.user.token).subscribe(res=>{
        this.QcPersons=res;
        console.log(this.QcPersons);
        let ExternalError:any = [];
        let QcChecked:any = [];
        let clone = JSON.parse(JSON.stringify(this.barChartData));
       
        for (let i = 0; i< this.QcPersons.length; i++) {
            ExternalError.push(this.QcPersons[i].ExternalErrors.length);
            QcChecked.push(this.QcPersons[i].QcChecked.length);
        }
        console.log(ExternalError);
        console.log(QcChecked);
        clone[0].data = ExternalError;
        clone[1].data = QcChecked;
        this.barChartData = clone;
   });
  }
    

}


@Component({
  moduleId: module.id,
  selector: 'report-pd',
  templateUrl: './reportsByPd.component.html',
  providers: [ReportsService,LoginService],
})
export class ReportsByPdComponent implements OnInit {
  
  constructor(
    private router: Router,
    private reportsService:ReportsService,
    private loginService:LoginService
) {}

users:any = [];
user:any;
PdPerson:any;
year:any;
user_id:any = 6;
masterArr:any = [];
PdPersons:any = [];
ngOnInit(): void {
  this.user = JSON.parse(localStorage.getItem('currentUser'));
  this.getUsers();
  this.getDate();
  this.getMasterJSONData();
  this.year = this.yearArr[0].year;
  this.getJobsByPd({'value':{year: "2018", client_name: "HARMAN", PdPerson: "Rajadurai"}},this.user.token);
}
yearArr:any = [];
client_name:any = "HARMAN";
      getDate()
      {
        const date = new Date();
        let year = date.getFullYear();
        console.log(year);
        let Year = year.toString();      
        this.yearArr.push({year:Year});
        let count=1;
        for(let i=1;i<=5;i++){
            year = year-count;
            Year = year.toString();
            this.yearArr.push({year:Year});
        }
        console.log(this.yearArr);
      }
      getUsers(){
        this.loginService.ManageUsers(this.user.token).subscribe(res=>{
             this.users=res;
             console.log(this.users);
        });
      }
      getMasterJSONData(){
        this.reportsService.masterJsonData(this.user.token).subscribe(res=>{
             this.masterArr=res;
             console.log(this.masterArr);
        });
      }

title = 'Chart Based on PD';
public barChartOptions:any = {
  scaleShowVerticalLines: false,
  responsive: true
};
public barChartLabels:string[] = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN','JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
public barChartType:string = 'bar';
public barChartLegend:boolean = true;

public barChartData:any[] = [
  {data: [65, 59, 80, 81, 56, 55, 40,65, 59, 80, 81, 56,], label: 'External Error'},
  {data: [65, 59, 80, 81, 56, 55, 40,65, 59, 80, 81, 56,], label: 'Internal Error'},
  {data: [65, 59, 80, 81, 56, 55, 40,65, 59, 80, 81, 56,], label: 'Success'},  
];
// events
public chartClicked(e:any):void {
  console.log(e);
  for(let i=0;i<e.active.length;i++){
    console.log(e.active[i]._model.datasetLabel);
  }
}

public chartHovered(e:any):void {
  console.log(e);
  
}
public randomize(){
        
}
  getJobsByPd(obj:any,token:any){
      console.log(obj.value);  
      this.reportsService.JobsByPd(obj.value,this.user.token).subscribe(res=>{
        this.PdPersons=res;
        console.log(this.PdPersons);
        let ExternalError:any = [];
        let InternalError:any = [];
        let Success:any = [];
        
        let clone = JSON.parse(JSON.stringify(this.barChartData));
       
        for (let i = 0; i< this.PdPersons.length; i++) {
            ExternalError.push(this.PdPersons[i].ExternalError.length);
            InternalError.push(this.PdPersons[i].InternalError.length);
            Success.push(this.PdPersons[i].success.length);
          
        }
        console.log(ExternalError);
        console.log(InternalError);
        console.log(Success);
        clone[0].data = ExternalError;
        clone[1].data = InternalError;
        clone[2].data = Success
        this.barChartData = clone;
   });
  }


}


@Component({
  moduleId: module.id,
  selector: 'report-job-type',
  templateUrl: './reportByJobType.component.html',
  providers: [ReportsService],
})

export class ReportJobTypeComponent implements OnInit {
  
    constructor(
        private router: Router,
        private reportsService:ReportsService
    ) {}
    yearArr:any = [];
    JobTypeArr:any = [];
      user:any;
      jobsYear:any;
      masterArr:any = [];
      monthArr:any = [
        {'key':'ALL'},
        {'key':'JAN'},
        {'key':'FEB'},
        {'key':'MAR'},
        {'key':'APR'},
        {'key':'MAY'},
        {'key':'JUN'},
        {'key':'JUL'},
        {'key':'AUG'},
        {'key':'SEP'},
        {'key':'OCT'},       
        {'key':'NOV'},
        {'key':'DEC'}                        
      ]
      settings = {};
      selectedItems = [];
      
      month:any;
      year:any;
      client_name = "HARMAN";
      ngOnInit(): void {
       this.user = JSON.parse(localStorage.getItem('currentUser'));
       this.getDate();
       console.log(this.yearArr);
       this.getJobTypeData();
      
       this.settings = {
        singleSelection: false, 
        text:"Select Jobtype",
        selectAllText:'Select All',
        unSelectAllText:'UnSelect All',
        enableSearchFilter: true,
        classes:"myclass custom-class",
        limitSelection:5,
        badgeShowLimit:1
        };
        this.selectedItems = [
          {itemName: "AMEND", id: 1},{itemName: "BUILD", id: 2},{itemName: "RE-BUILD", id: 3},{itemName: "IMAGE_WORK", id: 4},{itemName: "AMEND_RECREATION", id: 5}
        ];
       this.getMasterJSONData();
       this.year = this.yearArr[0].year;
       this.month = this.monthArr[0].key;
       this.getJobsByJobType({'value':{'year':this.year,'month':'ALL','client_name':'HARMAN','jobtype':[{itemName: "AMEND", id: 1}, {itemName: "BUILD", id: 2},{itemName: "RE-BUILD", id: 3},{itemName: "IMAGE_WORK", id: 4},{itemName: "AMEND_RECREATION", id: 5}]}})

      }

      onItemSelect(item:any){
        console.log(item);
        console.log(this.selectedItems);
        console.log(this.selectedItems.length);        
    }
    OnItemDeSelect(item:any){
        console.log(item);
        console.log(this.selectedItems);
    }
    public randomize(){
        
    }   
      getJobTypeData(){
        this.reportsService.JobTypeData(this.user.token).subscribe(res=>{
             this.JobTypeArr=res;
             console.log(this.JobTypeArr);

            for (let index = 0; index < this.JobTypeArr.length; index++) {
              const element = this.JobTypeArr[index];
              console.log(element);
              this.JobTypeArr[index].itemName = this.JobTypeArr[index].JobType;
              this.JobTypeArr[index].id = index+1;               
              delete this.JobTypeArr[index].JobType;  
            }
             console.log(this.JobTypeArr);
        });
      }

      getMasterJSONData(){
        this.reportsService.masterJsonData(this.user.token).subscribe(res=>{
             this.masterArr=res;
             console.log(this.masterArr);
        });
      }
      
      getDate()
      {
        const date = new Date();
        let year = date.getFullYear();
        console.log(year);
        let Year = year.toString();      
        this.yearArr.push({year:Year});
        let count=1;
        for(let i=1;i<=5;i++){
            year = year-count;
            let Year = year.toString();
            this.yearArr.push({year:Year});
        }
        console.log(this.yearArr);
      }

      title = "Charts Based on Job-Type";

      public barChartOptions:any = {
        scaleShowVerticalLines: false,                                      
        responsive: true
      };
      public barChartLabels:string[] = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP','OCT','NOV','DEC'];
      public barChartType:string = 'bar';
      public barChartLegend:boolean = true;
     
      public barChartData:any[] = [
        {data: [65, 59, 80, 81, 56, 55, 40,65, 59, 80, 81, 56, 55], label: 'AMEND'},
        {data: [28, 48, 40, 19, 86, 27, 90,48, 40, 19, 86, 27, 90], label: 'BUILD'},        
        {data: [65, 59, 80, 81, 56, 55, 40,59, 80, 81, 56, 55, 40], label: 'RE-BUILD'},
        {data: [28, 48, 40, 19, 86, 27, 90,48, 40, 19, 86, 27,30], label: 'IMAGE-WORK'},
        {data: [65, 59, 80, 81, 56, 55, 40,80, 81, 56, 55, 40,20], label: 'AMEND-RECREATION'},
      ];
      
      // events
      public chartClicked(e:any):void {
        console.log(e);
      }
     
      public chartHovered(e:any):void {
        console.log(e);
      }

      
      jobsJobType:any = [];
      isValue:boolean = false;
      message:String;
      jobtypeArr:any = [];

      

      getJobsByJobType(jobType:any){
          
          for(let i=0;i<jobType.value.jobtype.length;i++){
              this.jobtypeArr.push(jobType.value.jobtype[i].itemName);
          }
          
          jobType.value.jobtype = this.jobtypeArr;
          this.jobtypeArr = [];
          console.log(jobType.value);

          this.reportsService.JobsByJobType(jobType.value,this.user.token).subscribe(res=>{
            this.jobsJobType=res;
            console.log(this.jobsJobType);

          let uniqueCategory = [];
          let jobsDelivered = [];
          let resMonth:any;
          this.jobsJobType.forEach(element => {
              if(uniqueCategory.indexOf(element.JobType) === -1){
                 uniqueCategory.push(element.JobType);
              }
              jobsDelivered.push(element.DeliveredJobs);
              resMonth = (element.Month).toUpperCase();
          });
          console.log(uniqueCategory);
          console.log(jobsDelivered);
          
          let count = uniqueCategory.length;
          // console.log(count);
          let counted = 0;
          
         if(jobType.value.jobtype.length == 5){
          if (jobType.value.month != 'ALL') {
            for(let i=0;i<this.barChartData.length;i++){
              this.barChartData[i]=[];
              this.barChartData[i] = {'data':[],'label':uniqueCategory[i]}
              for(let j=0;j<this.barChartLabels.length;j++){
                this.barChartData[i].data.push(counted);
              }
            }
          
          console.log(this.barChartData);
            let clone = JSON.parse(JSON.stringify(this.barChartData));
            console.log(resMonth);
            for(let i=0;i<this.barChartLabels.length;i++){
               if(this.barChartLabels[i] == resMonth){
                  let index = this.barChartLabels.indexOf(this.barChartLabels[i]);
                  for(let j=0;j<jobsDelivered.length;j++){
                    clone[j].data[index] = jobsDelivered[j];
                  }
               }
            }
            this.barChartData = clone;
            console.log(clone);
          }
          else{
            for(let i=0;i<this.barChartData.length;i++){
              this.barChartData[i].data=[];
              this.barChartData[i].label = uniqueCategory[i];
            }
            
            let clone = JSON.parse(JSON.stringify(this.barChartData));
            console.log(clone);
            console.log(jobType.value.month);
            for (let i = 0; i < jobsDelivered.length; i=i+count) {
              for(let j=0;j<count;j++){
                  clone[j].data.push(jobsDelivered[j+i]);
              }
          }
          this.barChartData = clone;
          console.log(clone);
          }
          
        } else {
          this.isValue = true;
          this.message ="please select 5 jobtypes";
        }
          
          });

      }
        
    }

    @Component({
      moduleId: module.id,
      selector: 'report-category-type',
      templateUrl: './reportByCategory.component.html',
      providers: [ReportsService]
    })

    export class ReportCategoryComponent implements OnInit {
      constructor(
          private router: Router,
          private reportsService:ReportsService
      ) {}
      year:any;
      yearArr:any = [];
      categoryArr:any = [];
      user:any;
      jobsYear:any;
      masterArr:any = [];
      monthArr:any = [
        {'key':'ALL'},
        {'key':'JAN'},
        {'key':'FEB'},
        {'key':'MAR'},
        {'key':'APR'},
        {'key':'MAY'},
        {'key':'JUN'},
        {'key':'JUL'},
        {'key':'AUG'},
        {'key':'SEP'},
        {'key':'OCT'},       
        {'key':'NOV'},
        {'key':'DEC'}                        
      ]
      month:any;
      client_name:any = "HARMAN";
      settings = {};
      selectedItems = [];
      jobsCategory = [];
      DeliveredJobs:any = [];
      objCat:any;
      ngOnInit(): void {
       this.user = JSON.parse(localStorage.getItem('currentUser'));
       this.getDate();
       this.year = this.yearArr[0].year;
       this.month = this.monthArr[0].key;
       this.getCategoryData();
       this.settings = {
          singleSelection: false, 
          text:"Select Categories",
          selectAllText:'Select All',
          unSelectAllText:'UnSelect All',
          enableSearchFilter: true,
          classes:"myclass custom-class",
          limitSelection:5,
          badgeShowLimit:1
        };
        this.selectedItems = [{itemName: "LUXUARY AUDIO", id: 1},{itemName: "CAR AUDIO", id: 2},{itemName: "CONNECTED HOME", id: 3},{itemName: "SMART AUDIO", id: 4},{itemName: "ALL", id: 5}];
       this.getMasterJSONData();
     
       this.JobsByCategory({'value':{'year':this.year,'month':'ALL','client_name':'HARMAN','category':[{itemName: "LUXUARY AUDIO", id: 1}, {itemName: "CAR AUDIO", id: 2},{itemName: "CONNECTED HOME", id: 3},{itemName: "SMART AUDIO", id: 4},{itemName: "ALL", id: 5}]}})
        
      }

      onItemSelect(item:any){
        console.log(item);
        console.log(this.selectedItems);       
    }
    OnItemDeSelect(item:any){
        console.log(item);
        console.log(this.selectedItems);
    }

    public randomize(){

    }
    
      getCategoryData(){
        this.reportsService.categoryData(this.user.token).subscribe(res=>{
             this.categoryArr=res;
             console.log(this.categoryArr);
             
             for (let index = 0; index < this.categoryArr.length; index++) {
                    const element = this.categoryArr[index];
                    console.log(element);
                    if(this.categoryArr[index].category == "NA"){
                       console.log(this.categoryArr[index].category);
                       this.categoryArr.splice(index,1);
                    } 
            }
            console.log(this.categoryArr);
            for (let index = 0; index < this.categoryArr.length; index++) {
              const element = this.categoryArr[index];
              console.log(element);
              this.categoryArr[index].itemName = this.categoryArr[index].category;
              this.categoryArr[index].id = index+1;               
              delete this.categoryArr[index].category;  
            }
            console.log(this.categoryArr);
        });
      }

      getMasterJSONData(){
        this.reportsService.masterJsonData(this.user.token).subscribe(res=>{
             this.masterArr=res;
             console.log(this.masterArr);
        });
        
      }
      
      getDate()
      {
        const date = new Date();
        let year = date.getFullYear();
        console.log(year.toString()); 
        let Year = year.toString();     
        this.yearArr.push({year:Year});
        let count=1;
        for(let i=1;i<=5;i++){
            year = year-count;
            let Year = year.toString();
            this.yearArr.push({year:Year});
        }
        console.log(this.yearArr);
      }

      title = "Charts Based on Category Type";

      public barChartOptions:any = {
        scaleShowVerticalLines: false,                                      
        responsive: true
      };
      public barChartLabels:string[] = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP','OCT','NOV','DEC'];
      public barChartType:string = 'bar';
      public barChartLegend:boolean = true;
     
      public barChartData:any[] = [
        {data: [65, 59, 80, 81, 56, 55, 40], label: 'LUXUARY AUDIO'},
        {data: [28, 48, 40, 19, 86, 27, 90], label: 'CAR AUDIO'},        
        {data: [65, 59, 80, 81, 56, 55, 40], label: 'CONNECTED HOME'},
        {data: [28, 48, 40, 19, 86, 27, 90], label: 'SMART AUDIO'},
        {data: [65, 59, 80, 81, 56, 55, 40], label: 'HEADPHONES'},
      ];
      
      // events
      public chartClicked(e:any):void {
        console.log(e);
      }
     
      public chartHovered(e:any):void {
        console.log(e);
      }

      

      isValue:boolean = false;
      message:string;
      category:any = [];
      JobsByCategory(catObj:any){
          console.log(catObj.value);
          this.category = [];
          for (let index = 0; index < catObj.value.category.length; index++) {
            const element = catObj.value.category[index];
            this.category.push(element.itemName);            
          }
          
          catObj.value.category = this.category;
          
          this.reportsService.JobsByCategory(catObj.value,this.user.token).subscribe(res=>{
          this.jobsCategory=res;
          console.log(this.jobsCategory);
          let uniqueCategory = [];
          let jobsDelivered = [];
          let resMonth:any;
          this.jobsCategory.forEach(element => {
              if(uniqueCategory.indexOf(element.category) === -1){
                 uniqueCategory.push(element.category);
              }
              jobsDelivered.push(element.DeliveredJobs);
              resMonth = element.Month;
          });
          console.log(jobsDelivered);
          let count = uniqueCategory.length;
          console.log(uniqueCategory);
          let counted = 0;
          
          if(catObj.value.category.length == 5){
          if (catObj.value.month != 'ALL') {

            for(let i=0;i<this.barChartData.length;i++){
              this.barChartData[i]=[];
              this.barChartData[i] = {'data':[],'label':uniqueCategory[i]}
              for(let k=0;k<this.barChartLabels.length;k++){
                 this.barChartData[i].data.push(counted)
              }
            }
            console.log(this.barChartData);
        
            for(let i=0;i<this.barChartLabels.length;i++){
               if(this.barChartLabels[i] == resMonth){
                  let index = this.barChartLabels.indexOf(this.barChartLabels[i]);
                  for(let j=0;j<jobsDelivered.length;j++){
                    this.barChartData[j].data[index] = jobsDelivered[j];
                  }
               }
            }
           
           console.log(this.barChartData);
           let clone = JSON.parse(JSON.stringify(this.barChartData));
           console.log(clone);
           this.barChartData = clone;
          }
          else{
            for(let i=0;i<this.barChartData.length;i++){
              this.barChartData[i].data=[];
              this.barChartData[i].label = uniqueCategory[i];
            }
            
            console.log(catObj.value.month);
            for (let i = 0; i < jobsDelivered.length; i=i+count) {
              for(let j=0;j<count;j++){
                  this.barChartData[j].data.push(jobsDelivered[j+i]);
              }
          }
          let clone = JSON.parse(JSON.stringify(this.barChartData));
            // console.log(clone);
          this.barChartData = clone;
          console.log(clone);
          }
        } else {
            this.isValue = true;
            this.message = "please select 5 categories";
        }
        });     
      }         
      
    }

    @Component({
      moduleId: module.id,
      selector: 'report-brand-type',
      templateUrl: './reportByBrand.component.html',
      providers: [ReportsService],
    })

    export class ReportBrandComponent implements OnInit {
     
      constructor(
          private router: Router,
          private reportsService:ReportsService
      ) {}

      yearArr:any = [];
      BrandArr:any = [];
      user:any;
      year:any;
      jobsYear:any;
      masterArr:any = [];
      monthArr:any = [
        {'key':'ALL'},
        {'key':'JAN'},
        {'key':'FEB'},
        {'key':'MAR'},
        {'key':'APR'},
        {'key':'MAY'},
        {'key':'JUN'},
        {'key':'JUL'},
        {'key':'AUG'},
        {'key':'SEP'},
        {'key':'OCT'},       
        {'key':'NOV'},
        {'key':'DEC'}                        
      ]
      settings = {};
      selectedItems = [];
      jobsBrand = [];
      month:any;
      client_name = "HARMAN";
      ngOnInit(): void {
       this.user = JSON.parse(localStorage.getItem('currentUser'));
       this.getDate();
       console.log(this.yearArr);
       this.getBrandData();
       this.settings = {
        singleSelection: false, 
        text:"Select Brands",
        selectAllText:'Select All',
        unSelectAllText:'UnSelect All',
        enableSearchFilter: true,
        classes:"myclass custom-class",
        limitSelection:5,
        badgeShowLimit:1
      };
        this.year = this.yearArr[0].year;
        this.month = this.monthArr[0].key;
        this.selectedItems = [
          {itemName: "HK1", id: 1},
          {itemName: "INFINITY", id: 2},
          {itemName: "JBL", id: 3},
          {itemName: "Char Siu", id: 4},
          {itemName: "HK", id: 5}
        ];
      
        
       this.getMasterJSONData();
      
       this.getJobsByBrand({'value':{'year':this.year,'month':'ALL','client_name':'HARMAN','Brands':[{itemName: "HK1", id: 1},{itemName: "INFINITY", id: 2},{itemName: "JBL", id: 3},{itemName: "Char Siu", id: 4},{itemName: "HK", id: 5} ]}})
       
  
      }

      onItemSelect(item:any){
        console.log(item);
        console.log(this.selectedItems);
        console.log(this.selectedItems.length);        
    }
    OnItemDeSelect(item:any){
        console.log(item);
        console.log(this.selectedItems);
    }
    public randomize(){

    }
      getBrandData(){
        this.reportsService.BrandData(this.user.token).subscribe(res=>{
             this.BrandArr=res;
             console.log(this.BrandArr);
            for (let index = 0; index < this.BrandArr.length; index++) {
              const element = this.BrandArr[index];
              console.log(element);
              this.BrandArr[index].itemName = this.BrandArr[index].Brand;
              this.BrandArr[index].id = index+1;               
              delete this.BrandArr[index].Brand;  
            }
             console.log(this.BrandArr);
        });
      }

      getMasterJSONData(){
        this.reportsService.masterJsonData(this.user.token).subscribe(res=>{
             this.masterArr=res;
             console.log(this.masterArr);
        });
      }
      
      getDate()
      {
        const date = new Date();
        let year = date.getFullYear();
        console.log(year);   
        let Year = year.toString();   
        this.yearArr.push({year:Year});
        let count=1;
        for(let i=1;i<=5;i++){
            year = year-count;
            let Year = year.toString();
            this.yearArr.push({year:Year});
        }
        console.log(this.yearArr);
      }

      title = "Charts Based on Brands";

      public barChartOptions:any = {
        scaleShowVerticalLines: false,                                      
        responsive: true
      };
      public barChartLabels:string[] = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP','OCT','NOV','DEC'];
      public barChartType:string = 'bar';
      public barChartLegend:boolean = true;
     
      public barChartData:any[] = [
        {data: [65, 59, 80, 81, 56, 55, 40,65, 59, 80, 81, 56, 55], label: 'HK1'},
        {data: [28, 48, 40, 19, 86, 27, 90,48, 40, 19, 86, 27, 90], label: 'INFINITY'},        
        {data: [65, 59, 80, 81, 56, 55, 40,59, 80, 81, 56, 55, 40], label: 'JBL'},
        {data: [28, 48, 40, 19, 86, 27, 90,48, 40, 19, 86, 27,30], label: 'Char Siu'},
        {data: [65, 59, 80, 81, 56, 55, 40,80, 81, 56, 55, 40,20], label: 'HK'},
      ];
      
      // events
      public chartClicked(e:any):void {
        console.log(e);
      }
     
      public chartHovered(e:any):void {
        console.log(e);
      }

      isValue:boolean = false;
      message:string;
      brand:any = [];

      getJobsByBrand(brandObj:any){
          console.log(brandObj.value);
            this.brand = [];
            for (let i = 0; i < brandObj.value.Brands.length; i++) {
              console.log(brandObj.value.Brands[i]);
                 const element = brandObj.value.Brands[i];
                this.brand.push(element.itemName);   
            }
          
          console.log(this.brand);
          brandObj.value.Brands =this.brand;
          console.log(brandObj.value.Brands.length);

          this.reportsService.JobsByBrand(brandObj.value,this.user.token).subscribe(res=>{
              this.jobsBrand=res;
              console.log(this.jobsBrand);

              let uniqueCategory = [];
              let jobsDelivered = [];
              let resMonth:any;
              this.jobsBrand.forEach(element => {
                  if(uniqueCategory.indexOf(element.Brand) === -1){
                     uniqueCategory.push(element.Brand);
                  }
                  jobsDelivered.push(element.DeliveredJobs);
                  resMonth = element.Month;
              });
              console.log(uniqueCategory);
              console.log(jobsDelivered);
              let count = uniqueCategory.length;
              //console.log(count);
              let counted = 0;
              console.log(brandObj.value.Brands.length);
              if(brandObj.value.Brands.length == 5){
              if (brandObj.value.month != 'ALL') {
                for(let i=0;i<this.barChartData.length;i++){
                  this.barChartData[i]=[];
                  this.barChartData[i] = {'data':[],'label':uniqueCategory[i]}

                  for(let j=0;j<this.barChartLabels.length;j++){
                    this.barChartData[i].data.push(counted);
                }
              }
              console.log(this.barChartData);
                let clone = JSON.parse(JSON.stringify(this.barChartData));
                console.log(resMonth);
                for(let i=0;i<this.barChartLabels.length;i++){
                   if(this.barChartLabels[i] == resMonth){
                      let index = this.barChartLabels.indexOf(this.barChartLabels[i]);
                      for(let j=0;j<jobsDelivered.length;j++){
                        clone[j].data[index] = jobsDelivered[j];
                      }
                   }
                }
                this.barChartData = clone;
                console.log(clone);
              }
              else{
                for(let i=0;i<this.barChartData.length;i++){
                  this.barChartData[i].data=[];
                  this.barChartData[i].label = uniqueCategory[i];
                }
                
                let clone = JSON.parse(JSON.stringify(this.barChartData));
                console.log(clone);
                console.log(brandObj.value.month);
                for (let i = 0; i < jobsDelivered.length; i=i+count) {
                  for(let j=0;j<count;j++){
                      clone[j].data.push(jobsDelivered[j+i]);
                  }
              }
              this.barChartData = clone;
              console.log(clone);
              }
            } else {
              this.isValue = true;
              this.message = "please select atleast 5 brands"
            }
              
          });

      }

    }