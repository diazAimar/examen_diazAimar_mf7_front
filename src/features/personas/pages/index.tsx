import { Button, Spin } from "antd";
import useGetPersonas from "../../../hooks/personas/useGetPersonas";
import { PersonasTable } from "../components/PersonasTable";
import { PersonasEliminadasTable } from "../components/PersonasEliminadasTable";
import { useState } from "react";
import CrearPersonaModal from "../components/CrearPersonaModal";

const PersonasPage = () => {
  const { data, isLoading, error } = useGetPersonas();
  const [crearPersonaModalIsOpen, setCrearPersonaModalIsOpen] = useState(false);

  const personasActivas = (data || []).filter((p) => p.deleted_at === null || p.deleted_at === undefined);
  const personasEliminadas = (data || []).filter((p) => p.deleted_at !== null && p.deleted_at !== undefined);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold">Personas</h1>
          <Button type="primary" onClick={() => setCrearPersonaModalIsOpen(true)}>
            Crear Persona
          </Button>
        </div>

        {isLoading && (
          <div className="flex justify-center py-12">
            <Spin size="large" />
          </div>
        )}
        {error && <div className="text-danger">Error: {error.message}</div>}
        {!isLoading && !error && <PersonasTable records={personasActivas} />}
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-semibold text-gray-500">Personas Eliminadas</h2>
        {!isLoading && !error && <PersonasEliminadasTable records={personasEliminadas} />}
      </div>

      {crearPersonaModalIsOpen && (
        <CrearPersonaModal
          crearPersonaModalIsOpen={crearPersonaModalIsOpen}
          onClose={() => setCrearPersonaModalIsOpen(false)}
        />
      )}
    </div>
  );
};

export default PersonasPage;
