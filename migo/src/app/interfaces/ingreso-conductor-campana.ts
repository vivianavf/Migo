export interface IngresoConductorCampana {
    id?: number,
    fecha_registro: string,
    estado: number,
    id_usuario: number,
    id_campana: number,
    id_vehiculo: number,
    id_ciudad: number,
    id_pais: number,
    documentoQR ?: File,
}
