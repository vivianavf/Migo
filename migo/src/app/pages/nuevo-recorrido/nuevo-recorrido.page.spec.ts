import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NuevoRecorridoPage } from './nuevo-recorrido.page';

describe('NuevoRecorridoPage', () => {
  let component: NuevoRecorridoPage;
  let fixture: ComponentFixture<NuevoRecorridoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NuevoRecorridoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
