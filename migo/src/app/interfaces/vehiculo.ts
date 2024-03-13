import { Photo } from "@capacitor/camera";

export interface Vehiculo {
    id_vehiculo?: number,
    telefono_conductor: number,
    placa: string,
    anio: number,
    categoria_vehiculo: string,
    color_vehiculo: string,
    imagen_izq: Photo | string,
    imagen_der: Photo | string,
    imagen_frontal: Photo | string,
    imagen_trasera: Photo | string,
    imagen_techo: Photo | string,
    estado: number,
    id_cliente: number,
    id_marca: number,
    id_modelo: number
}
