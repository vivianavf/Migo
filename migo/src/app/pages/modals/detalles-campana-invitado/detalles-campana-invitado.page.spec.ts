import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetallesCampanaInvitadoPage } from './detalles-campana-invitado.page';

describe('DetallesCampanaInvitadoPage', () => {
  let component: DetallesCampanaInvitadoPage;
  let fixture: ComponentFixture<DetallesCampanaInvitadoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetallesCampanaInvitadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
