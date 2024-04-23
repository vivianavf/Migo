import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PoliticaPrivacidadPrincipalPage } from './politica-privacidad-principal.page';

describe('PoliticaPrivacidadPrincipalPage', () => {
  let component: PoliticaPrivacidadPrincipalPage;
  let fixture: ComponentFixture<PoliticaPrivacidadPrincipalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PoliticaPrivacidadPrincipalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
