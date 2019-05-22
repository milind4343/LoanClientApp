import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentdashboardComponent } from './agentdashboard/agentdashboard.component';
import{AgentRoutingModule}from './agent-routing.module'

@NgModule({
  declarations: [AgentdashboardComponent],
  imports: [
    CommonModule
  ]
})
export class AgentModule { }
