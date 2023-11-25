import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetallesCampanaPage } from './detalles-campana.page';

describe('DetallesCampanaPage', () => {
  let component: DetallesCampanaPage;
  let fixture: ComponentFixture<DetallesCampanaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetallesCampanaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
