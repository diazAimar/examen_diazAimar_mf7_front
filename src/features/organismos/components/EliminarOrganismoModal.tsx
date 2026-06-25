import { Button, Modal, Spin } from "antd";
import useDeleteOrganismoById from "../../../hooks/organismos/useDeleteOrganismoById";

interface EliminarOrganismoModalProps {
  eliminarOrganismoModalIsOpen: boolean;
  onClose: () => void;
  organismo: IOrganismo | null;
}

const EliminarOrganismoModal = ({
  eliminarOrganismoModalIsOpen,
  onClose,
  organismo,
}: EliminarOrganismoModalProps) => {
  const { mutateAsync: deleteOrganismoById, isPending } =
    useDeleteOrganismoById();

  const handleDeleteOrganismo = async () => {
    if (organismo?.id) {
      await deleteOrganismoById(organismo.id);
      onClose();
    }
  };

  return (
    <Modal
      open={eliminarOrganismoModalIsOpen}
      onCancel={onClose}
      footer={null}
      title="Eliminar Organismo"
      width={400}
      destroyOnHidden
    >
      <div className="flex flex-col gap-6">
        <p>
          ¿Estás seguro de querer eliminar el organismo{" "}
          <strong>{organismo?.nombre}</strong>?
        </p>
        <div className="flex justify-end space-x-2">
          <Button type="primary" onClick={() => onClose()}>
            Cancelar
          </Button>
          <Button
            type="primary"
            disabled={isPending}
            danger
            onClick={handleDeleteOrganismo}
          >
            {isPending ? <Spin size="small" /> : "Eliminar"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default EliminarOrganismoModal;
