import {
  Input,
  OnInit,
  Output,
  Component,
  HostBinding,
  EventEmitter
} from '@angular/core';

import { IGroup } from '../../interfaces/group';

@Component({
  selector: 'tc-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class TCGroupComponent implements OnInit {
  @HostBinding('class.tc-group') true;

  @Input() group: IGroup;

  @Output() joined: EventEmitter<IGroup>;
  @Output() leaved: EventEmitter<IGroup>;

  constructor() {
    this.joined = new EventEmitter();
    this.leaved = new EventEmitter();
  }

  ngOnInit(): void {  }

  joinGroupHandler(group: IGroup): void {
    if (group.joined) {
      group.joined = false;
      this.leaved.emit(group);
    } else {
      group.joined = true;
      this.joined.emit(group);
    }
  }

  getGroupInitials(group: IGroup): string {
    const TITLE_ARR = group.title.split(' ');

    if (TITLE_ARR.length > 1) {
      return TITLE_ARR[0][0] + TITLE_ARR[1][0];
    }

    return TITLE_ARR[0][0];
  }

  getGroupConnections(): string[] {
    return this.group.connections.slice(0, 5);
  }

  getBgImage(): any {
    return {
      'background-image': 'url(' + this.group.bgImage + ')'
    };
  }
}
