import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VehiculosModalPage } from './vehiculos-modal.page';

describe('VehiculosModalPage', () => {
  let component: VehiculosModalPage;
  let fixture: ComponentFixture<VehiculosModalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VehiculosModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
