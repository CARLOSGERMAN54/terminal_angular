import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteRevisionesComponent } from './reporte-revisiones.component';

describe('ReporteRevisionesComponent', () => {
  let component: ReporteRevisionesComponent;
  let fixture: ComponentFixture<ReporteRevisionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteRevisionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteRevisionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
