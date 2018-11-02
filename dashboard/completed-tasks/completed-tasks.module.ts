import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PageHeaderModule } from '../../../shared';
import { CompletedTasksComponent,CompletedTasksDetailsComponent,ListExternalErrorComponent,AddExternalErrorComponent,ModifyExternalErrorComponent } from './completed-tasks.component';
import { CompletedTasksRoutingModule } from './completed-tasks.routing';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        RouterModule,
        PageHeaderModule,
        CompletedTasksRoutingModule,
    ],
    declarations: [ CompletedTasksComponent,CompletedTasksDetailsComponent,ListExternalErrorComponent,AddExternalErrorComponent,ModifyExternalErrorComponent ],
    providers: [],
    exports: [ CompletedTasksComponent,CompletedTasksDetailsComponent,ListExternalErrorComponent,AddExternalErrorComponent,ModifyExternalErrorComponent ]
})

export class CompletedtasksModule { }