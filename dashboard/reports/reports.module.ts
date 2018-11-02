import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { ReportsComponent,ReportJobTypeComponent,ReportCategoryComponent,ReportBrandComponent,ReportsByPdComponent,ReportsByQcComponent } from './reports.component';
import { ReportsRoutingModule } from './reports.routing';
import { PageHeaderModule } from '../../../shared';

@NgModule({
    imports: [FormsModule,
        CommonModule,
        RouterModule,
        ReportsRoutingModule,
        ChartsModule,
        AngularMultiSelectModule,
        PageHeaderModule,
        NgbModule.forRoot()
    ],
    declarations: [ReportsComponent,ReportJobTypeComponent,ReportCategoryComponent,ReportBrandComponent,ReportsByPdComponent,ReportsByQcComponent],
    providers: [],
    exports: [ReportsComponent,ReportJobTypeComponent,ReportCategoryComponent,ReportBrandComponent,ReportsByPdComponent,ReportsByQcComponent]
})

export class ReportsModule { }