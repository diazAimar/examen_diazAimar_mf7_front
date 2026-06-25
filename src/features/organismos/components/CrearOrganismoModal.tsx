import { Modal } from "antd";
import CrearOrganismoForm from "../forms/CrearOrganismoForm";

interface CrearOrganismoModalProps {
  crearOrganismoModalIsOpen: boolean;
  onClose: () => void;
}

const CrearOrganismoModal = ({
  crearOrganismoModalIsOpen,
  onClose,
}: CrearOrganismoModalProps) => {
  return (
    <Modal
      open={crearOrganismoModalIsOpen}
      onCancel={onClose}
      footer={null}
      title="Crear Organismo"
      width={480}
      destroyOnHidden
    >
      <div className="mt-4">
        <CrearOrganismoForm onSuccess={onClose} />
      </div>
    </Modal>
  );
};

export default CrearOrganismoModal;
