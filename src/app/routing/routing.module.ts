import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HorizontalLayoutComponent } from '../layout/horizontal';
import { PublicLayoutComponent } from '../layout/public';
import { ErrorLayoutComponent } from '../layout/error';

import { Page404Component } from '../pages/errors/page-404';
import { Page500Component } from '../pages/errors/page-500';
import { Page503Component } from '../pages/errors/page-503';
import { Page505Component } from '../pages/errors/page-505';
import {ClientRequestComponent} from '../pages/client-request/client-request.component';
import {RequestNewComponent} from '../pages/request-new/request-new.component';
import {RequestAcceptedComponent} from '../pages/request-accepted/request-accepted.component';
import {PageLoginComponent} from '../pages/page-login/page-login.component';
import {RequestRejectedComponent} from '../pages/request-rejected/request-rejected.component';
import {RequestPostedComponent} from '../pages/request-posted/request-posted.component';

const CHILD_ROUTES: Routes = [
  { path: 'requests', component: ClientRequestComponent },
  { path: 'request-new', component: RequestNewComponent },
  { path: 'request-accepted', component: RequestAcceptedComponent },
  { path: 'request-rejected', component: RequestRejectedComponent },
];

const PUBLIC_ROUTES: Routes = [
  { path: 'login', component: PageLoginComponent },
  { path: '**', component: Page404Component },
];

const ERROR_ROUTES: Routes = [
  { path: '404', component: Page404Component },
  { path: '500', component: Page500Component },
  { path: '503', component: Page503Component },
  { path: '505', component: Page505Component },
  { path: '**', component: Page404Component }
];

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: '/horizontal/requests',
    pathMatch: 'full'
  },
  {
    path: 'horizontal',
    component: HorizontalLayoutComponent,
    children: CHILD_ROUTES
  },
  {
    path: 'public',
    component: PublicLayoutComponent,
    children: PUBLIC_ROUTES
  },
  {
    path: 'error',
    component: ErrorLayoutComponent,
    children: ERROR_ROUTES
  },
  {
    path: 'success',
    component: ErrorLayoutComponent,
    children: [
      { path: 'posted', component: RequestPostedComponent }
    ]
  },
  {
    path: '**',
    component: ErrorLayoutComponent,
    children: ERROR_ROUTES
  }
];

@NgModule({
  imports: [],
  exports: [RouterModule],
  declarations: [],
})
export class RoutingModule { }
