import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerificarRecorridoPage } from './verificar-recorrido.page';

describe('VerificarRecorridoPage', () => {
  let component: VerificarRecorridoPage;
  let fixture: ComponentFixture<VerificarRecorridoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VerificarRecorridoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
