interface IExpedientePersona {
  id: number;
  dni: number;
  nombre: string;
  apellido: string;
  tipo_vinculo: ITipoVinculo;
}

interface IExpediente {
  id: number;
  codigo_organismo: string;
  tipo: string;
  numero: number;
  anno: number;
  caratula: string;
  ciudad: string;
  clave: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}

interface IExpedienteDetail extends IExpediente {
  organismo: { id: number; nombre: string };
  personas: IExpedientePersona[];
}
