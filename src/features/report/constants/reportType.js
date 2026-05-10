export const REPORT_TYPE_BY_ACTION = {
  Encontrado: "ENCONTRADA",
  Perdido: "PERDIDA",
  Avistamiento: "AVISTAMIENTO",
};

export const REPORT_FLOW_BY_ROUTE = {
  perdido: {
    actionType: "Perdido",
    tipoReporte: "PERDIDA",
  },
  encontrado: {
    actionType: "Encontrado",
    tipoReporte: "ENCONTRADA",
  },
  avistamiento: {
    actionType: "Avistamiento",
    tipoReporte: "AVISTAMIENTO",
  },
};