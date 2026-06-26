import { useState } from "react";
import { Button, Tooltip } from "antd";
import { ArrowCounterClockwiseIcon, EyeIcon } from "@phosphor-icons/react";
import { createColumnHelper } from "@tanstack/react-table";
import { TanstackDataTable } from "../../../components/TanstackDataTable/TanstackDataTable";
import ExpedienteDetailModal from "./ExpedienteDetailModal";
import RestaurarExpedienteModal from "./RestaurarExpedienteModal";

interface ExpedientesEliminadasTableProps {
  records: IExpediente[];
}

export const ExpedientesEliminadasTable = ({
  records,
}: ExpedientesEliminadasTableProps) => {
  const [selectedExpediente, setSelectedExpediente] =
    useState<IExpediente | null>(null);
  const [verExpedienteModalIsOpen, setVerExpedienteModalIsOpen] =
    useState(false);
  const [restaurarExpedienteModalIsOpen, setRestaurarExpedienteModalIsOpen] =
    useState(false);

  const handleClick = (
    expediente: IExpediente,
    action: "view" | "restore",
  ) => {
    switch (action) {
      case "view":
        setSelectedExpediente(expediente);
        setVerExpedienteModalIsOpen(true);
        break;
      case "restore":
        setSelectedExpediente(expediente);
        setRestaurarExpedienteModalIsOpen(true);
        break;
    }
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
            <Tooltip title="Restaurar">
              <Button
                type="default"
                size="small"
                icon={<ArrowCounterClockwiseIcon size="1.2rem" />}
                onClick={() => handleClick(expediente, "restore")}
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

      {selectedExpediente && restaurarExpedienteModalIsOpen && (
        <RestaurarExpedienteModal
          expediente={selectedExpediente}
          restaurarExpedienteModalIsOpen={restaurarExpedienteModalIsOpen}
          onClose={() => {
            setSelectedExpediente(null);
            setRestaurarExpedienteModalIsOpen(false);
          }}
        />
      )}
    </>
  );
};
