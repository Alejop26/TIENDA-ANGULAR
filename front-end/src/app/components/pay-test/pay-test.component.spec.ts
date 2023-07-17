import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayTestComponent } from './pay-test.component';

describe('PayTestComponent', () => {
  let component: PayTestComponent;
  let fixture: ComponentFixture<PayTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PayTestComponent]
    });
    fixture = TestBed.createComponent(PayTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
