import { Button, Modal, Spin } from "antd";
import useDeleteExpedienteById from "../../../hooks/expedientes/useDeleteExpedienteById";

interface EliminarExpedienteModalProps {
  eliminarExpedienteModalIsOpen: boolean;
  onClose: () => void;
  expediente: IExpediente | null;
}

const EliminarExpedienteModal = ({
  eliminarExpedienteModalIsOpen,
  onClose,
  expediente,
}: EliminarExpedienteModalProps) => {
  const { mutateAsync: deleteExpedienteById, isPending } =
    useDeleteExpedienteById();

  const handleDeleteExpediente = async () => {
    if (expediente?.id) {
      await deleteExpedienteById(expediente.id);
      onClose();
    }
  };

  return (
    <Modal
      open={eliminarExpedienteModalIsOpen}
      onCancel={onClose}
      footer={null}
      title="Eliminar Expediente"
      width={400}
      destroyOnHidden
    >
      <div className="flex flex-col gap-6">
        <p>
          ¿Estás seguro de querer eliminar el expediente{" "}
          <strong>{expediente?.clave}</strong>?
        </p>
        <div className="flex justify-end space-x-2">
          <Button type="primary" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            type="primary"
            disabled={isPending}
            danger
            onClick={handleDeleteExpediente}
          >
            {isPending ? <Spin size="small" /> : "Eliminar"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default EliminarExpedienteModal;
