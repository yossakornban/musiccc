import { Injectable } from '@angular/core';
import { HttpService } from './http-service.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import * as context from '../../@core/interfaces/context-part.interface';
// import {Permission} from "../../+gnl/gnl-master/gnl-rt-dashboard/gnl-rt-dashboard.component";
import {forEach} from "@angular/router/src/utils/collection";

const MENU_PERMISSION: string = context.MENU_PERMISSION;

@Injectable()
export class CheckPermissionService {

    username: String = '';

    private _userData = new Subject<any>();
    userData = this._userData.asObservable();
    store: any;

    constructor(
        public httpService: HttpService
    ) {

    }

    public storeUserData(username) {
        const dataToSearch = {
            'criteria': {
                'username': username
            }
        };
        this.httpService.search('checkPermission', 'checkPermission', dataToSearch).subscribe(
            data => {
                this.userData.subscribe(() => {
                    this.store = data.json();
                    localStorage.setItem(MENU_PERMISSION, JSON.stringify(data.json()));
                });
                this._userData.next(this.store);
            }, err => { }
        );
    }

    public reStoreUserData() {
        const token = localStorage.getItem(MENU_PERMISSION);
        this.userData.subscribe(() => {
            this.store = JSON.parse(token);
        });
        this._userData.next(this.store);
    }

    public resetUserData() {
        this.userData.subscribe(() => {
            this.store = null;
        });
        this._userData.next(this.store);
        localStorage.removeItem(MENU_PERMISSION);
    }

    public isHiddenGroup(allowList) {
        for (const i in allowList) {
            if (allowList[i]) {
                if (!allowList[i].hidden) {
                    return false;
                }
            }
        }
        return true;
    }

    // public isAllows(programData:Permission[] ): Permission[] {
    //     for(let item of programData){
    //         item.hidden = this.isAllow(item.module, item.program, item.header);
    //     }
    //     return programData;
    // }

    public isAllow(programModule, programPage, programHeader): boolean {

        let allow = false;

        if (this.store) {
            if (programHeader !== '') {
                const uDataGroup = this.store.data.userdatagroup;
                let resDataGroup = [];
                resDataGroup = uDataGroup.filter(
                    data => (String(data.module_name)).toUpperCase() === (String(programModule).toUpperCase()) &&
                    (String(data.menu_header)).toUpperCase() === (String(programHeader)).toUpperCase() &&
                    data.count !== 0
                );
                allow = !(resDataGroup.length > 0);
            } else {
                const uData = this.store.data.userdata;
                let resData = [];
                if (programPage !== '') {
                    resData = uData.filter(
                        data => (String(data.module_name)).toUpperCase() === (String(programModule).toUpperCase()) &&
                        (String(data.code)).toUpperCase() === (String(programPage).toUpperCase())
                    );
                } else {
                    resData = uData.filter(
                        data => (String(data.module_name)).toUpperCase() === (String(programModule).toUpperCase())
                    );
                }
                allow = !(resData.length > 0);
            }
        }
        return allow;
    }

};
