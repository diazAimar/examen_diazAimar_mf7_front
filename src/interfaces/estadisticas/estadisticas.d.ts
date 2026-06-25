interface IEstadisticasPorAnno {
  anno: number;
  cantidad: number;
}

interface IEstadisticasPorCiudad {
  ciudad: string;
  cantidad: number;
}

interface IEstadisticasPorFuero {
  fuero: string;
  cantidad: number;
}

interface IEstadisticasGeneral {
  anno: number;
  ciudad: string;
  fuero: string;
  cantidad: number;
}

interface IEstadisticas {
  por_anno: IEstadisticasPorAnno[];
  por_ciudad: IEstadisticasPorCiudad[];
  por_fuero: IEstadisticasPorFuero[];
  general: IEstadisticasGeneral[];
}
