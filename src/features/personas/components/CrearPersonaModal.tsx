import { Modal } from "antd";
import CrearPersonaForm from "../forms/CrearPersonaForm";

interface CrearPersonaModalProps {
  crearPersonaModalIsOpen: boolean;
  onClose: () => void;
}

const CrearPersonaModal = ({
  crearPersonaModalIsOpen,
  onClose,
}: CrearPersonaModalProps) => {
  return (
    <Modal
      open={crearPersonaModalIsOpen}
      onCancel={onClose}
      footer={null}
      title="Crear Persona"
      width={420}
      destroyOnHidden
    >
      <div className="mt-4">
        <CrearPersonaForm onSuccess={onClose} />
      </div>
    </Modal>
  );
};

export default CrearPersonaModal;
