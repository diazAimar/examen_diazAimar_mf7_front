import { Modal } from "antd";
import CrearExpedienteForm from "../forms/CrearExpedienteForm";

interface CrearExpedienteModalProps {
  crearExpedienteModalIsOpen: boolean;
  onClose: () => void;
}

const CrearExpedienteModal = ({
  crearExpedienteModalIsOpen,
  onClose,
}: CrearExpedienteModalProps) => {
  return (
    <Modal
      open={crearExpedienteModalIsOpen}
      onCancel={onClose}
      footer={null}
      title="Crear Expediente"
      width={680}
      destroyOnHidden
    >
      <div className="mt-4">
        <CrearExpedienteForm onSuccess={onClose} />
      </div>
    </Modal>
  );
};

export default CrearExpedienteModal;
