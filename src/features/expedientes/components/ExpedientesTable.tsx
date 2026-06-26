import { useState } from "react";
import { Button, Tooltip } from "antd";
import { EyeIcon, PencilIcon, TrashIcon } from "@phosphor-icons/react";
import { createColumnHelper } from "@tanstack/react-table";
import { TanstackDataTable } from "../../../components/TanstackDataTable/TanstackDataTable";
import ExpedienteDetailModal from "./ExpedienteDetailModal";
import EditarExpedienteModal from "./EditarExpedienteModal";
import EliminarExpedienteModal from "./EliminarExpedienteModal";

interface ExpedientesTableProps {
  records: IExpediente[];
}

export const ExpedientesTable = ({ records }: ExpedientesTableProps) => {
  const [selectedExpediente, setSelectedExpediente] =
    useState<IExpediente | null>(null);
  const [verExpedienteModalIsOpen, setVerExpedienteModalIsOpen] =
    useState(false);
  const [editarExpedienteModalIsOpen, setEditarExpedienteModalIsOpen] =
    useState(false);
  const [eliminarExpedienteModalIsOpen, setEliminarExpedienteModalIsOpen] =
    useState(false);

  const handleClick = (
    expediente: IExpediente,
    action: "view" | "edit" | "delete",
  ) => {
    setSelectedExpediente(expediente);
    if (action === "view") setVerExpedienteModalIsOpen(true);
    if (action === "edit") setEditarExpedienteModalIsOpen(true);
    if (action === "delete") setEliminarExpedienteModalIsOpen(true);
  };

  const columnHelper = createColumnHelper<IExpediente>();

  const columns = [
    columnHelper.accessor("id", {
      header: "ID",
    }),

    columnHelper.accessor("clave", {
      header: "Clave",
    }),

    columnHelper.accessor("caratula", {
      header: "Carátula",
    }),

    columnHelper.accessor("tipo", {
      header: "Tipo",
    }),

    columnHelper.accessor("anno", {
      header: "Año",
    }),

    columnHelper.accessor("ciudad", {
      header: "Ciudad",
    }),

    columnHelper.display({
      id: "acciones",
      header: "Acciones",
      size: 160,
      enableColumnFilter: false,
      enableSorting: false,
      cell: ({ row }) => {
        const expediente = row.original;
        return (
          <div className="flex gap-2">
            <Tooltip title="Ver">
              <Button
                type="primary"
                size="small"
                icon={<EyeIcon size="1.2rem" />}
                onClick={() => handleClick(expediente, "view")}
              />
            </Tooltip>
            <Tooltip title="Editar">
              <Button
                type="default"
                size="small"
                icon={<PencilIcon size="1.2rem" />}
                onClick={() => handleClick(expediente, "edit")}
              />
            </Tooltip>
            <Tooltip title="Eliminar">
              <Button
                type="default"
                size="small"
                danger
                icon={<TrashIcon size="1.2rem" />}
                onClick={() => handleClick(expediente, "delete")}
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

      {selectedExpediente && verExpedienteModalIsOpen && (
        <ExpedienteDetailModal
          expedienteId={selectedExpediente.id}
          onClose={() => {
            setSelectedExpediente(null);
            setVerExpedienteModalIsOpen(false);
          }}
        />
      )}

      {selectedExpediente && editarExpedienteModalIsOpen && (
        <EditarExpedienteModal
          expedienteId={selectedExpediente.id}
          editarExpedienteModalIsOpen={editarExpedienteModalIsOpen}
          onClose={() => {
            setSelectedExpediente(null);
            setEditarExpedienteModalIsOpen(false);
          }}
        />
      )}

      {selectedExpediente && eliminarExpedienteModalIsOpen && (
        <EliminarExpedienteModal
          expediente={selectedExpediente}
          eliminarExpedienteModalIsOpen={eliminarExpedienteModalIsOpen}
          onClose={() => {
            setSelectedExpediente(null);
            setEliminarExpedienteModalIsOpen(false);
          }}
        />
      )}
    </>
  );
};
