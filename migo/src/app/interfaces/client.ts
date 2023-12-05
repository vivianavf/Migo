export interface Client {
    id_cliente?: Number,
    cedula_cliente: string,
    nombre: string,
    apellido: string,
    fecha_nacimiento: string,
    email: string,
    sexo: number,
    telefono: string,
    estado: Number,
    id_usuario?: Number,
}
