import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.scss']
})

export class ForbiddenComponent implements OnInit {

  constructor(
    
  ) {

  }

  ngOnInit() {
    console.log('ngOnInit()');
  }

}
