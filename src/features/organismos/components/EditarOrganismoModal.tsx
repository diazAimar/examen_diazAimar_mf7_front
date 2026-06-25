import { Alert, Modal, Spin } from "antd";
import useGetOrganismoById from "../../../hooks/organismos/useGetOrganismoById";
import EditarOrganismoForm from "../forms/EditarOrganismoForm";

interface EditarOrganismoModalProps {
  editarOrganismoModalIsOpen: boolean;
  onClose: () => void;
  organismo: IOrganismo | null;
}

const EditarOrganismoModal = ({
  editarOrganismoModalIsOpen,
  onClose,
  organismo,
}: EditarOrganismoModalProps) => {
  const { data, isLoading, error } = useGetOrganismoById(organismo?.id ?? null);

  return (
    <Modal
      open={editarOrganismoModalIsOpen}
      onCancel={onClose}
      footer={null}
      title="Editar Organismo"
      width={480}
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
          <EditarOrganismoForm organismo={data} onSuccess={onClose} />
        </div>
      )}
    </Modal>
  );
};

export default EditarOrganismoModal;
