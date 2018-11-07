import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WimtableComponent } from './wimtable.component';

describe('WimtableComponent', () => {
  let component: WimtableComponent;
  let fixture: ComponentFixture<WimtableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WimtableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WimtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
