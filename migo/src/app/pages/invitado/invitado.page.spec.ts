import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { InvitadoPage } from './invitado.page';

describe('InvitadoPage', () => {
  let component: InvitadoPage;
  let fixture: ComponentFixture<InvitadoPage>;

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(InvitadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
