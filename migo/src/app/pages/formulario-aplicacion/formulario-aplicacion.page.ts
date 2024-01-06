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

@Component({
  selector: 'app-formulario-aplicacion',
  templateUrl: './formulario-aplicacion.page.html',
  styleUrls: ['./formulario-aplicacion.page.scss'],
})
export class FormularioAplicacionPage implements OnInit {

  formularioAplicacion: FormGroup;
  mostrarMensaje: boolean = false;
  cliente!: Client;
  vehiculos: Vehiculo[] = [];
  vehiculosUsuario: Vehiculo[] = [];
  nombreArchivo = "";
  showName = true;

  entidadBancaria = "Entidad Bancaria";
  tipoCuenta = "Tipo de Cuenta";

  file!: File;

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
  ];

  public tiposCuentas = [
    'Ahorros', 'Corriente'
  ];

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

  mostrarTerminos(){}

  mostrarPoliticas(){}

  seleccionarVehiculo(){
    // this.vehiculos.forEach((element)=>{
    //   const vehiculoPertenece = this.vehiculos.find(({id_cliente}) => id_cliente === this.cliente.id_cliente);
    //   //if
    //   // console.log(vehiculoPertenece)
    //   if(vehiculoPertenece) this.vehiculosUsuario.push(vehiculoPertenece)
    // })
    // const busquedaEmail = usuarios.find(({ email }) => email === inputEmail);
  }

  onFileChange(fileChangeEvent: any){
    this.file = fileChangeEvent.target.files[0];
    this.nombreArchivo = this.file.name;
    this.showName = false;
  }

  cambiarBanco(banco: string){
    this.entidadBancaria = banco;
    this.popCtrl.dismiss();
  }

  cambiarCuenta(cuenta: string){
    this.tipoCuenta = cuenta;
    this.popCtrl.dismiss();
  }

  enviarFormulario(){}

  subirArchivo(){}

  ngOnInit() {
    this.cliente = this.clientService.clienteActivo();
    this.vehiculoService.getVehiculos().subscribe((data)=>{
      this.vehiculos = data;
    })
  }

}
