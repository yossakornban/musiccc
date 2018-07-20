import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
// import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs/Rx';
import { ActivitiesService } from '../activities-dashboard/activities-dashboard.service'

@Injectable()
export class ActivitiesResolve implements Resolve<any> {

    constructor(private ActivitiesService: ActivitiesService) { }

    resolve(route: ActivatedRouteSnapshot): any {
        console.info('anw01 resolve');
        // if (route.url[0].path === 'receiving') {
        //     const transhdr_id = route.params.id ;
        //     const dataToSearch = {
        //         'comboboxdata' : {
        //             'doc_type': '1'
        //         }
        //     };
        //     const combobox = this.ad01Service.onSearch(route.url[0].path , 'invDt01Combobox', dataToSearch).map(val => {
        //         return {
        //           records: val.json()
        //         }
        //       });
        //     return Observable.forkJoin([combobox]).map((response) => {
        //         return {
        //             comboboxData: response[0],
        //             transhdr_id: transhdr_id
        //         };
        //       }).first();

        // }
    }
}
