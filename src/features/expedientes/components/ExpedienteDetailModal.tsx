import { Alert, Badge, Descriptions, Modal, Spin, Table, Tag } from "antd";
import useGetExpedienteById from "../../../hooks/expedientes/useGetExpedienteById";

interface ExpedienteDetailModalProps {
  expedienteId: number | null;
  onClose: () => void;
}

const VINCULO_COLORS: Record<string, string> = {
  ACTOR: "blue",
  DEMANDADO: "red",
  CONDENADO: "volcano",
  VICTIMA: "orange",
};

const ExpedienteDetailModal = ({
  expedienteId,
  onClose,
}: ExpedienteDetailModalProps) => {
  const { data, isLoading, error } = useGetExpedienteById(expedienteId);

  return (
    <Modal
      open={expedienteId !== null}
      onCancel={onClose}
      footer={null}
      title="Detalle de Expediente"
      width={720}
      destroyOnHidden
    >
      {isLoading && (
        <div className="flex justify-center py-10">
          <Spin size="large" />
        </div>
      )}

      {error && <Alert type="error" description={error.message} />}

      {data && (
        <div className="mt-4 flex flex-col gap-4">
          <Descriptions bordered column={2} size="small">
            <Descriptions.Item label="Clave" span={2}>
              <Badge
                status="processing"
                text={
                  <span className="font-mono font-semibold">{data.clave}</span>
                }
              />
            </Descriptions.Item>
            <Descriptions.Item label="Tipo">{data.tipo}</Descriptions.Item>
            <Descriptions.Item label="Número">{data.numero}</Descriptions.Item>
            <Descriptions.Item label="Año">{data.anno}</Descriptions.Item>
            <Descriptions.Item label="Ciudad">{data.ciudad}</Descriptions.Item>
            <Descriptions.Item label="Carátula" span={2}>
              {data.caratula}
            </Descriptions.Item>
            <Descriptions.Item label="Organismo" span={2}>
              {data.organismo.nombre}
            </Descriptions.Item>
            <Descriptions.Item label="Creado el">
              {new Date(data.created_at).toLocaleString("es-AR")}
            </Descriptions.Item>
            <Descriptions.Item label="Actualizado el">
              {new Date(data.updated_at).toLocaleString("es-AR")}
            </Descriptions.Item>
          </Descriptions>

          <div>
            <p className="mb-2 font-medium">Personas</p>
            <Table
              size="small"
              pagination={false}
              rowKey="id"
              dataSource={data.personas}
              columns={[
                { title: "DNI", dataIndex: "dni", key: "dni" },
                { title: "Nombre", dataIndex: "nombre", key: "nombre" },
                { title: "Apellido", dataIndex: "apellido", key: "apellido" },
                {
                  title: "Vínculo",
                  key: "tipo_vinculo",
                  render: (_: unknown, record: IExpedientePersona) => (
                    <Tag
                      color={
                        VINCULO_COLORS[record.tipo_vinculo.descripcion] ??
                        "default"
                      }
                    >
                      {record.tipo_vinculo.descripcion}
                    </Tag>
                  ),
                },
              ]}
            />
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ExpedienteDetailModal;
