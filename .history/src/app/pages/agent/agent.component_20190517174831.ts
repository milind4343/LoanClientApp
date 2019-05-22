import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'agent-component',
  styleUrls: ['pages.component.scss'],
  template: `
      <router-outlet></router-outlet>
  `,
})
export class agent implements OnInit  {


  constructor() {
  }

  ngOnInit() {
    
  }

}
