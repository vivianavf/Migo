import { Component, OnInit } from '@angular/core';
import {
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
import { QrPage } from '../modals/qr/qr.page';
import { Campana } from 'src/app/interfaces/campana';
import { FormularioAplicacionService } from 'src/app/providers/formulario-aplicacion.service';
import { ToolbarService } from 'src/app/providers/toolbar.service';
import { ConfirmacionPage } from '../modals/confirmacion/confirmacion.page';
import { NavigationService } from 'src/app/providers/navigation.service';
import { EntidadBancaria } from 'src/app/interfaces/entidad-bancaria';
import { EntidadBancariaService } from 'src/app/providers/entidad-bancaria.service';

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

  entidadesBancarias: string[] = [];

  public tiposCuentas = ['Ahorros', 'Corriente', 'Billetera Electrónica'];

  public results = [...this.entidadesBancarias];

  entidadesFiltradas: string[] = [];
  entidadSeleccionada: string = '';

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
    private navCtrl: NavController,
    private formService: FormularioAplicacionService,
    private toolbarService: ToolbarService,
    private navService: NavigationService,
    private bancoService: EntidadBancariaService,
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

    const modal = await this.modalController.create({
      component: VehiculosModalPage,
      cssClass: 'vehiculos-modal',
      componentProps: {
        idCliente: this.cliente.id_cliente,
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

  enviarFormulario() {
    this.aceptoTerminos();
    this.entidadVacio();
    this.archivoExiste();
    this.tipoCuentaExiste();
    this.numeroCuentaExiste();
    this.vehiculoHaSidoSeleccionado();

    if (
      !this.terminosNoAceptados &&
      !this.archivoVacio &&
      !this.entidadBancariaVacio &&
      !this.tipodeCuentaVacio &&
      !this.numeroCuentaVacio &&
      this.seleccionoVehiculo &&
      this.vehiculoSeleccionado
    ) {
      console.log('puede registrarse');
      // this.navCtrl.navigateRoot('/home');

      // this.mostrarQR();

      var body = {
        telefono_conductor: parseInt(this.cliente.telefono)!,
        licencia: this.archivoLicencia,
        matricula: this.archivoMatricula,
        numero_cuenta_bancaria: this.numeroCuentaInput,
        cedula: this.cliente.cedula_cliente,
        entidad_bancaria: 1,
        tipo_cuenta_bancaria: 1,
        correo_electronico: this.cliente.email,
        fecha_envio: new Date().toISOString().split('T')[0],
        id_usuario: this.userService.usuarioActivo().id_usuario,
        id_ciudad: this.userService.usuarioActivo().id_ciudad,
        id_pais: this.userService.usuarioActivo().id_pais,
        id_campana: this.campana.id_campana!,
        estado_solicitud: 'pendiente',
        id_vehiculo: Number(this.vehiculoSeleccionado.id_vehiculo),
      };

      this.formService.crearFormulario(body).subscribe((response) => {
        if (response) {
          console.log(response);
          console.log('BODY', body);
          this.navCtrl.navigateRoot('/solicitudes');
          location.reload();
        }
      });
      //mostrar pantalla de registro exitoso
    } else {
      console.log('No puede registrarse');
    }
  }

  vehiculoHaSidoSeleccionado() {
    if (!this.seleccionoVehiculo) {
      this.mostrarmsgVehiculo = true;
    } else {
      this.mostrarmsgVehiculo = false;
    }
  }

  archivoExiste() {
    this.archivoLicencia.name.length > 0
      ? (this.archivoVacio = false)
      : (this.archivoVacio = true);
    return this.archivoVacio;
  }

  entidadVacio() {
    console.log('Entidad Bancaria', this.entidadBancaria);
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
    console.log('Numero Cuenta', this.numeroCuentaInput);
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

  generarApp() {
    const ciudad = this.userService.usuarioActivo().id_ciudad;
    const pais = this.userService.usuarioActivo().id_pais;

    /* En Ecuador se dice 'Matricula', en Colombia se dice 'Tarjeta de propiedad' */
    switch (pais) {
      case 1:
        this.textoMatricula = 'Matrícula';
        break;
      case 2:
        this.textoMatricula = 'Tarjeta de Propiedad'
        break;
      default:
        this.textoMatricula = 'Título de Propiedad del Vehículo';
        break;
    }

    if(this.entidadesBancarias.length === 0){
      this.bancoService.entidadesObtenidas.forEach((entidad)=>{
        (ciudad === entidad.id_ciudad && pais === entidad.id_pais)? this.entidadesBancarias.push(entidad.nombre):console.log('');
      });
    }
    this.results = this.entidadesBancarias;

    this.cliente = this.clientService.clienteActivo();
    this.correoInput = this.cliente.email;
    this.cedulaInput = this.cliente.cedula_cliente;
    this.campana = this.campanaService.getCampanaActual();
    this.vehiculoService.getVehiculos().subscribe((data) => {
      this.vehiculos = data;
    });
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
      this.navService.setPagina("/formulario-aplicacion");
    } catch (error) {
      console.log(error);
    }
  }
}
