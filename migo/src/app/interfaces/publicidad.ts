/* Como no voy a crear una publicidad desde la app */
/* Puedo obtener la ruta de la img como string */

export interface Publicidad {
    fecha_creacion: Date,
    estado: number,
    imagen_publicitaria: string, /* La ruta para obtener la img del server */
    fecha_modificacion: Date,
    id_ciudad: number,
    id_pais: number,
}
