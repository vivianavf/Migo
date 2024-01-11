import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PreguntasPage } from './preguntas.page';

describe('PreguntasPage', () => {
  let component: PreguntasPage;
  let fixture: ComponentFixture<PreguntasPage>;

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(PreguntasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
