import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngx-chartjs',
  styleUrls: ['./chartjs.component.scss'],
  templateUrl: './chartjs.component.html',
})
export class ChartjsComponent {

@Input() child1: any;
data:any = {};

constructor(){
}

ngOnChanges() {
  if(!!this.child1){         
      //console.log(this.child1);     
      this.data = this.child1;
  }
}

}
