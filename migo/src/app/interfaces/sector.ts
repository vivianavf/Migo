import { Ubicacion } from "./ubicacion";

export interface Sector {
  id_sector: number;
  id_empresa: number;
  id_campana: number;
  nombre: string;
  fecha_creacion: string;
  cerco_virtual: Ubicacion[][];
  centro: Ubicacion;
  zoom: number;
  fecha_modificacion: string;
  estado: number;
  id_pais: number;
  id_ciudad: number;
}
