import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegEmprendimientoComponent } from './reg-emprendimiento.component';

describe('RegEmprendimientoComponent', () => {
  let component: RegEmprendimientoComponent;
  let fixture: ComponentFixture<RegEmprendimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegEmprendimientoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegEmprendimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
