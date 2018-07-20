/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CoreModule } from './@core/core.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { BlockUIModule } from 'ng-block-ui';
import { BlockTemplateComponent } from "./@theme/components/block-template/block-template.component";
import { McBreadcrumbsModule } from 'ngx-breadcrumbs';
import { QuillModule } from 'ngx-quill'
import { StoreModule } from '@ngrx/store';
import { GalleryModule } from  '@ngx-gallery/core';
import { NgxGalleryModule } from 'ngx-gallery';
import { FileUploadModule } from 'ng2-file-upload';

//For Service Module.
import { ServiceModule } from "./shared/services/service.module";
import { Validation } from "./shared/services/validation.service";
import { reducers, metaReducers } from './shared/services/page-state/reducers'

//For Shared Module.
import { SharedModule } from "./shared/shared.module";
import { GuardModule } from "./shared/guard/guard.module";
import { PipeModule }    from './@core/pipe/pipe.module';

//For Translate Module.
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

//For Social Login Module.
// import { SocialLoginModule, AuthServiceConfig } from "angular5-social-login";
// import { getAuthServiceConfigs } from "./@core/socialloginConfig";
import { MsalHelper } from './shared/services/msalHelper';



// AoT requires an exported function for factories.
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "/assets/i18n/", ".json");
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    GuardModule,
    ServiceModule,
    SharedModule,
    FormsModule,
    // SocialLoginModule,
    QuillModule,
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    BlockUIModule.forRoot(),
    McBreadcrumbsModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    StoreModule.forRoot(reducers, {metaReducers}),
    PipeModule.forRoot(),
    GalleryModule.forRoot(),
    NgxGalleryModule,
    FileUploadModule
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    Validation,
    // {
    //   provide: AuthServiceConfig,
    //   useFactory: getAuthServiceConfigs
    // },
    MsalHelper
  ],
  entryComponents: [BlockTemplateComponent],
})
export class AppModule {
}
