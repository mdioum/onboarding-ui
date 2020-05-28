import {Component, OnDestroy, OnInit} from '@angular/core';
import {BasePageComponent} from '../base-page';
import {Store} from '@ngrx/store';
import {IAppState} from '../../interfaces/app-state';
import {HttpService} from '../../services/http/http.service';
import {Content} from '../../ui/interfaces/modal';
import {TCModalService} from '../../ui/services/modal/modal.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-request-rejected',
  templateUrl: './request-rejected.component.html',
  styleUrls: ['./request-rejected.component.scss']
})
export class RequestRejectedComponent extends BasePageComponent implements OnInit, OnDestroy {
  labelForm: FormGroup;
  requetes: any;
  environnement = environment;
  requestSelected: any;
  loadingLabelForm: boolean;
  envs: string[] = [];
  success = false;
  constructor(
      store: Store<IAppState>,
      httpSv: HttpService,
      private formBuilder: FormBuilder,
      private modal: TCModalService,
      private router: Router
  ) {
    super(store, httpSv);

    this.pageData = {
      title: 'Demandes rejetées',
      breadcrumbs: [
      ]
    };
  }

  ngOnInit() {
    super.ngOnInit();
    this.initLabelForm();
    this.getRequetesRejetees('/requests/rejected', 'requetes', 'setLoaded');
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  openModal<T>(body: Content<T>, header: Content<T> = null, footer: Content<T> = null, options: any = null, requete: any) {
    this.requestSelected = JSON.parse(JSON.stringify(requete));
    this.requestSelected['nbEnv'] = requete.environnements.length;
    this.requestSelected.ressource.memory = Number(this.requestSelected.ressource.memory.substr(0, requete.ressource.memory.length - 2));
    this.requestSelected.ressource.storage = Number(this.requestSelected.ressource.storage.substr(0, requete.ressource.storage.length - 2));
    this.envs = [];
    for (let i = 0; i < this.requestSelected.environnements.length; i++){
      this.envs.push(this.requestSelected.environnements[i].split('-')[1]);
    }
    for (let i = 0; i < this.requestSelected.environnements.length; i++){
      this.labelForm.addControl('env' + i, new FormControl('', Validators.required));
    }
    this.modal.open({
      body: body,
      header: header,
      footer: footer,
      options: options
    });
  }
  initLabelForm() {
    this.labelForm = this.formBuilder.group({
      prenom: [''],
      nom: [''],
      telephone: [''],
      entite: ['', Validators.required],
      structure: ['', Validators.required],
      email: ['', Validators.required],
      login: ['', Validators.required],
      projet: ['', Validators.required],
      emailAdmin: ['', Validators.required],
      loginAdmin: ['', Validators.required],
      owner: [''],
      businessunit: [''],
      backup: [''],
      application: [''],
      criticity: [''],
      cpu: ['', Validators.required],
      memory: ['', Validators.required],
      storage: ['', Validators.required],
      nbEnv: [null, Validators.required]
    });
  }

  sendLabelForm(valid: boolean) {
    if (valid) {
      this.loadingLabelForm = true;

      this.requestSelected.environnements = [];
      for (const r of this.envs){
        this.requestSelected.environnements.push(this.getPrefix(r));
      }
      this.requestSelected.ressource.memory = this.requestSelected.ressource.memory.toString().replace(',', '.');
      this.requestSelected.ressource.memory = this.requestSelected.ressource.memory + 'Gi';
      this.requestSelected.ressource.storage = this.requestSelected.ressource.storage.toString().replace(',', '.');
      this.requestSelected.ressource.storage = this.requestSelected.ressource.storage + 'Gi';

      this.httpSv.putData(this.requestSelected).subscribe(
          data => {
            this.modal.close();
            this.router.navigate(['/success/posted']);
          },
          err => {
            console.log(err);
          },
          () => {
            this.loadingLabelForm = false;
          }
      );

    }
  }

  getPrefix(event) {
    let str = this.labelForm.value.entite + '-' + this.labelForm.value.projet;
    if ((str === null) || (str === '')){
      return '';
    } else {
      str = str.toString();
    }
    str = str.replace(/[^a-zA-Z]/g, '').toLowerCase();
    if (event !== null){
      event = event.replace(/[^a-zA-Z]/g, '').toLowerCase();
      return str + '-' + event;
    }
    return str;
  }

}
