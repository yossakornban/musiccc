import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from '../../../shared/services/http-service.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { StateService } from '../../../@core/data/state.service';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: 'dashboard.component.html'

})

export class DashBoardComponent {
  public title: Array<any> = [];
  // titles: Array<any> = [];
  public form: FormGroup;
  foo: string;
  // public action: string[] = ['title', 'detail', 'date'];


  constructor(
    @Inject(FormBuilder) fb: FormBuilder,
    private httpService: HttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService,
    protected stateService: StateService
  ) {
    this.form = new FormGroup({
      data: new FormControl('')
    });
  }

  ngOnInit() {

    const dataToLoadPage = {
      'loadPage': this.form.value
    };
    console.info(this.router.url.split('/')[3]);
    this.httpService.search(this.router.url.split('/')[3], 'LoadPageHtml', dataToLoadPage).subscribe(
      data => {
        const responds = data.json();
        if (responds.success) {
          this.title = responds;
          // this.form = data.json().data.item;
          console.info(this.title);
        } else {
          console.info('Load Error');
        }
      },
      err => {
        console.info(err);
      });

  }

  onSave() {
  
  }

  pageIsDirty(): Boolean {
    return this.form.dirty;
  }


  onClick(event) {
    console.info(event.params);

    this.router.navigate(['/pages/officer/dashboard/blog', event.params.news_id]);
  }
}