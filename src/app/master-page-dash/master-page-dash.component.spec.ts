import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterPageDashComponent } from './master-page-dash.component';

describe('MasterPageDashComponent', () => {
  let component: MasterPageDashComponent;
  let fixture: ComponentFixture<MasterPageDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterPageDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterPageDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
