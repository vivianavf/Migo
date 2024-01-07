import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { CampanaService } from 'src/app/providers/campana.service';
import { ClienteService } from 'src/app/providers/cliente.service';
import { UsersService } from 'src/app/providers/users.service';
import { NotificacionesPage } from '../modals/notificaciones/notificaciones.page';
import { MenuPage } from '../modals/menu/menu.page';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

@Component({
  selector: 'app-formulario-aplicacion',
  templateUrl: './formulario-aplicacion.page.html',
  styleUrls: ['./formulario-aplicacion.page.scss'],
})
export class FormularioAplicacionPage implements OnInit {

  formularioAplicacion: FormGroup;
  mostrarMensaje: boolean = false;
  cliente!: Client;
  usuario!: User;
  vehiculos: Vehiculo[] = [];
  vehiculosUsuario: Vehiculo[] = [];
  nombreArchivo = "";
  showName = true;

  entidadBancaria = "Entidad Bancaria";
  tipoCuenta = "Tipo de Cuenta";

  vehiculoSeleccionado !: Vehiculo | null;
  marcaVehiculo = ""
  modeloVehiculo = ""

  file!: File;

  //form
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

  public entidadesBancarias = [
    'Banco del Ecuador',
    'Banco Nacional de Fomento',
    'Banco Pichincha',
    'Banco Guayaquil',
    'Banco Pacífico',
    'Banco Produbanco',
    'Banco Internacional',
    'Banco Amazonas',
    'Banco Solidario',
    'Banco Diners Club',
    'Banco de Loja',
    'Banco de Machala',
    'Banco Bolivariano',
    'Banco ProCredit',
    'Banco Coopnacional',
    'Banco Finca',
    'Banco Cofiec',
    'Banco General Rumiñahui',
    'Banco Comercial de Manabí',
    'Banco de Guayaquil Panamá',
    'Banco de la Producción',
    'Banco D-Miro',
    'Banco del Pacífico Internacional',
    'Banco Unión',
    'Banco del Litoral',
    'Banco del Austro',
    'Banco Cajasur',
    'Banco Guaymango',
    'Banco Rioja',
    'Banco Ruminahui',
    'Cooperativa de Ahorro y Crédito “Juventud Ecuatoriana Progresista” LTDA., (JEP)',
    'Cooperativa Alianza del Valle',
    'Cooprogreso',
    'Cooperativa de Ahorro y Crédito 29 de Octubre Ltda.'
  ];

  public tiposCuentas = [
    'Ahorros', 'Corriente'
  ];

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
  ) {
    this.formularioAplicacion = this.fb.group({
      email: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])),
      cedula: new FormControl('', Validators.required),
      entidad: new FormControl('', Validators.required),
      tipocuenta: new FormControl('', Validators.required),
      cuenta: new FormControl('', Validators.required)
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
  
  async mostrarNotificaciones(){
    const modal = await this.modalController.create({
    component: NotificacionesPage,
    componentProps:{

    },
    cssClass: 'notificaciones,'
    })
  }

  async mostrarMenu(){
    const modal = await this.modalController.create({
      component: MenuPage,
      componentProps:{
        user: this.userService.usuarioActivo(),
        client: this.clientService.clienteActivo(),
      },
      cssClass: 'menu',
    })

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

  async seleccionarVehiculo(){
    //enviar el ID del cliente
    //mostrar un modal donde se muestren todos los vehiculos

    const modal = await this.modalController.create({
      component: VehiculosModalPage,
      cssClass: 'vehiculos-modal',
      componentProps: {
        idCliente: this.cliente.id_cliente,
      },
    });

    modal.onDidDismiss().then((data)=>{
      this.vehiculoSeleccionado = this.elegirVehiculoService.vehiculoElegido;
      if(this.vehiculoSeleccionado){
        this.marcaVehiculoService.getMarcabyId(this.vehiculoSeleccionado.id_marca).subscribe((data)=>{
          this.marcaVehiculo = data.nombre;
        });
        this.modeloVehiculoService.getModelobyId(this.vehiculoSeleccionado.id_modelo).subscribe((data)=>{
          this.modeloVehiculo = data.nombre;
        })
        this.seleccionoVehiculo = true;
      }
    })

    return await modal.present();
  }

  eliminarVehiculo(){
    this.seleccionoVehiculo = false;
    this.elegirVehiculoService.eliminarVehiculo();
  }

  onFileChange(fileChangeEvent: any){
    this.file = fileChangeEvent.target.files[0];
    this.nombreArchivo = this.file.name;
    this.showName = false;
  }

  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.results = this.entidadesBancarias.filter((d) => d.toLowerCase().indexOf(query) > -1);
  }

  cambiarBanco(banco: string){
    this.entidadBancaria = banco;
    this.popCtrl.dismiss();
  }

  cambiarCuenta(cuenta: string){
    this.tipoCuenta = cuenta;
    this.popCtrl.dismiss();
  }

  enviarFormulario(){
    this.aceptoTerminos()
    this.entidadVacio()
    this.archivoExiste()
    this.tipoCuentaExiste()
    this.numeroCuentaExiste()
    this.vehiculoHaSidoSeleccionado()

    if(!this.terminosNoAceptados 
      && !this.archivoVacio
      && !this.entidadBancariaVacio
      && !this.tipodeCuentaVacio
      && !this.numeroCuentaVacio
      && this.seleccionoVehiculo
      ){
        console.log("puede registrarse")
        //correo = correoInput
        //cedula = cedulaInput
      //logica de registro a campaña
      //recoger todos los datos
      //enviarlos al server
      //mostrar pantalla de registro exitoso
    }else{
      console.log("No puede registrarse")
    }

  }

  vehiculoHaSidoSeleccionado(){
    if(!this.seleccionoVehiculo){
      this.mostrarmsgVehiculo = true;
    }else{
      this.mostrarmsgVehiculo = false;
    }
  }

  archivoExiste(){
    this.nombreArchivo.length>0?this.archivoVacio=false:this.archivoVacio=true;
    return this.archivoVacio
  }

  entidadVacio(){
    console.log(this.entidadBancaria)
    this.entidadBancaria!="Entidad Bancaria"?this.entidadBancariaVacio=false:this.entidadBancariaVacio=true;
    return this.entidadBancariaVacio;
  }

  tipoCuentaExiste(){
    this.tipoCuenta!="Tipo de Cuenta"?this.tipodeCuentaVacio=false:this.tipodeCuentaVacio=true;
    return this.tipodeCuentaVacio;
  }

  numeroCuentaExiste(){
    console.log(this.numeroCuentaInput)
    !this.numeroCuentaInput?this.numeroCuentaVacio=true:this.numeroCuentaVacio=false;
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

  generarApp(){
    this.cliente = this.clientService.clienteActivo();

    this.correoInput = this.cliente.email;
    this.cedulaInput = this.cliente.cedula_cliente;
    // this.usuario = this.userService.usuarioActivo();

    console.log(this.campanaService.getCampanaActual())

    console.log(this.userService.usuarioActivo());
    this.vehiculoService.getVehiculos().subscribe((data)=>{
      this.vehiculos = data;
    })

  }

  ionViewWillEnter(){
    try {
      this.generarApp();
    } catch (error) {
      
    }
  }

  ngOnInit() {
    try {
      this.generarApp();
    } catch (error) {
      
    }
  }

}
