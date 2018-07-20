import { Injectable } from '@angular/core';
import { HttpService } from '../../../../shared/services/http-service.service';
import { Router } from '@angular/router';

@Injectable()
export class CardLongService {

    constructor(public httpService: HttpService) { }

    onSave(pathName: String, method: String, data: Object) {
        return this.httpService.save(pathName, method, data);
    }

    onSearch(pathName: String, method: String, data: Object) {
        return this.httpService.search(pathName, method, data);
    }

}
