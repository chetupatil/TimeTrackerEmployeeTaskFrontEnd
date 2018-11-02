import { NgModule } from '@angular/core';
import { Route, Routes, RouterModule } from '@angular/router';

import { CompletedTasksComponent ,CompletedTasksDetailsComponent,ListExternalErrorComponent, 
	AddExternalErrorComponent,ModifyExternalErrorComponent} from './completed-tasks.component';

const routes: Routes = [
	// {
	// 	path: 'job-briefing',
	// 	component: JobBriefingComponent
	// },
	{
		path: 'completed-tasks',
		 component: CompletedTasksComponent
	},
	{
		path:'completed-tasks-details',
		component: CompletedTasksDetailsComponent
	},
	{
		path:'list-external-error/:id',
		component:ListExternalErrorComponent
	},
	{
		path:'add-external-error/:id',
		component:AddExternalErrorComponent
	},
	{
		path:'modify-external-error/:id',
		component:ModifyExternalErrorComponent
	}
  ];
  
@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CompletedTasksRoutingModule {}