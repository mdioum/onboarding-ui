import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { IPageData } from '../../interfaces/page-data';
import { IAppState } from '../../interfaces/app-state';
import { HttpService } from '../../services/http/http.service';
import * as PageActions from '../../store/actions/page.actions';

@Component({
    selector: 'base-page',
    templateUrl: './base-page.component.html',
    styleUrls: ['./base-page.component.scss']
})
export class BasePageComponent implements OnInit, OnDestroy {
    pageData: IPageData;

    constructor(
        public store: Store<IAppState>,
        public httpSv: HttpService
    ) { }

    ngOnInit() {
        this.pageData ? this.store.dispatch(new PageActions.Set(this.pageData)) : null;
    }

    ngOnDestroy() {
        this.store.dispatch(new PageActions.Reset());
    }

    // get data
    // parameters:
    // * url - data url
    // * dataName - set data to 'dataName'
    // * callbackFnName run callback function with name 'callbackFnName'
    getRequetes(url: string, dataName: string, callbackFnName?: string) {
        this.httpSv.getRequetes(url).subscribe(
            data => {
                this[dataName] = data;
                this.httpSv.nbNotifications = data.data.length;
            },
            err => {
                console.log(err);
                if (err.status === 401) {
                    this.httpSv.goToLogin();
                }
            },
            () => {
                (callbackFnName && typeof this[callbackFnName] === 'function') ? this[callbackFnName](this[dataName]) : null;
            }
        );
    }

    getRequetesRejetees(url: string, dataName: string, callbackFnName?: string) {
        this.httpSv.getRequetes(url).subscribe(
            data => {
                this[dataName] = this.getData(data);
                this.httpSv.nbNotifications = data.data.length;
            },
            err => {
                console.log(err);
                if (err.status === 401) {
                    this.httpSv.goToLogin();
                }
            },
            () => {
                (callbackFnName && typeof this[callbackFnName] === 'function') ? this[callbackFnName](this[dataName]) : null;
            }
        );
    }
    getResourceQota(url: string, dataName: string, callbackFnName?: string) {
        this.httpSv.getResourceQuota(url).subscribe(
            data => {
                this[dataName] = this.getData(data);
                console.log(data)
                this.httpSv.nbNotifications = data.data.length;
            },
            err => {
                console.log(err);
                if (err.status === 401) {
                    this.httpSv.goToLogin();
                }
            },
            () => {
                (callbackFnName && typeof this[callbackFnName] === 'function') ? this[callbackFnName](this[dataName]) : null;
            }
        );
    }
    getData(resultat: any) {
        const data = [];
        for(const req of resultat.data) {
            const r: any = req;
            data.push({
                'entite': r.demandeur.entite,
                'structure': r.demandeur.structure,
                'projet': r.projet.nom,
                'cpu': r,
                'memory': r,
                'storage': r,
                'info': r
            });
        }
        return data;
    }

    setLoaded(during: number = 0) {
        setTimeout(() => this.store.dispatch(new PageActions.Update({ loaded: true })), during);
    }
}
