import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../services/http/http.service';

@Component({
  selector: 'app-request-posted',
  templateUrl: './request-posted.component.html',
  styleUrls: ['./request-posted.component.scss']
})
export class RequestPostedComponent implements OnInit {

  constructor(public httpSv: HttpService) { }

  ngOnInit() {
  }

}
