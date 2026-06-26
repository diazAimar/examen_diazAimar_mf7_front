import { useState } from "react";
import { Alert, Button, Modal, Spin } from "antd";
import axios from "axios";
import useRestoreExpediente from "../../../hooks/expedientes/useRestoreExpediente";
import type { ApiResponse } from "../../../interfaces/api-response";

interface RestaurarExpedienteModalProps {
  restaurarExpedienteModalIsOpen: boolean;
  onClose: () => void;
  expediente: IExpediente | null;
}

const RestaurarExpedienteModal = ({
  restaurarExpedienteModalIsOpen,
  onClose,
  expediente,
}: RestaurarExpedienteModalProps) => {
  const { mutateAsync: restoreExpediente, isPending } = useRestoreExpediente();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleRestore = async () => {
    if (!expediente?.id) return;
    setErrorMessage(null);
    try {
      await restoreExpediente(expediente.id);
      onClose();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const data = err.response?.data as ApiResponse | undefined;
        if (typeof data?.error === "string") {
          setErrorMessage(data.error);
          return;
        }
      }
      setErrorMessage("Ocurrió un error inesperado. Intente nuevamente.");
    }
  };

  return (
    <Modal
      open={restaurarExpedienteModalIsOpen}
      onCancel={() => { setErrorMessage(null); onClose(); }}
      footer={null}
      title="Restaurar Expediente"
      width={450}
      destroyOnHidden
    >
      <div className="flex flex-col gap-6">
        <p>
          ¿Estás seguro de querer restaurar el expediente{" "}
          <strong>{expediente?.clave}</strong>?
        </p>
        {errorMessage && (
          <Alert type="error" message={errorMessage} showIcon />
        )}
        <div className="flex justify-end space-x-2">
          <Button onClick={() => { setErrorMessage(null); onClose(); }}>
            Cancelar
          </Button>
          <Button type="primary" loading={isPending} onClick={handleRestore}>
            {isPending ? <Spin size="small" /> : "Restaurar"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default RestaurarExpedienteModal;
