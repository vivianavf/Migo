export interface Notificacion {
    id_notificacion: number,
    fecha_envio: Date,
    id_campana: number,
    estado: string,
    titulo: string, 
    descripcion: string,
}
