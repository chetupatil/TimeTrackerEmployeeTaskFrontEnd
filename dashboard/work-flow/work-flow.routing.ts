import { NgModule } from '@angular/core';
import { Route, Routes, RouterModule } from '@angular/router';

import { WorkFlowComponent,WorkFlowHistroyComponent,ApprovedByQcComponent,CompleteHistroyComponent,JobBriefingDetailsComponent,CompleteJobDetailsComponent } from './work-flow.component';

const routes: Routes = [
	{
		path: 'work-flow',
		component: WorkFlowComponent
	},
	{
		path: 'work-flow-histroy',
		component: WorkFlowHistroyComponent
	},
	{
		path: 'qc-approved',
		component: ApprovedByQcComponent
	},
	{
		path: 'complete-histroy/:id',
		component: CompleteHistroyComponent
	},
	{
		path: 'job-briefing-details',
		component: JobBriefingDetailsComponent
	},
	{
		path: 'complete-job-details/:id',
		component: CompleteJobDetailsComponent
	},
  ];
  
@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class WorkFlowRoutingModule {}