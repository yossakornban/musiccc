import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ThemeModule } from '../../@theme/theme.module';
import { OfficerRoutingModule, routedComponents } from './officer-routing.module';
import { AllModule } from '../all/all.module';

@NgModule({
  imports: [
    ThemeModule,
    OfficerRoutingModule,
    SharedModule,
    AllModule
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class OfficerModule { }
