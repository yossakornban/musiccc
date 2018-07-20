import { NgModule } from '@angular/core';
import { UnsignRoutingModule, QUESTION_COMPONENTS } from './unsign-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    UnsignRoutingModule,
    ThemeModule,
    SharedModule,
  ],
  declarations: [
    ...QUESTION_COMPONENTS,
  ],
})
export class UnsignModule {
}
