import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PagoMovilComponent } from './pago-movil.component';

describe('PagoMovilComponent', () => {
  let component: PagoMovilComponent;
  let fixture: ComponentFixture<PagoMovilComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PagoMovilComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PagoMovilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
