import { NgModule } from '@angular/core';
import { Route, Routes, RouterModule } from '@angular/router';

import { JobsComponent, PastJobsComponent } from './jobs.component';

const routes: Routes = [
	{
		path: 'jobs',
		component: JobsComponent
	},
	{
		path: 'past-jobs',
		component: PastJobsComponent
	}
  ];
  
@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class JobsRoutingModule {}