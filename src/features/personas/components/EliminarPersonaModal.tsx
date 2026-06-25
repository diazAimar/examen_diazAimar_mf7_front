import { Button, Modal, Spin } from "antd";
import useDeletePersonaById from "../../../hooks/personas/useDeletePersonaById";

interface EliminarPersonaModalProps {
  eliminarPersonaModalIsOpen: boolean;
  onClose: () => void;
  persona: IPersona | null;
}

const EliminarPersonaModal = ({
  eliminarPersonaModalIsOpen,
  onClose,
  persona,
}: EliminarPersonaModalProps) => {
  const { mutateAsync: deletePersonaById, isPending } = useDeletePersonaById();

  const handleDeletePersona = async () => {
    if (persona?.id) {
      await deletePersonaById(persona.id);
      onClose();
    }
  };

  return (
    <Modal
      open={eliminarPersonaModalIsOpen}
      onCancel={onClose}
      footer={null}
      title="Eliminar Persona"
      width={400}
      destroyOnHidden
    >
      <div className="flex flex-col gap-6">
        <p>
          ¿Estás seguro de querer eliminar a la persona{" "}
          <strong>
            {persona?.nombre} {persona?.apellido}
          </strong>
          ?
        </p>
        <div className="flex justify-end space-x-2">
          <Button type="primary" onClick={() => onClose()}>
            Cancelar
          </Button>
          <Button
            type="primary"
            disabled={isPending}
            danger
            onClick={handleDeletePersona}
          >
            {isPending ? <Spin size="small" /> : "Eliminar"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default EliminarPersonaModal;
