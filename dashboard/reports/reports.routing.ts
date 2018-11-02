import { NgModule } from '@angular/core';
import { Route, Routes, RouterModule } from '@angular/router';

import { ReportsComponent,ReportJobTypeComponent,ReportCategoryComponent,ReportBrandComponent,ReportsByPdComponent,ReportsByQcComponent } from './reports.component';

const routes: Routes = [
	
	{
		path: 'reports',
		component: ReportsComponent
	},
	{
		path: 'report-job-type',
		component: ReportJobTypeComponent
	},
	{
		path:'report-category-type',
		component: ReportCategoryComponent
	},
	{
		path:'report-brand-type',
		component: ReportBrandComponent
	},
	{
		path:'report-pd',
		component: ReportsByPdComponent
	},
	{
		path:'report-qc',
		component: ReportsByQcComponent
	}
  ];
  
@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ReportsRoutingModule {}