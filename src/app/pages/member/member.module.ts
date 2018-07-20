import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ThemeModule } from '../../@theme/theme.module';
import { MemberRoutingModule, routedComponents } from './member-routing.module';
import { AllModule } from '../all/all.module';

@NgModule({
  imports: [
    ThemeModule,
    MemberRoutingModule,
    SharedModule,
    AllModule
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class MemberModule { }
