import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { VerificacionesPage } from './verificaciones.page';

describe('VerificacionesPage', () => {
  let component: VerificacionesPage;
  let fixture: ComponentFixture<VerificacionesPage>;

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(VerificacionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
