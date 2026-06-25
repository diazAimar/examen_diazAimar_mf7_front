import { Modal, Descriptions, Spin, Alert } from "antd";
import useGetOrganismoById from "../../../hooks/organismos/useGetOrganismoById";

interface OrganismoDetailModalProps {
  organismo: IOrganismo | null;
  onClose: () => void;
}

export const OrganismoDetailModal = ({
  organismo,
  onClose,
}: OrganismoDetailModalProps) => {
  const { data, isLoading, error } = useGetOrganismoById(organismo?.id ?? null);

  return (
    <Modal
      open={organismo !== null}
      onCancel={onClose}
      footer={null}
      title="Detalle de Organismo"
      width={600}
      destroyOnHidden
    >
      {isLoading && (
        <div className="flex justify-center py-10">
          <Spin size="large" />
        </div>
      )}

      {error && <Alert type="error" description={error.message} />}

      {data && (
        <Descriptions bordered column={2} size="small" className="mt-4">
          <Descriptions.Item label="ID">{data.id}</Descriptions.Item>
          <Descriptions.Item label="Código">{data.codigo}</Descriptions.Item>
          <Descriptions.Item label="Nombre" span={2}>
            {data.nombre}
          </Descriptions.Item>
          <Descriptions.Item label="Carátula" span={2}>
            {data.caratula}
          </Descriptions.Item>
          <Descriptions.Item label="Ciudad">{data.ciudad}</Descriptions.Item>
          <Descriptions.Item label="Fuero">{data.fuero}</Descriptions.Item>
          <Descriptions.Item label="Creado el">
            {new Date(data.created_at).toLocaleString("es-AR")}
          </Descriptions.Item>
          <Descriptions.Item label="Actualizado el">
            {new Date(data.updated_at).toLocaleString("es-AR")}
          </Descriptions.Item>
        </Descriptions>
      )}
    </Modal>
  );
};
