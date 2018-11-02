import { NgModule } from '@angular/core';
import { Route, Routes, RouterModule } from '@angular/router';

import { AddUserComponent, EditUserComponent,MangeUsersComponent } from './user-management.component';

const routes: Routes = [
	{
		path: 'add-user',
		component: AddUserComponent
	},
	{
		path: 'edit-user/:id',
		component: EditUserComponent
    },
    {
		path: 'manage-users',
		component: MangeUsersComponent
    },
    
  ];
  
@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class UserManagementRoutingModule {}