import {Component, OnDestroy, OnInit} from '@angular/core';
import {BasePageComponent} from '../base-page';
import {Store} from '@ngrx/store';
import {IAppState} from '../../interfaces/app-state';
import {HttpService} from '../../services/http/http.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Requete, Demandeur, Projet, Ressource} from '../../services/domain/requete';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-client-request',
  templateUrl: './client-request.component.html',
  styleUrls: ['./client-request.component.scss']
})
export class ClientRequestComponent extends BasePageComponent implements OnInit, OnDestroy {
  labelForm: FormGroup;
  loadingLabelForm: boolean;
  environnement = environment;
  environnements = environment.envs;
  success = false;
  constructor(store: Store<IAppState>,
              httpSv: HttpService,
              private formBuilder: FormBuilder,
              private router: Router) {
    super(store, httpSv);
    this.pageData = {
      title: 'Requête client',
      loaded: true,
      breadcrumbs: [
      ],
    };
  }

  ngOnInit() {
    super.ngOnInit();
    this.initLabelForm();
    this.httpSv.logout();
  }


  ngOnDestroy() {
    super.ngOnDestroy();
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
      storage: ['', Validators.required]
    });
    for (let i = 0; i < this.environnements.length; i++){
      this.labelForm.addControl(this.environnements[i].value, new FormControl(false));
    }
  }
  getNbEnvs(){
    let nb = 0;
    for (const key in this.labelForm.value) {
      if (this.labelForm.value.hasOwnProperty(key) && this.labelForm.value[key]) {
        for(const e of this.environnements) {
          if (e.value === key) {
            nb++;
          }
        }
      }
    }
    return nb;
  }
  sendLabelForm(valid: boolean) {
    if (valid) {
      this.loadingLabelForm = true;
      const requete: Requete = new Requete();
      requete.demandeur = new Demandeur();
      requete.projet = new Projet();
      requete.ressource = new Ressource();
      requete.demandeur.prenom = this.labelForm.value.prenom;
      requete.demandeur.nom = this.labelForm.value.nom;
      requete.demandeur.email = this.labelForm.value.email;
      requete.demandeur.login = this.labelForm.value.login;
      requete.demandeur.telephone = this.labelForm.value.telephone;
      requete.demandeur.structure = this.labelForm.value.structure;
      requete.demandeur.entite = this.labelForm.value.entite;
      requete.projet.nom = this.labelForm.value.projet;
      requete.projet.emailAdmin = this.labelForm.value.emailAdmin;
      requete.projet.loginAdmin = this.labelForm.value.loginAdmin;
      requete.projet.backup = this.labelForm.value.backup;
      requete.projet.criticity = this.labelForm.value.criticity;
      requete.projet.application = this.labelForm.value.application;
      requete.projet.owner = this.labelForm.value.owner;
      requete.projet.businessunit = this.labelForm.value.businessunit;
      requete.ressource.cpu = this.labelForm.value.cpu;
      requete.ressource.memory = this.labelForm.value.memory.replace(',', '.');
      requete.ressource.memory = requete.ressource.memory + 'Gi';
      requete.ressource.storage = this.labelForm.value.storage.replace(',', '.');
      requete.ressource.storage = requete.ressource.storage + 'Gi';
      requete.environnements = [];
      for(const e of this.environnements) {
        if (this.labelForm.value.hasOwnProperty(e.value) && this.labelForm.value[e.value]) {
          requete.environnements.push(this.getPrefix(e.value));
        }
      }
      requete.name = this.getPrefix(null);
      console.log(requete)

      this.httpSv.postData(requete).subscribe(
          data => {
            this.router.navigate(['/success/posted']);
            this.loadingLabelForm = false;
          },
          err => {
            console.log(err);
            this.loadingLabelForm = false;
            this.success = true;
            setTimeout(() => {
              this.success = false;
            }, 5000);
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
