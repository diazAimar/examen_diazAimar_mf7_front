import { useState } from "react";
import { Button, Tooltip } from "antd";
import { EyeIcon, PencilIcon, TrashIcon } from "@phosphor-icons/react";
import { createColumnHelper } from "@tanstack/react-table";
import { TanstackDataTable } from "../../../components/TanstackDataTable/TanstackDataTable";
import { PersonaDetailModal } from "./PersonaDetailModal";
import EditarPersonaModal from "./EditarPersonaModal";
import EliminarPersonaModal from "./EliminarPersonaModal";

interface PersonasTableProps {
  records: IPersona[];
}

export const PersonasTable = ({ records }: PersonasTableProps) => {
  const [selectedPersona, setSelectedPersona] = useState<IPersona | null>(
    null,
  );
  const [verPersonaModalIsOpen, setVerPersonaModalIsOpen] = useState(false);
  const [editarPersonaModalIsOpen, setEditarPersonaModalIsOpen] =
    useState(false);
  const [eliminarPersonaModalIsOpen, setEliminarPersonaModalIsOpen] =
    useState(false);

  const handleClick = (
    persona: IPersona,
    action: "view" | "edit" | "delete",
  ) => {
    switch (action) {
      case "view":
        setSelectedPersona(persona);
        setVerPersonaModalIsOpen(true);
        break;
      case "edit":
        setSelectedPersona(persona);
        setEditarPersonaModalIsOpen(true);
        break;
      case "delete":
        setSelectedPersona(persona);
        setEliminarPersonaModalIsOpen(true);
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
                onClick={() => handleClick(persona, "view")}
              />
            </Tooltip>
            <Tooltip title="Editar">
              <Button
                type="default"
                size="small"
                icon={<PencilIcon size="1.2rem" />}
                onClick={() => handleClick(persona, "edit")}
              />
            </Tooltip>
            <Tooltip title="Eliminar">
              <Button
                type="default"
                size="small"
                danger
                icon={<TrashIcon size="1.2rem" />}
                onClick={() => handleClick(persona, "delete")}
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
      {selectedPersona && editarPersonaModalIsOpen && (
        <EditarPersonaModal
          persona={selectedPersona}
          editarPersonaModalIsOpen={editarPersonaModalIsOpen}
          onClose={() => {
            setSelectedPersona(null);
            setEditarPersonaModalIsOpen(false);
          }}
        />
      )}
      {selectedPersona && eliminarPersonaModalIsOpen && (
        <EliminarPersonaModal
          persona={selectedPersona}
          eliminarPersonaModalIsOpen={eliminarPersonaModalIsOpen}
          onClose={() => {
            setSelectedPersona(null);
            setEliminarPersonaModalIsOpen(false);
          }}
        />
      )}
    </>
  );
};
