export interface Ciudad {
    id_ciudad: number,
    nombre: string,
    id_pais: number,
    ubicacion_google_maps: {centro: {lat: number, lng: number}, zoom: number },
}
