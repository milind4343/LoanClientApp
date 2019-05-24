import { Component, OnInit } from '@angular/core';
import { AgentService } from '../agent.service';

import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs';
//import { Person } from './person';
import 'rxjs/add/operator/map';

class Person {
  Username: string;
  Firstname: string;
  Lastname: string;
}

@Component({
  selector: 'ngx-list-agent',
  templateUrl: './list-agent.component.html',
  styleUrls: ['./list-agent.component.scss']
})

export class ListAgentComponent implements OnInit {
  //dtOptions: DataTables.Settings = {};
  persons: Person[];
  
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  //dtTrigger: Subject = new Subject();
  constructor(private http: Http,private agentService: AgentService) { }


  dtOptions: DataTables.Settings = {};

  ngOnInit(): void {
    const that = this;
    debugger;
    this.agentService.getAgent().then(result => {
      if (result != null) {
        this.persons=JSON.parse(result);
      
      }
    }).catch(err => {
      console.log(err);
    })
    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 2,
    //   serverSide: true,
    //   processing: true,
    //   ajax: (dataTablesParameters: any, callback) => {
    //     that.http
    //       .get<DataTablesResponse>(
    //         'http://localhost:63956/api/Agent/getAgent',
    //         dataTablesParameters, {}
    //       ).subscribe(resp => {
    //         debugger;
    //         that.persons = JSON.parse(resp._body);
    //         callback({
    //           recordsTotal: resp.recordsTotal,
    //           recordsFiltered: resp.recordsFiltered,
    //           data: []
    //         });
    //       });
    //   },
    //   columns: [{ data: 'username' }, { data: 'firstName' }, { data: 'lastName' }]
    // };
    this.dtOptions = {
      pagingType: 'full_numbers'
      
    
  }
  }
}
