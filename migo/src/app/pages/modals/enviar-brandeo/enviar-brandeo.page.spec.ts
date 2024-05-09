import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnviarBrandeoPage } from './enviar-brandeo.page';

describe('EnviarBrandeoPage', () => {
  let component: EnviarBrandeoPage;
  let fixture: ComponentFixture<EnviarBrandeoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EnviarBrandeoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
