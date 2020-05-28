import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { throwError as observableThrowError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {Requete} from '../domain/requete';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {TCModalService} from '../../ui/services/modal/modal.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  username = null;
  password = null;
  nbNotifications = null;
  constructor(private http: HttpClient,
              private router: Router,
              private modal: TCModalService) {}

  getData(source: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa(this.username + ':' + this.password)
      })
    };
    return this.http.get(source, httpOptions).pipe(
      tap((res: any) => res),
      catchError(this.handleError)
    );
  }
  getRequetes(source: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa(this.username + ':' + this.password)
      })
    };
    return this.http.get(environment.apiURL + source, httpOptions).pipe(
        tap((res: any) => res),
        catchError(this.handleError)
    );
  }
  login(source: string, username: string, password: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa(username + ':' + password)
      })
    };
    return this.http.get(environment.apiURL + source, httpOptions).pipe(
        tap((res: any) => res),
        catchError(this.handleError)
    );
  }
  getResourceQuota(source: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa(this.username + ':' + this.password)
      })
    };
    return this.http.get(environment.apiURL + source, httpOptions).pipe(
        tap((res: any) => res),
        catchError(this.handleError)
    );
  }
  postData(requete: Requete) {
    return this.http.post(environment.apiURL + '/requests', requete, { responseType: 'text' }).pipe(
        tap((res: any) => res),
        catchError(this.handleError)
    );
  }
  putData(requete: Requete) {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + btoa(this.username + ':' + this.password)
    });
    return this.http.put(environment.apiURL + '/requests', requete, { headers: headers, responseType: 'text' }).pipe(
        tap((res: any) => res),
        catchError(this.handleError)
    );
  }
  validateOrReject(action: string, requeteName: string, message: any) {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + btoa(this.username + ':' + this.password),
    });
    return this.http.post(environment.apiURL + '/requests/' + requeteName + '/' + action, message, {responseType: 'text', headers} ).pipe(
        tap((res: any) => res),
        catchError(this.handleError)
    );
  }
  goToLogin(){
    this.modal.close();
    this.username = null;
    this.password = null;
    this.nbNotifications = null;
    this.router.navigate(['/public/login']);
  }

  logout(){
    this.modal.close();
    this.username = null;
    this.password = null;
    this.nbNotifications = null;
  }

  private handleError(error: any) {
    return observableThrowError(error || 'Server error');
  }
}
