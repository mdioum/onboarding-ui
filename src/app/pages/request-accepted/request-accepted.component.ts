import { Component, OnDestroy, OnInit } from '@angular/core';
import { BasePageComponent } from '../base-page';
import { Store } from '@ngrx/store';
import { IAppState } from '../../interfaces/app-state';
import { HttpService } from '../../services/http/http.service';
import {Content} from '../../ui/interfaces/modal';
import {TCModalService} from '../../ui/services/modal/modal.service';

@Component({
  selector: 'app-request-accepted',
  templateUrl: './request-accepted.component.html',
  styleUrls: ['./request-accepted.component.scss']
})
export class RequestAcceptedComponent extends BasePageComponent implements OnInit, OnDestroy {
  requetes: any;
  requete: any;
  constructor(
      store: Store<IAppState>,
      httpSv: HttpService,
      private modal: TCModalService
  ) {
    super(store, httpSv);

    this.pageData = {
      title: 'Demandes acceptées',
      breadcrumbs: [
      ]
    };
  }

  ngOnInit() {
    super.ngOnInit();
    this.getResourceQota('/clusterquota', 'requetes', 'setLoaded');
  }

  getMemory(memory: string) {
    if (memory !== undefined && memory !== null) {
      return memory.substr(0, memory.length - 2);
    }
    return '';
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
  getValue(value: string): number {
    if (!Number.isInteger(Number(value))) {
      if (value.substr(-1) === 'm') {
        return Number(value.substr(0, value.length - 1));
      } else if (value.substr(-2) === 'Gi') {
        return Number(value.substr(0, value.length - 2)) * 1000;
      } else if (value.substr(-1) === 'M') {
        return Number(value.substr(0, value.length - 1));
      } else if (value.substr(-2) === 'Mi') {
        return Number(value.substr(0, value.length - 2));
      } else if (value.substr(-1) === 'G') {
        return Number(value.substr(0, value.length - 1)) * 1000;
      }
    }
    return  Number(value) * 1000;
  }

  getCPUUsed(ressource: any) {
    if (ressource !== null && ressource !== undefined) {
      return (this.getValue(ressource['used.cpu'])  * 100 / this.getValue(ressource['requests.cpu'])).toFixed(1);
    }
  }
  getMemoryUsed(ressource: any) {
    if (ressource !== null && ressource !== undefined) {
      return (this.getValue(ressource['used.memory']) * 100 / this.getValue(ressource['requests.memory'])).toFixed(1);
    }
  }
  getStorageUsed(ressource: any) {
    if (ressource !== null && ressource !== undefined) {
      return (this.getValue(ressource['used.storage']) * 100 / this.getValue(ressource['requests.storage'])).toFixed(1);
    }
  }
  openModal<T>(body: Content<T>, header: Content<T> = null, footer: Content<T> = null, options: any = null) {
    this.modal.open({
      body: body,
      header: header,
      footer: footer,
      options: options
    });
  }
}
