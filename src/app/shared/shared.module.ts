import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { McBreadcrumbsModule } from 'ngx-breadcrumbs';
import { QuillModule } from 'ngx-quill'
import { StoreModule } from '@ngrx/store';
import { PipeModule }    from '../@core/pipe/pipe.module';
import { GalleryModule } from  '@ngx-gallery/core';
import { NgxGalleryModule } from 'ngx-gallery';
import { FileUploadModule } from 'ng2-file-upload';


export const _IMPORTS = [
    CommonModule, FormsModule, RouterModule, NgbModule, ReactiveFormsModule,
    Ng2SmartTableModule, McBreadcrumbsModule, QuillModule, StoreModule, PipeModule,
    GalleryModule, NgxGalleryModule, FileUploadModule
    
]

export const _EXPORTS = [
    CommonModule, FormsModule, NgbModule, TranslateModule, Ng2SmartTableModule,
    McBreadcrumbsModule, QuillModule, StoreModule, PipeModule, GalleryModule,
    NgxGalleryModule, FileUploadModule
]

export const _DECLARE = [
]

@NgModule({
    imports: _IMPORTS,
    declarations: _DECLARE,
    exports: _EXPORTS
})
export class SharedModule { }
