import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TerminosCondicionesPrincipalPage } from './terminos-condiciones-principal.page';

describe('TerminosCondicionesPrincipalPage', () => {
  let component: TerminosCondicionesPrincipalPage;
  let fixture: ComponentFixture<TerminosCondicionesPrincipalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TerminosCondicionesPrincipalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
