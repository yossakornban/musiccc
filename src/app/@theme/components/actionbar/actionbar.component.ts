import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core'
import { StateService } from '../../../@core/data/state.service';

@Component({
  selector: 'ngx-actionbar',
  styleUrls: ['./actionbar.component.scss'],
  templateUrl: './actionbar.component.html',
})
export class ActionbarComponent implements OnInit{

  @Output()
  search: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  save: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  print: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  action: any[];

  data = [
    {
      name: 'Search',
      icon: 'fa fa-search',
      id: 'search',
    },
    {
      name: 'Save',
      icon: 'fa fa-save',
      id: 'save',
    },
    {
      name: 'Print',
      icon: 'fa fa-print',
      id: 'print',
    }
  ];

  protected actions: Array<any> = [];

  constructor(protected stateService: StateService) {
  }

  ngOnInit() {
    this.action.forEach(item => {
      this.actions.push(this.data.find(object => object.id === item));
    });
  }

  actionSelect(action: any): boolean {
    if(action.id == 'save'){
      this.save.emit();
    } else if (action.id == 'search') {
      this.search.emit();
    } else if (action.id == 'print') {
      this.print.emit();
    }
    return false;
  }
}
