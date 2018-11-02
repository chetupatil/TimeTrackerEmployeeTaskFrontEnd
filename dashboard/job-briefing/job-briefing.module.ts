import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PageHeaderModule } from '../../../shared';
import { JobBriefingDetailsComponent,JobListingComponent,JobBriefingDetailsEditComponent } from './job-briefing.component';
import { JobBriefingRoutingModule } from './job-briefing.routing';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        RouterModule,
        PageHeaderModule,
        JobBriefingRoutingModule,
    ],
    declarations: [ JobBriefingDetailsComponent,JobListingComponent,JobBriefingDetailsEditComponent],
    providers: [],
    exports: [ JobBriefingDetailsComponent,JobListingComponent,JobBriefingDetailsEditComponent]
})
export class JobBriefingModule { }