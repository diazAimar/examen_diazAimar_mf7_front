import { useState } from "react";
import { Button, Tooltip } from "antd";
import { EyeIcon, PencilIcon, TrashIcon } from "@phosphor-icons/react";
import { createColumnHelper } from "@tanstack/react-table";
import { TanstackDataTable } from "../../../components/TanstackDataTable/TanstackDataTable";
import { PersonaDetailModal } from "./PersonaDetailModal";

interface PersonasTableProps {
  records: IPersona[];
}

export const PersonasTable = ({ records }: PersonasTableProps) => {
  const [selectedPersonaId, setSelectedPersonaId] = useState<number | null>(
    null,
  );

  const handleView = (persona: IPersona) => {
    setSelectedPersonaId(persona.id);
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

    columnHelper.display({
      id: "acciones",
      header: "Acciones",
      size: 160,
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
                onClick={() => handleView(persona)}
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
      <PersonaDetailModal
        personaId={selectedPersonaId}
        onClose={() => setSelectedPersonaId(null)}
      />
    </>
  );
};
