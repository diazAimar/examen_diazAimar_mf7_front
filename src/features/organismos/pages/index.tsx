import { Button, Spin } from "antd";
import { useState } from "react";
import useGetOrganismos from "../../../hooks/organismos/useGetOrganismos";
import { OrganismosTable } from "../components/OrganismosTable";
import { OrganismosEliminadasTable } from "../components/OrganismosEliminadasTable";
import CrearOrganismoModal from "../components/CrearOrganismoModal";

const OrganismosPage = () => {
  const { data, isLoading, error } = useGetOrganismos();
  const [crearOrganismoModalIsOpen, setCrearOrganismoModalIsOpen] =
    useState(false);

  const organismosActivos = (data ?? []).filter(
    (o) => o.deleted_at === null || o.deleted_at === undefined,
  );
  const organismosEliminados = (data ?? []).filter(
    (o) => o.deleted_at !== null && o.deleted_at !== undefined,
  );

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold">Organismos</h1>
          <Button
            type="primary"
            onClick={() => setCrearOrganismoModalIsOpen(true)}
          >
            Crear Organismo
          </Button>
        </div>

        {isLoading && (
          <div className="flex justify-center py-12">
            <Spin size="large" />
          </div>
        )}
        {error && <div className="text-danger">Error: {error.message}</div>}
        {!isLoading && !error && (
          <OrganismosTable records={organismosActivos} />
        )}
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-semibold text-gray-500">
          Organismos Eliminados
        </h2>
        {!isLoading && !error && (
          <OrganismosEliminadasTable records={organismosEliminados} />
        )}
      </div>

      {crearOrganismoModalIsOpen && (
        <CrearOrganismoModal
          crearOrganismoModalIsOpen={crearOrganismoModalIsOpen}
          onClose={() => setCrearOrganismoModalIsOpen(false)}
        />
      )}
    </div>
  );
};

export default OrganismosPage;
