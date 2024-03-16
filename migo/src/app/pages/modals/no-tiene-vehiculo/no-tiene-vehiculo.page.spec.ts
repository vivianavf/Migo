import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoTieneVehiculoPage } from './no-tiene-vehiculo.page';

describe('NoTieneVehiculoPage', () => {
  let component: NoTieneVehiculoPage;
  let fixture: ComponentFixture<NoTieneVehiculoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NoTieneVehiculoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
