import { NgModule } from '@angular/core';
import { Route, Routes, RouterModule } from '@angular/router';

import { JobBriefingDetailsComponent,JobListingComponent,JobBriefingDetailsEditComponent } from './job-briefing.component';

const routes: Routes = [
	// {
	// 	path: 'job-briefing',
	// 	component: JobBriefingComponent
	// },
	{
		path: 'job-briefingdetails',
		component: JobBriefingDetailsComponent
	},
	{
		path: 'job-listing',
		component: JobListingComponent
	},
	{
		path: 'job-briefingdetailsEdit/:id',
		component: JobBriefingDetailsEditComponent
	}
	
  ];
  
@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class JobBriefingRoutingModule {}