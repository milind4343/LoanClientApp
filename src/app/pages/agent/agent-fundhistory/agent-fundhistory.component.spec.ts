import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentFundhistoryComponent } from './agent-fundhistory.component';

describe('AgentFundhistoryComponent', () => {
  let component: AgentFundhistoryComponent;
  let fixture: ComponentFixture<AgentFundhistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentFundhistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentFundhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
