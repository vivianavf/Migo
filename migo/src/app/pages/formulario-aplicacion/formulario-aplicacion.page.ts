import { Component, OnInit, ViewChild } from '@angular/core';
import {
  IonModal,
  ModalController,
  NavController,
  PopoverController,
} from '@ionic/angular';
import { CampanaService } from 'src/app/providers/campana.service';
import { ClienteService } from 'src/app/providers/cliente.service';
import { UsersService } from 'src/app/providers/users.service';
import { NotificacionesPage } from '../modals/notificaciones/notificaciones.page';
import { MenuPage } from '../modals/menu/menu.page';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Client } from 'src/app/interfaces/client';
import { VehiculoService } from 'src/app/providers/vehiculo.service';
import { Vehiculo } from 'src/app/interfaces/vehiculo';
import { User } from 'src/app/interfaces/user';
import { PrivacidadPage } from '../modals/privacidad/privacidad.page';
import { TerminosCondicionesPage } from '../modals/terminos-condiciones/terminos-condiciones.page';
import { VehiculosModalPage } from '../modals/vehiculos-modal/vehiculos-modal.page';
import { ElegirVehiculoService } from 'src/app/providers/elegir-vehiculo.service';
import { MarcaVehiculoService } from 'src/app/providers/marca-vehiculo.service';
import { ModeloVehiculosService } from 'src/app/providers/modelo-vehiculos.service';
import { Campana } from 'src/app/interfaces/campana';
import { FormularioAplicacionService } from 'src/app/providers/formulario-aplicacion.service';
import { ToolbarService } from 'src/app/providers/toolbar.service';
import { NavigationService } from 'src/app/providers/navigation.service';
import { EntidadBancariaService } from 'src/app/providers/entidad-bancaria.service';
import { ChoferService } from 'src/app/providers/chofer.service';
import { FormularioAplicacion } from 'src/app/interfaces/formulario-aplicacion';
import { EnviarFormularioAplicacionComponent } from '../modals/enviar-formulario-aplicacion/enviar-formulario-aplicacion.component';

interface parteBrandeable {
  nombre: string;
  brandeo: boolean;
  costo: number;
}

@Component({
  selector: 'app-formulario-aplicacion',
  templateUrl: './formulario-aplicacion.page.html',
  styleUrls: ['./formulario-aplicacion.page.scss'],
})
export class FormularioAplicacionPage implements OnInit {
  formularioAplicacion: FormGroup;
  mostrarMensaje: boolean = false;
  cliente!: Client;
  usuario?: User;
  campana!: Campana;
  vehiculos: Vehiculo[] = [];
  vehiculosUsuario: Vehiculo[] = [];
  archivoLicencia!: File;
  archivoMatricula!: File;
  showLicencia = true;
  showMatricula = true;
  textoMatricula = '';

  entidadBancaria = 'Entidad Bancaria';
  tipoCuenta = 'Tipo de Cuenta';

  vehiculoSeleccionado!: Vehiculo | null;
  marcaVehiculo = '';
  modeloVehiculo = '';

  file!: File;

  //form
  telefono_conductor: string = '';
  licencia!: File;
  matricula!: File;
  entidad: string = '';
  tipocuenta: string = '';
  fecha_envio: string = '';
  id_chofer!: number;
  id_cliente!: number;
  id_campana!: number;

  correoInput: string = '';
  cedulaInput: string = '';
  numeroCuentaInput: string = '';

  //mensajes retroalimentacion
  terminosNoAceptados: boolean = false;
  archivoVacio: boolean = false;
  entidadBancariaVacio: boolean = false;
  tipodeCuentaVacio: boolean = false;
  numeroCuentaVacio: boolean = false;
  termsAccepted: any;
  seleccionoVehiculo: boolean = false;
  mostrarmsgVehiculo: boolean = false;
  partesSeleccionada: boolean = false;

  entidadesBancarias: string[] = [];

  public tiposCuentas = ['Ahorros', 'Corriente', 'Billetera Electrónica'];

  public results = [...this.entidadesBancarias];

