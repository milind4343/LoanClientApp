import {Component, OnDestroy, OnInit} from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators' ;
import { SolarData } from '../../@core/data/solar';
import { DashboardService } from './agentregistration.component.ts';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-agentregistration',
  templateUrl: './agentregistration.component.html',
  styleUrls: ['./agentregistration.component.scss']
})
export class AgentregistrationComponent implements OnInit, OnDestroy  {

  constructor() { }

  ngOnInit() {
  }

}
