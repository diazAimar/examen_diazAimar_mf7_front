import { useState } from "react";
import { Button, Tooltip } from "antd";
import { ArrowCounterClockwiseIcon, EyeIcon } from "@phosphor-icons/react";
import { createColumnHelper } from "@tanstack/react-table";
import { TanstackDataTable } from "../../../components/TanstackDataTable/TanstackDataTable";
import { OrganismoDetailModal } from "./OrganismoDetailModal";
import RestaurarOrganismoModal from "./RestaurarOrganismoModal";

interface OrganismosEliminadasTableProps {
  records: IOrganismo[];
}

export const OrganismosEliminadasTable = ({
  records,
}: OrganismosEliminadasTableProps) => {
  const [selectedOrganismo, setSelectedOrganismo] =
    useState<IOrganismo | null>(null);
  const [verOrganismoModalIsOpen, setVerOrganismoModalIsOpen] = useState(false);
  const [restaurarOrganismoModalIsOpen, setRestaurarOrganismoModalIsOpen] =
    useState(false);

  const handleClick = (organismo: IOrganismo, action: "view" | "restore") => {
    switch (action) {
      case "view":
        setSelectedOrganismo(organismo);
        setVerOrganismoModalIsOpen(true);
        break;
      case "restore":
        setSelectedOrganismo(organismo);
        setRestaurarOrganismoModalIsOpen(true);
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

    columnHelper.accessor("ciudad", {
      header: "Ciudad",
    }),

    columnHelper.accessor("fuero", {
      header: "Fuero",
    }),

    columnHelper.accessor("deleted_at", {
      header: "Eliminado el",
      cell: ({ getValue }) => {
        const value = getValue();
        if (!value) return "-";
        return new Date(value).toLocaleString("es-AR");
      },
    }),

    columnHelper.display({
      id: "acciones",
      header: "Acciones",
      size: 120,
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
            <Tooltip title="Restaurar">
              <Button
                type="default"
                size="small"
                icon={<ArrowCounterClockwiseIcon size="1.2rem" />}
                onClick={() => handleClick(organismo, "restore")}
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

      {selectedOrganismo && restaurarOrganismoModalIsOpen && (
        <RestaurarOrganismoModal
          organismo={selectedOrganismo}
          restaurarOrganismoModalIsOpen={restaurarOrganismoModalIsOpen}
          onClose={() => {
            setSelectedOrganismo(null);
            setRestaurarOrganismoModalIsOpen(false);
          }}
        />
      )}
    </>
  );
};
