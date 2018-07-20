import {CanDeactivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
// import {ConfirmationService} from 'primeng/components/common/api';/
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs';
import * as msg from '../../@core/interfaces/confirm-dialog.interface';

@Injectable()
export class UnsavedChangesGuard implements CanDeactivate<any> {

  constructor(
    // private confirmationService: ConfirmationService
  ) {
  }

  canDeactivate(component: any) {
    // Allow navigation if the form is unchanged
    if (!component.pageIsDirty()) {
      return true;
    }
    return Observable.create((observer: Observer<boolean>) => {
      console.info('UnsavedChangesGuard');
      // this.confirmationService.confirm({
      //   message: msg.noSaveChangeNodeDialogMsg.message,
      //   header: msg.noSaveChangeNodeDialogMsg.header,
      //   icon: msg.noSaveChangeNodeDialogMsg.icon,
      //   accept: () => {
          observer.next(true);
          observer.complete();
      //   },
      //   reject: () => {
          // observer.next(false);
          // observer.complete();
      //   }
      // });
    });
  }
}
