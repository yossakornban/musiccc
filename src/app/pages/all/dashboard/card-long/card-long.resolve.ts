import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
// import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs/Rx';
import { CardLongService } from '../card-long/card-long.service';

@Injectable()
export class DashBoardResolve implements Resolve<any> {

    constructor(private CardLongService: CardLongService) { }

    resolve(route: ActivatedRouteSnapshot): any {
        //     if (route.url[0].path === 'stdbrt10a') {
        //         let id = null;
        //         if (route.params.id !== '') {
        //             const dataToSearch = {
        //                 'search': { 'input_search': id = route.params.id }
        //             }
        //             const record = this.stDbRt10Service.onSearch(route.url[0].path, 'stdbRt10aSearchPosition', dataToSearch).map(val => {
        //                 return val.json()
        //             });
        //             return Observable.forkJoin([record]).map((response) => {
        //                 return {
        //                     record: route.params.id
        //                 };
        //             }).first();
        //         } else {
        //             return { record: '' };
        //         }
        //     }
    }
}
