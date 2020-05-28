import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ChartsModule } from 'ng2-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxEchartsModule } from 'ngx-echarts';
import { AgmCoreModule } from '@agm/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NZ_I18N, en_US } from 'ng-zorro-antd';

import { HighlightModule } from 'ngx-highlightjs';

import xml from 'highlight.js/lib/languages/xml';

export function hljsLanguages() {
  return [{ name: 'xml', func: xml }];
}

import { UIModule } from '../ui/ui.module';
import { LayoutModule } from '../layout/layout.module';
import { BasePageComponent } from './base-page';

import { Page404Component } from './errors/page-404';
import { Page500Component } from './errors/page-500';
import { Page503Component } from './errors/page-503';
import { Page505Component } from './errors/page-505';
import { ErrorBasePageComponent } from './errors/error-base-page';

import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import {ClientRequestComponent} from './client-request/client-request.component';
import {RequestNewComponent} from './request-new/request-new.component';
import {RequestAcceptedComponent} from './request-accepted/request-accepted.component';
import {PageLoginComponent} from './page-login/page-login.component';
import {RequestRejectedComponent} from './request-rejected/request-rejected.component';
import {RequestPostedComponent} from './request-posted/request-posted.component';

registerLocaleData(en);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ChartsModule,
    NgxChartsModule,
    NgxEchartsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAbIFQ5ffgouATqs-sp8hgQf3zV4dTLzaU',
    }),
    LeafletModule,
    NgZorroAntdModule,
    HighlightModule.forRoot({ languages: hljsLanguages }),
    FullCalendarModule,
    UIModule,
    LayoutModule,
  ],
  declarations: [
    BasePageComponent,
    Page404Component,
    Page500Component,
    Page503Component,
    Page505Component,
    ErrorBasePageComponent,
    ClientRequestComponent,
    RequestNewComponent,
    RequestAcceptedComponent,
    RequestRejectedComponent,
    PageLoginComponent,
    RequestPostedComponent
  ],
  providers   : [ { provide: NZ_I18N, useValue: en_US } ]
})
export class PagesModule { }
