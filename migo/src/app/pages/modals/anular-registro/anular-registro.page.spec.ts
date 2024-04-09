import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnularRegistroPage } from './anular-registro.page';

describe('AnularRegistroPage', () => {
  let component: AnularRegistroPage;
  let fixture: ComponentFixture<AnularRegistroPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AnularRegistroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