  entidadesFiltradas: string[] = [];
  entidadSeleccionada: string = '';

  imgRuta = 'https://migoadvs.pythonanywhere.com/vehiculos/';

  //
  puedeRegistrarse: boolean = false;
  @ViewChild(IonModal) modalFormulario!: IonModal;

  //partes brandeables
  partesBrandeables: parteBrandeable[] = [];

  constructor(
    private modalController: ModalController,
    private userService: UsersService,
    private clientService: ClienteService,
    private campanaService: CampanaService,
    private vehiculoService: VehiculoService,
    public fb: FormBuilder,
    private popCtrl: PopoverController,
    private elegirVehiculoService: ElegirVehiculoService,
    private marcaVehiculoService: MarcaVehiculoService,
    private modeloVehiculoService: ModeloVehiculosService,
    private formService: FormularioAplicacionService,
    private toolbarService: ToolbarService,
    private navService: NavigationService,
    private bancoService: EntidadBancariaService,
    private choferService: ChoferService
  ) {
    this.formularioAplicacion = this.fb.group({
      telefono_conductor: new FormControl('', Validators.required),
      licencia: new FormControl(null, Validators.required),
      matricula: new FormControl(null, Validators.required),
      Numerocuenta: new FormControl('', Validators.required),
      cedula: new FormControl('', Validators.required),
      entidad: new FormControl('', Validators.required),
      tipocuenta: new FormControl('', Validators.required),
      email: ['', [Validators.required, Validators.email]],
      fecha_envio: new FormControl('', Validators.required),
      id_chofer: new FormControl('', Validators.required),
      id_cliente: new FormControl('', Validators.required),
      id_campana: new FormControl('', Validators.required),
    });
  }

  getImageSrc(angulo: string, vehiculo?: Vehiculo) {
    const arrayNombreURL = String(vehiculo!.imagen_frontal).split('/');
    const foto = arrayNombreURL[arrayNombreURL.length - 1];
    return this.imgRuta + foto;
  }

  filtrarEntidades(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.entidadesFiltradas = this.entidadesBancarias.filter((entidad) =>
      entidad.toLowerCase().includes(searchTerm)
    );
  }

  seleccionarEntidad(entidad: string) {
    this.entidadSeleccionada = entidad;
    this.entidadesFiltradas = [];
    this.formularioAplicacion.controls['entidad'].setValue(entidad);
  }

  async mostrarNotificaciones() {
    const modal = await this.modalController.create({
      component: NotificacionesPage,
      componentProps: {},
      cssClass: 'notificaciones,',
    });
  }

  async mostrarMenu() {
    const modal = await this.modalController.create({
      component: MenuPage,
      cssClass: 'menu',
    });

    return await modal.present();
  }

  async mostrarTerminos() {
    const modal = await this.modalController.create({
      component: TerminosCondicionesPage,
      cssClass: 'terms',
    });

    return await modal.present();
  }

  async mostrarPoliticas() {
    const modal = await this.modalController.create({
      component: PrivacidadPage,
      cssClass: 'terms',
    });

    return await modal.present();
  }

  async seleccionarVehiculo() {
    //enviar el ID del cliente
    //mostrar un modal donde se muestren todos los vehiculos

    //si soy chofer, muestra con mi numero de chofer los autos que quiero ver
    //si soy cliente, muestra con mi id de cliente los autos que quiero ver

    const user = this.userService.usuarioActivo();
    const rolUser = user.rol_usuario;
    let id = 0;

    switch (rolUser) {
      case 2: //chofer
        const choferActivo = this.choferService.choferActivo();
        id = choferActivo.id_chofer!;
        break;
      case 5: //cliente
        const clienteActivo = this.clientService.clienteActivo();
        id = clienteActivo.id_cliente!;
        break;
    }

    const modal = await this.modalController.create({
      component: VehiculosModalPage,
      cssClass: 'vehiculos-modal',
      componentProps: {
        id: id,
        rolUsuario: rolUser,
      },
    });

    modal.onDidDismiss().then((data) => {
      this.vehiculoSeleccionado = this.elegirVehiculoService.vehiculoElegido;
      if (this.vehiculoSeleccionado) {
        this.marcaVehiculoService
          .getMarcabyId(this.vehiculoSeleccionado.id_marca)
          .subscribe((data) => {
            this.marcaVehiculo = data.nombre;
          });
        this.modeloVehiculoService
          .getModelobyId(this.vehiculoSeleccionado.id_modelo)
          .subscribe((data) => {
            this.modeloVehiculo = data.nombre;
          });
        this.seleccionoVehiculo = true;
      }
    });

    return await modal.present();
  }

