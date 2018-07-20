import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ThemeModule } from '../../@theme/theme.module';
import { AdminRoutingModule, routedComponents } from './admin-routing.module';
import { AllModule } from '../all/all.module';

@NgModule({
  imports: [
    ThemeModule,
    AdminRoutingModule,
    SharedModule,
    AllModule
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class AdminModule { }
