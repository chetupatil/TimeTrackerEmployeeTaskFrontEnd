import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ChangePasswordComponent, ViewProfileComponent,ResetPasswordComponent } from './user-settings.component';
import { UserSettingsRoutingModule } from './user-settings.routing';
import { PageHeaderModule } from '../../../shared';

@NgModule({
    imports: [FormsModule,
        CommonModule,
        RouterModule,
        UserSettingsRoutingModule,
        PageHeaderModule
    ],
    declarations: [ChangePasswordComponent, ViewProfileComponent,ResetPasswordComponent ],
    providers: [],
    exports: [ChangePasswordComponent, ViewProfileComponent,ResetPasswordComponent ]
})

export class UserSettingsModule { }