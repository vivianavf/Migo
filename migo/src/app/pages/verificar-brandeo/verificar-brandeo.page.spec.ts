import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerificarBrandeoPage } from './verificar-brandeo.page';

describe('VerificarBrandeoPage', () => {
  let component: VerificarBrandeoPage;
  let fixture: ComponentFixture<VerificarBrandeoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VerificarBrandeoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
