import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from '../../../shared/services/http-service.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ngx-anum01',
  styleUrls: ['./anum01.component.scss'],
  templateUrl: 'anum01.component.html'

})

export class Anum01Component {

  public form: FormGroup;
  public action: string[] = ['save', 'search', 'print'];
  foo: string;

  constructor(
    @Inject(FormBuilder) fb: FormBuilder,
    private httpService: HttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService,
  ) {
    this.form = new FormGroup({
      // title: new FormControl(''),
      firstname: new FormControl(''),
      lastname: new FormControl(''),
      mobile: new FormControl(''),
      email: new FormControl(''),
      country: new FormControl(''),
      address: new FormControl(''),
      province: new FormControl(''),
      district: new FormControl(''),
      canton: new FormControl(''),
      postcode: new FormControl(''),
      tel: new FormControl(''),
      category: new FormControl(''),
      jobs: new FormControl(''),
      position: new FormControl(''),
      jobcountry: new FormControl(''),
      jobaddress: new FormControl(''),
      jobprovince: new FormControl(''),
      jobdistrict: new FormControl(''),
      jobcanton: new FormControl(''),
      jobpostcode: new FormControl(''),
      jobtel: new FormControl(''),
      education: new FormControl(''),
      yearstudy: new FormControl(''),
      honor: new FormControl(''),
      faculty: new FormControl(''),
      major: new FormControl('')
    });
    translate.get('LB_003').subscribe((res: string) => {
      this.foo = res;
      console.log(this.foo);
      this.settings.columns.education.title = res;
    });
  }

  ngOnInit() {
    this.form.get('country').setValue('ไทย');
  }

  onSave() {
    console.info(this.form.value);
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

  settings = {
    pager: {
      display: true,
      perPage: 5
    },
    actions: {
      delete: true, add: false, edit: true,
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      education: {
        title: 'วุฒิการศึกษา',
        type: 'string',
        filter: false,

      },
      yearstudy: {
        title: 'ปีการศึกษา',
        type: 'string',
        filter: false,

      },
      honor: {
        title: 'เกียรตินิยม',
        filter: false,
        type: 'string',
      },
      faculty: {
        title: 'คณะ',
        filter: false,
        type: 'string',
      },
      major: {
        title: 'สาขา',
        type: 'string',
        filter: false,

      },
    },
  };

  data = [{
    education: 'ปริญญาตรี',
    yearstudy: '2540',
    honor: 'อันดับสอง',
    faculty: 'xxxxxxxx',
    major: 'xxxxxxxxxxxxxxxxxx',
  }, {
    education: 'ปริญญาตรี',
    yearstudy: '2545',
    honor: 'อันดับสอง',
    faculty: 'xxxxxxxxxxxx',
    major: 'xxxxxxxxxxxxx',
  }, {
    education: 'ปริญญาโท',
    yearstudy: '2550',
    honor: 'อันดับสอง',
    faculty: 'xxxxx',
    major: 'xxxxxxxx',
  }, {
    education: 'ปริญญาโท',
    yearstudy: '2555',
    honor: 'อันดับหนึ่ง',
    faculty: 'xxxxxxxxx',
    major: 'xxxxxxxxxxxx',
  }, {
    education: 'ปริญญาเอก',
    yearstudy: '2559',
    honor: 'อันดับสอง',
    faculty: 'xxxxxxxx',
    major: 'xxxxxxxxxxxxxx',
  },
  ];
}
