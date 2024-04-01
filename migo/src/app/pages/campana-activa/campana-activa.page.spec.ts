import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CampanaActivaPage } from './campana-activa.page';

describe('CampanaActivaPage', () => {
  let component: CampanaActivaPage;
  let fixture: ComponentFixture<CampanaActivaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CampanaActivaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
