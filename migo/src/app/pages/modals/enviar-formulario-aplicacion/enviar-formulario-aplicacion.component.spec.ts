import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EnviarFormularioAplicacionComponent } from './enviar-formulario-aplicacion.component';

describe('EnviarFormularioAplicacionComponent', () => {
  let component: EnviarFormularioAplicacionComponent;
  let fixture: ComponentFixture<EnviarFormularioAplicacionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EnviarFormularioAplicacionComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EnviarFormularioAplicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
