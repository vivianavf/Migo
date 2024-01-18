import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PanelPage } from './panel.page';

describe('PanelPage', () => {
  let component: PanelPage;
  let fixture: ComponentFixture<PanelPage>;

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(PanelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
