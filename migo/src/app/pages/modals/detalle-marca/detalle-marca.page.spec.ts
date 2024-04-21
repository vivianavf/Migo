import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleMarcaPage } from './detalle-marca.page';

describe('DetalleMarcaPage', () => {
  let component: DetalleMarcaPage;
  let fixture: ComponentFixture<DetalleMarcaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetalleMarcaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
