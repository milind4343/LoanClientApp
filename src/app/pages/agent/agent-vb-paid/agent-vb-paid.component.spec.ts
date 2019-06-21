import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentVbPaidComponent } from './agent-vb-paid.component';

describe('AgentVbPaidComponent', () => {
  let component: AgentVbPaidComponent;
  let fixture: ComponentFixture<AgentVbPaidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentVbPaidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentVbPaidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