  eliminarVehiculo() {
    this.seleccionoVehiculo = false;
    this.elegirVehiculoService.eliminarVehiculo();
  }

  onFileChange(fileChangeEvent: any, tipo: string) {
    this.file = fileChangeEvent.target.files[0];
    switch (tipo) {
      case 'licencia':
        this.archivoLicencia = this.file;
        this.showLicencia = false;
        break;
      case 'matricula':
        this.archivoMatricula = this.file;
        this.showMatricula = false;
        break;
    }
  }

  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.results = this.entidadesBancarias.filter(
      (d) => d.toLowerCase().indexOf(query) > -1
    );
  }

  cambiarBanco(banco: string) {
    this.entidadBancaria = banco;
    this.popCtrl.dismiss();
  }

  cambiarCuenta(cuenta: string) {
    this.tipoCuenta = cuenta;
    this.popCtrl.dismiss();
  }

  partesSeleccionadas(){
    const parteBrandeable = this.partesBrandeables.filter((parte) => parte.brandeo === true)
    this.partesSeleccionada = parteBrandeable.length > 0;
    return parteBrandeable.length>0;
  }

  async mostrarCargando() {
    const modal = await this.modalController.create({
      component: EnviarFormularioAplicacionComponent,
      cssClass: 'enviarFormApp',
    });

    return modal.present();
  }

  enviarFormulario() {
    this.aceptoTerminos();
    this.entidadVacio();
    this.archivoExiste();
    this.tipoCuentaExiste();
    this.numeroCuentaExiste();
    this.vehiculoHaSidoSeleccionado();
    this.partesSeleccionadas();

    if (
      !this.terminosNoAceptados &&
      !this.archivoVacio &&
      !this.entidadBancariaVacio &&
      !this.tipodeCuentaVacio &&
      !this.numeroCuentaVacio &&
      this.seleccionoVehiculo &&
      this.vehiculoSeleccionado && 
      this.partesSeleccionada
    ) {
      this.puedeRegistrarse = true;
      this.mostrarCargando();

      const user = this.userService.usuarioActivo();
      const rolUser = user.rol_usuario;

      const entidadElegida = this.bancoService.entidadesObtenidas.find(
        (entidad) => entidad.nombre === this.entidadBancaria
      );
      const f = new Date().toLocaleDateString().split('/');
      const fechaEnvio = f[2] + '-' + f[1] + '-' + f[0];

      //datos necesarios
      let cedula;
      let email;
      switch (rolUser) {
        case 2: //chofer
          const choferActivo = this.choferService.choferActivo();
          cedula = String(choferActivo.cedula_chofer);
          email = user.email;
          break;
        case 5: //cliente
          const clienteActivo = this.clientService.clienteActivo();
          cedula = String(clienteActivo.cedula_cliente);
          email = clienteActivo.email;
          break;
      }

      if(cedula && email){
        const form: FormularioAplicacion = {
          telefono_conductor: 999999999,
          licencia: this.archivoLicencia,
          matricula: this.archivoMatricula,
          numero_cuenta_bancaria: this.numeroCuentaInput,
          cedula: cedula,
          entidad_bancaria: entidadElegida!.id_entidad,
          tipo_cuenta_bancaria: this.tipoCuenta,
          correo_electronico: email,
          fecha_envio: fechaEnvio,
          id_usuario: this.userService.usuarioActivo().id_usuario,
          id_ciudad: this.userService.usuarioActivo().id_ciudad,
          id_pais: this.userService.usuarioActivo().id_pais,
          id_campana: this.campana.id_campana!,
          estado_solicitud: 'pendiente',
          id_vehiculo: Number(this.vehiculoSeleccionado.id_vehiculo),
          carroceria_capo: this.partesBrandeables.find((parte)=>parte.nombre === 'Capó' && parte.brandeo)?true:false,
          carroceria_techo: this.partesBrandeables.find((parte)=>parte.nombre === 'Techo' && parte.brandeo)?true:false,
          puerta_conductor: this.partesBrandeables.find((parte)=>parte.nombre === 'Puerta del conductor' && parte.brandeo)?true:false,
          puerta_pasajero: this.partesBrandeables.find((parte)=>parte.nombre === 'Puerta del copiloto' && parte.brandeo)?true:false,
          puerta_trasera_iz: this.partesBrandeables.find((parte)=>parte.nombre === 'Puerta trasera izquierda' && parte.brandeo)?true:false,
          puerta_trasera_der: this.partesBrandeables.find((parte)=>parte.nombre === 'Puerta trasera derecha' && parte.brandeo)?true:false,
          puerta_maletero: this.partesBrandeables.find((parte)=>parte.nombre === 'Maletero (puerta trasera)' && parte.brandeo)?true:false,
        };

        console.log(form)
        this.formService.crearFormulario(form).subscribe((response) => {
          if (response) {
            setTimeout(this.redireccion, 3000);
          }
        });
      }

      console.log('enviando formulario...')
    } else {
      this.puedeRegistrarse = false;
    }
  }

  redireccion() {
    // this.modalCtrl.dismiss();
    location.reload();
  }

  vehiculoHaSidoSeleccionado() {
    if (!this.seleccionoVehiculo) {
      this.mostrarmsgVehiculo = true;
    } else {
      this.mostrarmsgVehiculo = false;
    }
  }

  archivoExiste() {
    this.archivoLicencia && this.archivoLicencia.name.length > 0
      ? (this.archivoVacio = false)
      : (this.archivoVacio = true);
    return this.archivoVacio;
  }

  entidadVacio() {
    this.entidadBancaria != 'Entidad Bancaria'
      ? (this.entidadBancariaVacio = false)
      : (this.entidadBancariaVacio = true);
    return this.entidadBancariaVacio;
  }

  tipoCuentaExiste() {
    this.tipoCuenta != 'Tipo de Cuenta'
      ? (this.tipodeCuentaVacio = false)
      : (this.tipodeCuentaVacio = true);
    return this.tipodeCuentaVacio;
  }

  numeroCuentaExiste() {
    !this.numeroCuentaInput
      ? (this.numeroCuentaVacio = true)
      : (this.numeroCuentaVacio = false);
    return this.numeroCuentaVacio;
  }

  aceptoTerminos() {
    if (!this.termsAccepted) {
      this.terminosNoAceptados = true;
      return false;
    } else {
      this.terminosNoAceptados = false;
      return true;
    }
  }

  obtenerGanancia(){
    const tarifaBase = this.campana.tarifa_base // 1
    let dinero = 0;
    this.partesBrandeables.forEach((parte)=>{
      dinero += parte.brandeo?tarifaBase*parte.costo:0;
    })
    return this.redondearFloat(dinero, 2);
  }

  redondearFloat(numeroFloat: number, decimales: number) {
    const factor = 10 ** decimales;
    return Math.round(numeroFloat * factor) / factor;
  }

  generarApp() {
    const ciudad = this.userService.usuarioActivo().id_ciudad;
    const pais = this.userService.usuarioActivo().id_pais;

    /* En Ecuador se dice 'Matricula', en Colombia se dice 'Tarjeta de propiedad' */
    switch (pais) {
      case 1:
        this.textoMatricula = 'Matrícula';
        break;
      case 2:
        this.textoMatricula = 'Tarjeta de Propiedad';
        break;
      default:
        this.textoMatricula = 'Título de Propiedad del Vehículo';
        break;
    }

    if (this.entidadesBancarias.length === 0) {
      this.bancoService.entidadesObtenidas.forEach((entidad) => {
        ciudad === entidad.id_ciudad && pais === entidad.id_pais
          ? this.entidadesBancarias.push(entidad.nombre)
          : console.log('');
      });
    }
    this.results = this.entidadesBancarias;

    const user = this.userService.usuarioActivo();
    const rolUser = user.rol_usuario;

    switch (rolUser) {
      case 2: //chofer
        const choferActivo = this.choferService.choferActivo();
        this.correoInput = user.email;
        this.cedulaInput = String(choferActivo.cedula_chofer);
        break;
      case 5: //cliente
        const clienteActivo = this.clientService.clienteActivo();
        this.correoInput = clienteActivo.email;
        this.cedulaInput = clienteActivo.cedula_cliente;
        break;
    }

    this.campana = this.campanaService.getCampanaActual();
    this.vehiculoService.getVehiculos().subscribe((data) => {
      this.vehiculos = data;
    });

    this.formService.getFormularios().subscribe((data) => {});

    //partes brandeables
    this.partesBrandeables = [];
    const puertas = [
      { nombre: 'carroceria_capo', valor: this.campana.carroceria_capo},
      { nombre: 'carroceria_techo', valor: this.campana.carroceria_techo },
      { nombre: 'puerta_conductor', valor: this.campana.puerta_conductor },
      { nombre: 'puerta_pasajero', valor: this.campana.puerta_pasajero },
      { nombre: 'puerta_trasera_iz', valor: this.campana.puerta_trasera_iz },
      { nombre: 'puerta_trasera_der', valor: this.campana.puerta_trasera_der },
      { nombre: 'puerta_maletero', valor: this.campana.puerta_maletero },
    ];

    puertas.forEach(puerta => {
      const parteExiste = this.partesBrandeables.find((parte)=> parte.nombre === puerta.nombre)
        if (puerta.valor !== 0.0 && !parteExiste) {
          switch (puerta.nombre) {
            case "carroceria_capo":
              this.partesBrandeables.push({nombre: 'Capó', brandeo: false, costo: puerta.valor});
              break;
            case "carroceria_techo":
              this.partesBrandeables.push({nombre: 'Techo', brandeo: false, costo: puerta.valor});
              break;
            case "puerta_conductor":
              this.partesBrandeables.push({nombre: 'Puerta del conductor', brandeo: false, costo: puerta.valor});
              break;
            case "puerta_pasajero":
              this.partesBrandeables.push({nombre: 'Puerta del copiloto', brandeo: false, costo: puerta.valor});
              break;
            case "puerta_trasera_iz":
              this.partesBrandeables.push({nombre: 'Puerta trasera izquierda', brandeo: false, costo: puerta.valor});
              break;
            case "puerta_trasera_der":
              this.partesBrandeables.push({nombre: 'Puerta trasera derecha', brandeo: false, costo: puerta.valor});
              break;
            case "puerta_maletero":
              this.partesBrandeables.push({nombre: 'Maletero (puerta trasera)', brandeo: false, costo: puerta.valor});
              break;
        }
        }
    });
  }

  resetDatos() {
    this.seleccionoVehiculo = false;
    this.entidadBancaria = 'Entidad Bancaria';
    this.tipoCuenta = 'Tipo de Cuenta';
    this.numeroCuentaInput = '';
    this.formularioAplicacion.reset();
    // Object.assign(this.archivoLicencia, new File())
    // Object.assign(this.archivoMatricula, {})
  }

  ionViewDidLeave() {
    this.resetDatos();
  }

  ionViewDidEnter() {
    try {
      this.generarApp();
    } catch (error) {}
  }

  ngOnInit() {
    try {
      this.generarApp();
      this.formularioAplicacion.reset();
      this.toolbarService.setTexto('FORMULARIO DE APLICACIÓN');
      this.navService.setPagina('/formulario-aplicacion');
    } catch (error) {
      console.log(error);
    }
  }
}
