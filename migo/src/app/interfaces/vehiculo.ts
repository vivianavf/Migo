import { Photo } from "@capacitor/camera";

export interface Vehiculo {
    id_cliente?: number,
    id_vehiculo?: number,
    telefono_conductor: number,
    placa: string,
    anio: number,
    categoria_vehiculo: string,
    color_vehiculo: string,
    imagen_izq: Photo,
    imagen_der: Photo,
    imagen_frontal: Photo,
    imagen_trasera: Photo,
    imagen_techo: Photo,
    estado: number,
    id_chofer?: number,
    id_marca: number,
    id_modelo: number
}
