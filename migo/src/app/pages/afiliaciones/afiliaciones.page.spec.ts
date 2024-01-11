import { ComponentFixture, TestBed, async, waitForAsync } from '@angular/core/testing';
import { AfiliacionesPage } from './afiliaciones.page';

describe('AfiliacionesPage', () => {
  let component: AfiliacionesPage;
  let fixture: ComponentFixture<AfiliacionesPage>;

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(AfiliacionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
