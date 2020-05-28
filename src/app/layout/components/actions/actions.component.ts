import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HttpService } from '../../../services/http/http.service';

@Component({
  selector: 'actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {
  closeDropdown: EventEmitter<boolean>;
  @Input() layout: string;
  constructor(
    public httpSv: HttpService,
    private router: Router
  ) {
    this.closeDropdown = new EventEmitter<boolean>();
    this.layout = 'vertical';
  }

  ngOnInit() {

  }

  onCloseDropdown() {
    this.closeDropdown.emit(true);
  }

  goTo(event: Event, link: string, layout: string = '') {
    event.preventDefault();

    this.onCloseDropdown();

    setTimeout(() => {
      this.router.navigate([layout ? layout : this.layout, link]);
    });
  }
}
