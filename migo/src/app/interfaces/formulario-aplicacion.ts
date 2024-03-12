export interface FormularioAplicacion {
    telefono_conductor: number,
    licencia: File | string,
    matricula: File | string,
    numero_cuenta_bancaria: string,
    cedula: string,
    entidad_bancaria: number,
    tipo_cuenta_bancaria: number,
    correo_electronico: string,
    fecha_envio: Date | string,
    id_chofer: number,
    id_cliente: number,
    id_campana: number
}
