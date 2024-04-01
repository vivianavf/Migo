import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MapaCambiarUbicacionComponent } from './mapa-cambiar-ubicacion.component';

describe('MapaCambiarUbicacionComponent', () => {
  let component: MapaCambiarUbicacionComponent;
  let fixture: ComponentFixture<MapaCambiarUbicacionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MapaCambiarUbicacionComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MapaCambiarUbicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
