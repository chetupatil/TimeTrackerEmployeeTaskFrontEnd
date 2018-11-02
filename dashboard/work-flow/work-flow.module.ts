import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WorkFlowComponent,WorkFlowHistroyComponent,ApprovedByQcComponent,CompleteHistroyComponent,JobBriefingDetailsComponent,CompleteJobDetailsComponent} from './work-flow.component';
import { WorkFlowRoutingModule } from './work-flow.routing';

import { PageHeaderModule } from '../../../shared';

@NgModule({
    imports: [FormsModule,
        CommonModule,
        RouterModule,
        WorkFlowRoutingModule,
        PageHeaderModule,
        NgbModule.forRoot(),
    ],
    declarations: [WorkFlowComponent,WorkFlowHistroyComponent,ApprovedByQcComponent,CompleteHistroyComponent,JobBriefingDetailsComponent,CompleteJobDetailsComponent],
    providers: [],
    exports: [WorkFlowComponent,WorkFlowHistroyComponent,ApprovedByQcComponent,CompleteHistroyComponent,JobBriefingDetailsComponent,CompleteJobDetailsComponent]
})

export class WorkFlowModule { }