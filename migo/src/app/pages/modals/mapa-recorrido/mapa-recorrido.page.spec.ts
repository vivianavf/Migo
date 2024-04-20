import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapaRecorridoPage } from './mapa-recorrido.page';

describe('MapaRecorridoPage', () => {
  let component: MapaRecorridoPage;
  let fixture: ComponentFixture<MapaRecorridoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MapaRecorridoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
