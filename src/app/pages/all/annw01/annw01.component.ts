import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { HttpService } from '../../../shared/services/http-service.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as pageStateReducer from '../../../shared/services/page-state/page-state.reducer';
import * as fromActions from '../../../shared/services/page-state/page-state.actions';
import { PageStates, PageState, State } from '../../../@core/data/app.states';
import { FileUploader } from 'ng2-file-upload';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { HttpEventType, HttpClient, HttpRequest } from '@angular/common/http';

import * as QuillNamespace from 'quill';
const Quill: any = QuillNamespace;
const Block = Quill.import('blots/block');
Block.tagName = 'DIV';
Quill.register(Block, true);

declare function escape(s: string): string;
declare function unescape(s: string): string;
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'ngx-annw01',
  styleUrls: ['./annw01.component.scss'],
  templateUrl: 'annw01.component.html',
  encapsulation: ViewEncapsulation.None
})

export class Annw01Component {

  public action: string[] = ['save', 'search', 'print'];
  public form: FormGroup;
  public states: Observable<PageState[]>
  private page: string = 'annw01';
  public uploader: FileUploader = new FileUploader({ url: URL });
  selectedFile: File;


  constructor(
    @Inject(FormBuilder) fb: FormBuilder,
    private httpService: HttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService,
    private store: Store<PageStates>,
    private http: Http
  ) {
    this.states = store.select(pageStateReducer.getStates(this.page));
    this.form = new FormGroup({
      news_header: new FormControl(),
      news_type: new FormControl(),
      news_detail: new FormControl(),
      // img_title: new FormControl()
    });
  }

  ngOnInit() {
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
  }

  onSave() {
    if (this.form.dirty) {
      if (this.form.valid) {

        //Duplicate Form
        var dataForm = this.form.value;
        //Encode HTML 
        dataForm.news_header = (dataForm.news_header)
        dataForm.news_type = (dataForm.news_type)
        dataForm.news_detail = this.htmlEntityEncoder(dataForm.news_detail)
        // dataForm.img_title = (dataForm.img_title)

        const dataToSave = {
          'data': dataForm
        };
        console.info(dataToSave);
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

    //------upload img to server-----------
    // const uploadData = new FormData();
    // uploadData.append('myFile', this.selectedFile, this.selectedFile.name);
    // this.http.post('', uploadData)
    //   .subscribe(event => {
    //   });
  }


  onSearch() {
    console.info('onSearch');
  }

  onPrint() {
    console.info('onPrint');
  }

  pageIsDirty(): Boolean {
    return this.form.dirty;
  }

  htmlEntityDecoder(input: string): any {
    return unescape(input);
  }

  htmlEntityEncoder(input: string): any {
    return escape(input);
  };

  setPageState() {
    const data: PageState[] = [
      {
        page: this.page,
        states: [
          { key: '1', value: 'aaaa' },
          { key: '2', value: 'bbbb' }
        ]
      }
    ]
    this.store.dispatch(new fromActions.SetAction(data));
  }

  resetPageState() {
    this.store.dispatch(new fromActions.ResetAction());
  }

  check() {
    console.info(this.states);
  }

}