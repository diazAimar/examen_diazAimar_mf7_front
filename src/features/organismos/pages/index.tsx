import { Button, Spin } from "antd";
import { useState } from "react";
import useGetOrganismos from "../../../hooks/organismos/useGetOrganismos";
import { OrganismosTable } from "../components/OrganismosTable";
import CrearOrganismoModal from "../components/CrearOrganismoModal";

const OrganismosPage = () => {
  const { data, isLoading, error } = useGetOrganismos();
  const [crearOrganismoModalIsOpen, setCrearOrganismoModalIsOpen] =
    useState(false);

  return (
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
      {!isLoading && !error && <OrganismosTable records={data ?? []} />}

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
