import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ThemeModule } from '../../@theme/theme.module';
import { Annw01Component } from '../all/annw01/annw01.component';
import { Anum01Component } from '../all/anum01/anum01.component';
import { DashBoardComponent } from '../all/dashboard/dashboard.component';
import { CardShortComponent } from '../all/dashboard/card-short/card-short.component';
import { ActivitiesComponent } from '../all/dashboard/activities-dashboard/activities-dashboard.component';
import { NewsComponent } from '../all/dashboard/news-dashboard/news-dashboard.component';
import { BlogComponent } from '../all/dashboard/blog/blog.component';
import { CardLongComponent } from '../all/dashboard/card-long/card-long.component';

const ALL_COMPONENTS = [
  Annw01Component,
  Anum01Component,
  DashBoardComponent,
  CardShortComponent,
  ActivitiesComponent,
  NewsComponent,
  BlogComponent,
  CardLongComponent 

];
@NgModule({
  imports: [
    ThemeModule,
    SharedModule
  ],
  declarations: [
    ...ALL_COMPONENTS
  ],
  exports: [
    ...ALL_COMPONENTS
  ]
})
export class AllModule { }
