import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FotopreviewPage } from './fotopreview.page';

describe('FotopreviewPage', () => {
  let component: FotopreviewPage;
  let fixture: ComponentFixture<FotopreviewPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FotopreviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
