import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReclamosPage } from './reclamos.page';

describe('ReclamosPage', () => {
  let component: ReclamosPage;
  let fixture: ComponentFixture<ReclamosPage>;

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(ReclamosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
