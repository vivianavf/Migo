import { Ubicacion } from "./ubicacion";

export interface RecorridoRealizado {
    id_recorrido?: number,
    id_usuario: number,
    id_campana: number, 
    id_vehiculo: number,
    fecha_hora_inicio: Date,
    fecha_hora_fin: Date,
    kilometraje_recorrido: number,
    dinero_recaudado: number,
    id_ciudad: number,
    id_pais: number,
    estado?: number,
    ubicaciones: Ubicacion[],
}
