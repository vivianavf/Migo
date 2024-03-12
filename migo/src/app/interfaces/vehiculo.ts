export interface Vehiculo {
    id_vehiculo?: number,
    telefono_conductor: number,
    placa: string,
    anio: number,
    categoria_vehiculo: any,
    color_vehiculo: number,
    imagen_izq: File | string,
    imagen_der: File | string,
    imagen_frontal: File | string,
    imagen_trasera: File | string,
    imagen_techo: File | string,
    estado: number,
    id_cliente: number,
    id_marca: number,
    id_modelo: number
}
