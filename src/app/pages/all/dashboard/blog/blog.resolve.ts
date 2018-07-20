import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
// import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs/Rx';
import { BlogService } from '../blog/blog.service'

@Injectable()
export class BlogResolve implements Resolve<any> {

    constructor(private BlogService: BlogService) { }

    resolve(route: ActivatedRouteSnapshot): any {

        // return Observable.forkJoin([]).map((response) => {
        //     return {
        //         record: route.params.id
        //     };
        // });

    }
}
