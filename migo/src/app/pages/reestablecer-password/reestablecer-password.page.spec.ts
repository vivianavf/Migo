import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReestablecerPasswordPage } from './reestablecer-password.page';

describe('ReestablecerPasswordPage', () => {
  let component: ReestablecerPasswordPage;
  let fixture: ComponentFixture<ReestablecerPasswordPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ReestablecerPasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});