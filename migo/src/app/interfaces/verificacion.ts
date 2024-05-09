export interface Verificacion {
    id_verificacion?: number,
    cedula_conductor: number,
    id_campana: number,
    fecha_registro: Date | string,
    tipo_verificacion: string,
    imagen_evidencia: Blob,
    estado?: number,
}
