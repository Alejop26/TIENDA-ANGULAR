import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefinitiveCartComponent } from './definitive-cart.component';

describe('DefinitiveCartComponent', () => {
  let component: DefinitiveCartComponent;
  let fixture: ComponentFixture<DefinitiveCartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DefinitiveCartComponent]
    });
    fixture = TestBed.createComponent(DefinitiveCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
