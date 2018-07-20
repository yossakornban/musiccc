import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from '../../../../shared/services/http-service.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ngx-card-dashborad',
  styleUrls: ['./card-short.component.scss'],
  templateUrl: './card-short.component.html'

})

export class CardShortComponent {

  public form: FormGroup;

  constructor(
    @Inject(FormBuilder) fb: FormBuilder,
    private httpService: HttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService
  ) {
    this.form = new FormGroup({
    });
  }

  onSave() {
    if (this.form.dirty) {
      if (this.form.valid) {
        const dataToSave = {
          'admin': this.form.value
        };
        this.httpService.save(this.router.url.split('/')[3], 'SaveAdmin', dataToSave).subscribe(
          data => {
            const record = data.json();
            if (record.success) {
              console.info(record);
            } else {
              console.info('save error');
            }
          },
          err => {
            console.info(err);
          });
      } else {
        console.info('กรุณาตรวจสอบข้อมูล');
      }
    } else {
      console.info('ข้อมูลไม่ได้รับการแก้ไข');
    }
  }

  pageIsDirty(): Boolean {
    return this.form.dirty;
  }
  @Output()
  click: EventEmitter<any> = new EventEmitter<any>();

  @Input() title: string[];


  protected actions: Array<any> = [];

  ngOnInit() {
  }

  getImg(img) {
    return 'url(/assets/images/news5.jpg)';
  }

  onClick(params) {
    this.click.emit({ event: event, params: params });
  }
}