import { Button, Spin } from "antd";
import { useState } from "react";
import useGetExpedientes from "../../../hooks/expedientes/useGetExpedientes";
import { ExpedientesTable } from "../components/ExpedientesTable";
import { ExpedientesEliminadasTable } from "../components/ExpedientesEliminadasTable";
import CrearExpedienteModal from "../components/CrearExpedienteModal";

const ExpedientesPage = () => {
  const { data, isLoading, error } = useGetExpedientes();
  const [crearExpedienteModalIsOpen, setCrearExpedienteModalIsOpen] =
    useState(false);

  const expedientesActivos = (data ?? []).filter(
    (e) => e.deleted_at === null || e.deleted_at === undefined,
  );
  const expedientesEliminados = (data ?? []).filter(
    (e) => e.deleted_at !== null && e.deleted_at !== undefined,
  );

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold">Expedientes</h1>
          <Button
            type="primary"
            onClick={() => setCrearExpedienteModalIsOpen(true)}
          >
            Crear Expediente
          </Button>
        </div>

        {isLoading && (
          <div className="flex justify-center py-12">
            <Spin size="large" />
          </div>
        )}
        {error && <div className="text-danger">Error: {error.message}</div>}
        {!isLoading && !error && (
          <ExpedientesTable records={expedientesActivos} />
        )}
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-semibold text-gray-500">
          Expedientes Eliminados
        </h2>
        {!isLoading && !error && (
          <ExpedientesEliminadasTable records={expedientesEliminados} />
        )}
      </div>

      {crearExpedienteModalIsOpen && (
        <CrearExpedienteModal
          crearExpedienteModalIsOpen={crearExpedienteModalIsOpen}
          onClose={() => setCrearExpedienteModalIsOpen(false)}
        />
      )}
    </div>
  );
};

export default ExpedientesPage;
