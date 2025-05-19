export interface Monumento {
  _id: string;
  nombre: string;
  categoria: string;
  descripcion?: string;
  coordenadas: {
    latitud: number;
    longitud: number;
  };
  radioGeofence: number;
  imagenes: string[]; // << importante que sea un arreglo
  distancia?: number;
}
