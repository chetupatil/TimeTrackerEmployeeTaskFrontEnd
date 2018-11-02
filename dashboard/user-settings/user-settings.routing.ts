import { NgModule } from '@angular/core';
import { Route, Routes, RouterModule } from '@angular/router';

import { ChangePasswordComponent, ViewProfileComponent,ResetPasswordComponent } from './user-settings.component';

const routes: Routes = [
	{
		path: 'view-profile',
		component: ViewProfileComponent
	},
	{
		path: 'change-password',
		component: ChangePasswordComponent
	},
	{
		path: 'reset-password',
		component: ResetPasswordComponent
	}
  ];
  
@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class UserSettingsRoutingModule {}