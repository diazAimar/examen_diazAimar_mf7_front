import { useState } from "react";
import { Button, Tooltip } from "antd";
import { EyeIcon, PencilIcon, TrashIcon } from "@phosphor-icons/react";
import { createColumnHelper } from "@tanstack/react-table";
import { TanstackDataTable } from "../../../components/TanstackDataTable/TanstackDataTable";
import { OrganismoDetailModal } from "./OrganismoDetailModal";
import EditarOrganismoModal from "./EditarOrganismoModal";
import EliminarOrganismoModal from "./EliminarOrganismoModal";

interface OrganismosTableProps {
  records: IOrganismo[];
}

export const OrganismosTable = ({ records }: OrganismosTableProps) => {
  const [selectedOrganismo, setSelectedOrganismo] =
    useState<IOrganismo | null>(null);
  const [verOrganismoModalIsOpen, setVerOrganismoModalIsOpen] = useState(false);
  const [editarOrganismoModalIsOpen, setEditarOrganismoModalIsOpen] =
    useState(false);
  const [eliminarOrganismoModalIsOpen, setEliminarOrganismoModalIsOpen] =
    useState(false);

  const handleClick = (
    organismo: IOrganismo,
    action: "view" | "edit" | "delete",
  ) => {
    switch (action) {
      case "view":
        setSelectedOrganismo(organismo);
        setVerOrganismoModalIsOpen(true);
        break;
      case "edit":
        setSelectedOrganismo(organismo);
        setEditarOrganismoModalIsOpen(true);
        break;
      case "delete":
        setSelectedOrganismo(organismo);
        setEliminarOrganismoModalIsOpen(true);
        break;
    }
  };

  const columnHelper = createColumnHelper<IOrganismo>();

  const columns = [
    columnHelper.accessor("id", {
      header: "ID",
    }),

    columnHelper.accessor("codigo", {
      header: "Código",
    }),

    columnHelper.accessor("nombre", {
      header: "Nombre",
    }),

    columnHelper.accessor("caratula", {
      header: "Carátula",
    }),

    columnHelper.accessor("ciudad", {
      header: "Ciudad",
    }),

    columnHelper.accessor("fuero", {
      header: "Fuero",
    }),

    columnHelper.display({
      id: "acciones",
      header: "Acciones",
      size: 160,
      enableColumnFilter: false,
      enableSorting: false,
      cell: ({ row }) => {
        const organismo = row.original;
        return (
          <div className="flex gap-2">
            <Tooltip title="Ver">
              <Button
                type="primary"
                size="small"
                icon={<EyeIcon size="1.2rem" />}
                onClick={() => handleClick(organismo, "view")}
              />
            </Tooltip>
            <Tooltip title="Editar">
              <Button
                type="default"
                size="small"
                icon={<PencilIcon size="1.2rem" />}
                onClick={() => handleClick(organismo, "edit")}
              />
            </Tooltip>
            <Tooltip title="Eliminar">
              <Button
                type="default"
                size="small"
                danger
                icon={<TrashIcon size="1.2rem" />}
                onClick={() => handleClick(organismo, "delete")}
              />
            </Tooltip>
          </div>
        );
      },
    }),
  ];

  return (
    <>
      <TanstackDataTable data={records} columns={columns} />

      {selectedOrganismo && verOrganismoModalIsOpen && (
        <OrganismoDetailModal
          organismo={selectedOrganismo}
          onClose={() => {
            setSelectedOrganismo(null);
            setVerOrganismoModalIsOpen(false);
          }}
        />
      )}
      {selectedOrganismo && editarOrganismoModalIsOpen && (
        <EditarOrganismoModal
          organismo={selectedOrganismo}
          editarOrganismoModalIsOpen={editarOrganismoModalIsOpen}
          onClose={() => {
            setSelectedOrganismo(null);
            setEditarOrganismoModalIsOpen(false);
          }}
        />
      )}
      {selectedOrganismo && eliminarOrganismoModalIsOpen && (
        <EliminarOrganismoModal
          organismo={selectedOrganismo}
          eliminarOrganismoModalIsOpen={eliminarOrganismoModalIsOpen}
          onClose={() => {
            setSelectedOrganismo(null);
            setEliminarOrganismoModalIsOpen(false);
          }}
        />
      )}
    </>
  );
};
