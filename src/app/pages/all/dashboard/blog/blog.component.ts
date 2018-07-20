import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from '../../../../shared/services/http-service.service';
import { Router, ActivatedRoute, Params, } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

declare function escape(s: string): string;
declare function unescape(s: string): string;

@Component({
  selector: 'ngx-blog',
  styleUrls: ['./blog.component.scss'],
  templateUrl: 'blog.component.html'

})

export class BlogComponent {

  public form: FormGroup;
  paramsID: any;
  private fromLoadObject: any;
  private sub: any;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  public title: Array<any> = [];



  constructor(
    @Inject(FormBuilder) fb: FormBuilder,
    private httpService: HttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService,

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

    this.galleryOptions = [
      {
        width: '700px',
        height: '500px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        imageAutoPlay: true
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '150%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];


    this.galleryImages = [
      {
        small: '/assets/images/news5.jpg',
        medium: '/assets/images/news5.jpg',
        big: '/assets/images/news5.jpg'
      },
      {
        small: '/assets/images/news4.jpg',
        medium: '/assets/images/news4.jpg',
        big: '/assets/images/news4.jpg'
      },
      {
        small: '/assets/images/news2.jpg',
        medium: '/assets/images/news2.jpg',
        big: '/assets/images/news2.jpg'
      }
    ];
    this.sub = this.activatedRoute.params.subscribe(params => {
      console.info(params['id'])
      console.info("--------------------------------------------")
      this.paramsID = params['id'];
      console.info(this.paramsID)
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
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
}