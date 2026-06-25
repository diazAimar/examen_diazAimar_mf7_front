import { Button, Modal, Spin } from "antd";
import useRestorePersona from "../../../hooks/personas/useRestorePersona";

interface RestaurarPersonaModalProps {
  restaurarPersonaModalIsOpen: boolean;
  onClose: () => void;
  persona: IPersona | null;
}

const RestaurarPersonaModal = ({
  restaurarPersonaModalIsOpen,
  onClose,
  persona,
}: RestaurarPersonaModalProps) => {
  const { mutateAsync: restorePersona, isPending } = useRestorePersona();

  const handleRestore = async () => {
    if (persona?.id) {
      await restorePersona(persona.id);
      onClose();
    }
  };

  return (
    <Modal
      open={restaurarPersonaModalIsOpen}
      onCancel={onClose}
      footer={null}
      title="Restaurar Persona"
      width={400}
      destroyOnHidden
    >
      <div className="flex flex-col gap-6">
        <p>
          ¿Estás seguro de querer restaurar a la persona{" "}
          <strong>
            {persona?.nombre} {persona?.apellido}
          </strong>
          ?
        </p>
        <div className="flex justify-end space-x-2">
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="primary" loading={isPending} onClick={handleRestore}>
            {isPending ? <Spin size="small" /> : "Restaurar"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default RestaurarPersonaModal;
