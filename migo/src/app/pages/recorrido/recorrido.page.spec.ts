import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RecorridoPage } from './recorrido.page';

describe('RecorridoPage', () => {
  let component: RecorridoPage;
  let fixture: ComponentFixture<RecorridoPage>;

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(RecorridoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
