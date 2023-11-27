import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormularioAplicacionPage } from './formulario-aplicacion.page';

describe('FormularioAplicacionPage', () => {
  let component: FormularioAplicacionPage;
  let fixture: ComponentFixture<FormularioAplicacionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FormularioAplicacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
