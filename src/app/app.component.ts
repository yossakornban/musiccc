/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { TranslateService } from '@ngx-translate/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { BlockTemplateComponent } from './@theme/components/block-template/block-template.component';

@Component({
  selector: 'ngx-app',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  blockTemplate = BlockTemplateComponent;

  constructor(private translate: TranslateService, private analytics: AnalyticsService) {
    translate.addLangs(['en', 'th']);
    translate.setDefaultLang('th');

    this.blockUI.start(); // Start blocking
    this.blockUI.stop(); // Stop blocking

    const browserLang = translate.getBrowserLang();
    const lang = localStorage.getItem('language') ? localStorage.getItem('language') : browserLang;
    translate.use(lang.match(/en|th/) ? lang : 'th');
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
  }
}
