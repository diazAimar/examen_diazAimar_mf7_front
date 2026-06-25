import { Alert, Modal, Spin } from "antd";
import useGetExpedienteById from "../../../hooks/expedientes/useGetExpedienteById";
import EditarExpedienteForm from "../forms/EditarExpedienteForm";

interface EditarExpedienteModalProps {
  editarExpedienteModalIsOpen: boolean;
  onClose: () => void;
  expedienteId: number | null;
}

const EditarExpedienteModal = ({
  editarExpedienteModalIsOpen,
  onClose,
  expedienteId,
}: EditarExpedienteModalProps) => {
  const { data, isLoading, error } = useGetExpedienteById(expedienteId);

  return (
    <Modal
      open={editarExpedienteModalIsOpen}
      onCancel={onClose}
      footer={null}
      title="Editar Expediente"
      width={680}
      destroyOnHidden
    >
      {isLoading && (
        <div className="flex justify-center py-10">
          <Spin size="large" />
        </div>
      )}

      {error && <Alert type="error" description={error.message} />}

      {data && (
        <div className="mt-4">
          <EditarExpedienteForm expediente={data} onSuccess={onClose} />
        </div>
      )}
    </Modal>
  );
};

export default EditarExpedienteModal;
