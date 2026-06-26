import { Button, Modal, Spin } from "antd";
import useRestoreOrganismo from "../../../hooks/organismos/useRestoreOrganismo";

interface RestaurarOrganismoModalProps {
  restaurarOrganismoModalIsOpen: boolean;
  onClose: () => void;
  organismo: IOrganismo | null;
}

const RestaurarOrganismoModal = ({
  restaurarOrganismoModalIsOpen,
  onClose,
  organismo,
}: RestaurarOrganismoModalProps) => {
  const { mutateAsync: restoreOrganismo, isPending } = useRestoreOrganismo();

  const handleRestore = async () => {
    if (organismo?.id) {
      await restoreOrganismo(organismo.id);
      onClose();
    }
  };

  return (
    <Modal
      open={restaurarOrganismoModalIsOpen}
      onCancel={onClose}
      footer={null}
      title="Restaurar Organismo"
      width={400}
      destroyOnHidden
    >
      <div className="flex flex-col gap-6">
        <p>
          ¿Estás seguro de querer restaurar el organismo{" "}
          <strong>{organismo?.nombre}</strong>?
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

export default RestaurarOrganismoModal;
