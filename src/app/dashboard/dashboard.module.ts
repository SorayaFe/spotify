import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MaterialModule } from '../material.module';
import { TimeRangeMonthsPipe } from './time-range-months.pipe';
import { GlobalModule } from '../global.module';
import { ArtistsNamesPipe } from './artists-names.pipe';

@NgModule({
  declarations: [DashboardComponent, TimeRangeMonthsPipe, ArtistsNamesPipe],
  imports: [CommonModule, DashboardRoutingModule, MaterialModule, GlobalModule],
})
export class DashboardModule {}
