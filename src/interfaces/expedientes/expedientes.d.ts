interface IExpediente {
  id: number;
  codigo_organismo: string;
  tipo: string;
  numero: number;
  anno: number;
  caratula: string;
  ciudad: string;
  clave: string;
  organismo: IOrganismo;
  tipo_vinculo: ITipoVinculo;
}
