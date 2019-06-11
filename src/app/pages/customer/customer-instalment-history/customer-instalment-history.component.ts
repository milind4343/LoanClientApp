import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PageAccessService } from '../../../commonServices/getpageaccess.service';
import { CustomerService } from '../customer.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'ngx-customer-instalment-history',
  templateUrl: './customer-instalment-history.component.html',
  styleUrls: ['./customer-instalment-history.component.scss']
})
export class CustomerInstalmentHistoryComponent implements OnInit {
  @Input() editloanID: number;
  @Input() clientname: string;
  @Output() callParent = new EventEmitter<string>();


  client:string;
  dtOptions: DataTables.Settings = {};
  installmenthstorylist: any[] = [];
  dtTrigger: any = new Subject();
  pageTitle = "Instalments";

  constructor(private pageAccessService: PageAccessService, private customerservice: CustomerService) { }

  ngOnInit() {
    
    this.customerservice.getLoanInstallments(this.editloanID).subscribe(result => {
      debugger;
       this.installmenthstorylist = result;
       this.dtTrigger.next();
    },
      error => {
        console.log(error);
        //this.handleError.handleExcption(error);
    });
  }

  backtoloanHistory()
  {
    this.editloanID = 0;
    this.callParent.emit('List');
  }

}
