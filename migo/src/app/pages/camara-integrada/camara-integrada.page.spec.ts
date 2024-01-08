import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CamaraIntegradaPage } from './camara-integrada.page';

describe('CamaraIntegradaPage', () => {
  let component: CamaraIntegradaPage;
  let fixture: ComponentFixture<CamaraIntegradaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CamaraIntegradaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
