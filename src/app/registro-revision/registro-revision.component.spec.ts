import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroRevisionComponent } from './registro-revision.component';

describe('RegistroRevisionComponent', () => {
  let component: RegistroRevisionComponent;
  let fixture: ComponentFixture<RegistroRevisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroRevisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroRevisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
