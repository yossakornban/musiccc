import { NgModule } from '@angular/core';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { SharedModule } from '../shared/shared.module';

// Component.
import { PagesComponent } from './pages.component';

const PAGES_COMPONENTS = [
  PagesComponent
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    SharedModule
  ],
  declarations: [
    ...PAGES_COMPONENTS
  ]
})
export class PagesModule {
}
