import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistorialPagosPage } from './historial-pagos.page';

describe('HistorialPagosPage', () => {
  let component: HistorialPagosPage;
  let fixture: ComponentFixture<HistorialPagosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HistorialPagosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
