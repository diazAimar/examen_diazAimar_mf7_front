import { useState } from "react";
import { Button, Tooltip } from "antd";
import { ArrowCounterClockwiseIcon, EyeIcon } from "@phosphor-icons/react";
import { createColumnHelper } from "@tanstack/react-table";
import { TanstackDataTable } from "../../../components/TanstackDataTable/TanstackDataTable";
import { PersonaDetailModal } from "./PersonaDetailModal";
import RestaurarPersonaModal from "./RestaurarPersonaModal";

interface PersonasEliminadasTableProps {
  records: IPersona[];
}

export const PersonasEliminadasTable = ({
  records,
}: PersonasEliminadasTableProps) => {
  const [selectedPersona, setSelectedPersona] = useState<IPersona | null>(
    null,
  );
  const [verPersonaModalIsOpen, setVerPersonaModalIsOpen] = useState(false);
  const [restaurarPersonaModalIsOpen, setRestaurarPersonaModalIsOpen] =
    useState(false);

  const handleClick = (persona: IPersona, action: "view" | "restore") => {
    switch (action) {
      case "view":
        setSelectedPersona(persona);
        setVerPersonaModalIsOpen(true);
        break;
      case "restore":
        setSelectedPersona(persona);
        setRestaurarPersonaModalIsOpen(true);
        break;
    }
  };

  const columnHelper = createColumnHelper<IPersona>();

  const columns = [
    columnHelper.accessor("id", {
      header: "ID",
    }),

    columnHelper.accessor("dni", {
      header: "DNI",
    }),

    columnHelper.accessor("nombre", {
      header: "Nombre",
    }),

    columnHelper.accessor("apellido", {
      header: "Apellido",
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
        const persona = row.original;
        return (
          <div className="flex gap-2">
            <Tooltip title="Ver">
              <Button
                type="primary"
                size="small"
                icon={<EyeIcon size="1.2rem" />}
                onClick={() => handleClick(persona, "view")}
              />
            </Tooltip>
            <Tooltip title="Restaurar">
              <Button
                type="default"
                size="small"
                icon={<ArrowCounterClockwiseIcon size="1.2rem" />}
                onClick={() => handleClick(persona, "restore")}
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

      {selectedPersona && verPersonaModalIsOpen && (
        <PersonaDetailModal
          persona={selectedPersona}
          onClose={() => {
            setSelectedPersona(null);
            setVerPersonaModalIsOpen(false);
          }}
        />
      )}

      {selectedPersona && restaurarPersonaModalIsOpen && (
        <RestaurarPersonaModal
          persona={selectedPersona}
          restaurarPersonaModalIsOpen={restaurarPersonaModalIsOpen}
          onClose={() => {
            setSelectedPersona(null);
            setRestaurarPersonaModalIsOpen(false);
          }}
        />
      )}
    </>
  );
};
