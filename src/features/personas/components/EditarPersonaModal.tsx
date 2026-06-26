import { Alert, Modal, Spin } from "antd";
import useGetPersonaById from "../../../hooks/personas/useGetPersonaById";
import EditarPersonaForm from "../forms/EditarPersonaForm";

interface EditarPersonaModalProps {
  editarPersonaModalIsOpen: boolean;
  onClose: () => void;
  persona: IPersona;
}

const EditarPersonaModal = ({
  editarPersonaModalIsOpen,
  onClose,
  persona,
}: EditarPersonaModalProps) => {
  const { data, isLoading, error } = useGetPersonaById(persona.id);

  return (
    <Modal
      open={editarPersonaModalIsOpen}
      onCancel={onClose}
      footer={null}
      title="Editar Persona"
      width={420}
      destroyOnHidden
    >
      {isLoading && (
        <div className="flex justify-center py-10">
          <Spin size="large" />
        </div>
      )}

      {error && <Alert type="error" description={error.message} />}

      {data && (
        <div className="flex flex-col gap-6">
          <EditarPersonaForm persona={data} onSuccess={onClose} />
        </div>
      )}
    </Modal>
  );
};

export default EditarPersonaModal;
