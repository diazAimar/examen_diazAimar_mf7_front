import { Modal, Descriptions, Spin, Alert, Tag } from "antd";
import { createColumnHelper } from "@tanstack/react-table";
import { TanstackDataTable } from "../../../components/TanstackDataTable/TanstackDataTable";
import useGetPersonaById from "../../../hooks/personas/useGetPersonaById";

interface PersonaDetailModalProps {
  persona: IPersona | null;
  onClose: () => void;
}

const columnHelper = createColumnHelper<IExpediente>();

const expedienteColumns = [
  columnHelper.accessor("clave", { header: "Clave" }),
  columnHelper.accessor("caratula", { header: "Carátula" }),
  columnHelper.accessor("ciudad", { header: "Ciudad" }),
  columnHelper.accessor("organismo.nombre", { header: "Organismo" }),
  columnHelper.accessor("tipo_vinculo.descripcion", { header: "Tipo de Vinculo" }),
];

export const PersonaDetailModal = ({
  persona,
  onClose,
}: PersonaDetailModalProps) => {
  const { data, isLoading, error } = useGetPersonaById(persona.id);

  return (
    <Modal
      open={persona !== null}
      onCancel={onClose}
      footer={null}
      title="Detalle de Persona"
      width={800}
      destroyOnHidden
    >
      {isLoading && (
        <div className="flex justify-center py-10">
          <Spin size="large" />
        </div>
      )}

      {error && (
        <Alert
          type="error"
          description={error.message}
        />
      )}

      {data && (
        <div className="flex flex-col gap-6">
          <Descriptions bordered column={2} size="small">
            <Descriptions.Item label="ID">{data.id}</Descriptions.Item>
            <Descriptions.Item label="DNI">{data.dni}</Descriptions.Item>
            <Descriptions.Item label="Nombre">{data.nombre}</Descriptions.Item>
            <Descriptions.Item label="Apellido">
              {data.apellido}
            </Descriptions.Item>
          </Descriptions>

          <div>
            <h3 className="mb-3 text-base font-semibold">Expedientes</h3>
            <TanstackDataTable
              data={data.expedientes ?? []}
              columns={expedienteColumns}
            />
          </div>
        </div>
      )}
    </Modal>
  );
};
