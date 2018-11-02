import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { JobsComponent,PastJobsComponent } from './jobs.component';
import { JobsRoutingModule } from './jobs.routing';

import { PageHeaderModule } from '../../../shared';

@NgModule({
    imports: [FormsModule,
        CommonModule,
        RouterModule,
        JobsRoutingModule,
        PageHeaderModule
    ],
    declarations: [JobsComponent,PastJobsComponent],
    providers: [],
    exports: [JobsComponent,PastJobsComponent]
})

export class JobsModule { }