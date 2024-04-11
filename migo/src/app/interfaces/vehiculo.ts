import { Photo } from "@capacitor/camera";

export interface Vehiculo {
    id_cliente?: number,
    id_usuario?: number,
    id_vehiculo?: number,
    telefono_conductor: number,
    placa: string,
    anio: number,
    categoria_vehiculo: string,
    color_vehiculo: string,
    imagen_izq: Blob,
    imagen_der: Blob,
    imagen_frontal: Blob,
    imagen_trasera: Blob,
    imagen_techo: Blob,
    estado: number,
    id_chofer?: number,
    id_marca: number,
    id_modelo: number,
}
