export interface Sector {
  id_sector: number;
  id_empresa: number;
  id_campana: number;
  nombre: string;
  fecha_creacion: string;
  cerco_virtual: { lat: number; lng: number }[];
  centro: { lat: number; lng: number };
  zoom: number;
  fecha_modificacion: string;
  estado: number;
  id_pais: number;
  id_ciudad: number;
}
