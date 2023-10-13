import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvitadoPage } from './invitado.page';

describe('InvitadoPage', () => {
  let component: InvitadoPage;
  let fixture: ComponentFixture<InvitadoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InvitadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
