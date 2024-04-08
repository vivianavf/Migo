import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConducirModalPage } from './conducir-modal.page';

describe('ConducirModalPage', () => {
  let component: ConducirModalPage;
  let fixture: ComponentFixture<ConducirModalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ConducirModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
