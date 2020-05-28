import { Component, OnDestroy, OnInit } from '@angular/core';
import { BasePageComponent } from '../base-page';
import { Store } from '@ngrx/store';
import { IAppState } from '../../interfaces/app-state';
import { HttpService } from '../../services/http/http.service';
import {Content} from '../../ui/interfaces/modal';
import {TCModalService} from '../../ui/services/modal/modal.service';

@Component({
  selector: 'app-validation-request',
  templateUrl: './request-new.component.html',
  styleUrls: ['./request-new.component.scss']
})
export class RequestNewComponent extends BasePageComponent implements OnInit, OnDestroy {
  requetes: any;
  requeteSelected: any;
  modalContent: string;
  loadingLabelForm = false;
  action = '';
  message = '';
  postMessage = '';
  constructor(
      store: Store<IAppState>,
      httpSv: HttpService,
      private modal: TCModalService
  ) {
    super(store, httpSv);

    this.pageData = {
      title: 'Nouvelles demandes'
    };
  }

  ngOnInit() {
    super.ngOnInit();
    this.getRequetes('/requests/new', 'requetes', 'setLoaded');
  }
  getMemory(memory: string){
    if (memory !== undefined && memory !== null){
      return memory.substr(0, memory.length - 2);
    }
    return '';
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
  openModal<T>(body: Content<T>, header: Content<T> = null, footer: Content<T> = null, options: any = null) {
    this.modal.open({
      body: body,
      header: header,
      footer: footer,
      options: options
    });
  }
  closeModal(){
    this.modal.close();
  }
  validateOrReject(){
    let mes: any;
    if (this.action === 'rejected'){
      mes = {
        message: this.message
      };
    } else {
      mes = {};
    }
    this.loadingLabelForm = true;
    this.httpSv.validateOrReject(this.action, this.requeteSelected.name, mes).subscribe(
        data => {
          for (let i = 0; i < this.requetes.data.length; i++){
            if (this.requetes.data[i].name === this.requeteSelected.name){
              this.requetes.data.splice(i, 1);
              break;
            }
          }
          this.loadingLabelForm = false;
          this.postMessage = 'success';
          this.httpSv.nbNotifications--;
        },
        err => {
          console.log(err);
          this.loadingLabelForm = false;
          this.postMessage = 'error';
          if (err.status === 401) {
            this.httpSv.goToLogin();
          }
        }
    );
  }
}
