import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectUbicacionPage } from './select-ubicacion.page';

describe('SelectUbicacionPage', () => {
  let component: SelectUbicacionPage;
  let fixture: ComponentFixture<SelectUbicacionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SelectUbicacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
