import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { AddUserComponent } from './user-management.component';
import { EditUserComponent } from './user-management.component';
import { MangeUsersComponent } from './user-management.component';
import { UserManagementRoutingModule } from './user-management.routing';
import { PageHeaderModule } from '../../../shared';

@NgModule({
    imports: [FormsModule,
        CommonModule,
        RouterModule,
        UserManagementRoutingModule,
        PageHeaderModule
    ],
    declarations: [AddUserComponent, EditUserComponent,MangeUsersComponent ],
    providers: [],
    exports: [AddUserComponent, EditUserComponent,MangeUsersComponent ]
})

export class UserManagementModule { }