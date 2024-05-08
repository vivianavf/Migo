import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FinalizandoRecorridoPage } from './finalizando-recorrido.page';

describe('FinalizandoRecorridoPage', () => {
  let component: FinalizandoRecorridoPage;
  let fixture: ComponentFixture<FinalizandoRecorridoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FinalizandoRecorridoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
