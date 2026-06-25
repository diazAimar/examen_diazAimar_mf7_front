interface IPersona {
  id: number;
  dni: string;
  nombre: string;
  apellido: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}

interface IPersonaDetail extends IPersona {
  expedientes: IExpediente[];
}
