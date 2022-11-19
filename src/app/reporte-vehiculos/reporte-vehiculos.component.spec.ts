import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteVehiculosComponent } from './reporte-vehiculos.component';

describe('ReporteVehiculosComponent', () => {
  let component: ReporteVehiculosComponent;
  let fixture: ComponentFixture<ReporteVehiculosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteVehiculosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteVehiculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
