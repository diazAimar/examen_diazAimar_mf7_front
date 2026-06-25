interface IPersona {
  id: number;
  dni: string;
  nombre: string;
  apellido: string;
}

interface IPersonaDetail extends IPersona {
  expedientes: IExpediente[];
}
