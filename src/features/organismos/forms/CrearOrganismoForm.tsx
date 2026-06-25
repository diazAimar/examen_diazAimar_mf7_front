import { Button, Input, Form } from "antd";
import { useForm, Controller } from "react-hook-form";
import useCreateOrganismo from "../../../hooks/organismos/useCreateOrganismo";
import { handleValidationErrors } from "../../../utils/handleValidationErrors";
import type { AxiosError } from "axios";
import type { ApiResponse } from "../../../interfaces/api-response";

interface CrearOrganismoFormProps {
  onSuccess: () => void;
}

interface CrearOrganismoFormValues {
  nombre: string;
  caratula: string;
  ciudad: string;
  fuero: string;
}

const CrearOrganismoForm = ({ onSuccess }: CrearOrganismoFormProps) => {
  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<CrearOrganismoFormValues>();

  const { mutate, isPending } = useCreateOrganismo();

  const onSubmit = (values: CrearOrganismoFormValues) => {
    mutate(values, {
      onSuccess: () => {
        reset();
        onSuccess();
      },
      onError: (error) => {
        handleValidationErrors(
          error as AxiosError<ApiResponse<null>>,
          setError,
        );
      },
    });
  };

  return (
    <Form
      layout="vertical"
      className="flex flex-col"
      onFinish={() => handleSubmit(onSubmit)()}
    >
      <Form.Item
        label="Nombre"
        validateStatus={errors.nombre ? "error" : ""}
        help={errors.nombre?.message}
      >
        <Controller
          name="nombre"
          control={control}
          rules={{ required: "El nombre es requerido" }}
          render={({ field }) => (
            <Input {...field} placeholder="Ej: Juzgado Civil Neuquén" />
          )}
        />
      </Form.Item>

      <Form.Item
        label="Carátula"
        validateStatus={errors.caratula ? "error" : ""}
        help={errors.caratula?.message}
      >
        <Controller
          name="caratula"
          control={control}
          rules={{ required: "La carátula es requerida" }}
          render={({ field }) => (
            <Input {...field} placeholder="Ej: Juzgado Civil Neuquén" />
          )}
        />
      </Form.Item>

      <Form.Item
        label="Ciudad"
        validateStatus={errors.ciudad ? "error" : ""}
        help={errors.ciudad?.message}
      >
        <Controller
          name="ciudad"
          control={control}
          rules={{ required: "La ciudad es requerida" }}
          render={({ field }) => (
            <Input {...field} placeholder="Ej: Neuquén" />
          )}
        />
      </Form.Item>

      <Form.Item
        label="Fuero"
        validateStatus={errors.fuero ? "error" : ""}
        help={errors.fuero?.message}
      >
        <Controller
          name="fuero"
          control={control}
          rules={{ required: "El fuero es requerido" }}
          render={({ field }) => (
            <Input {...field} placeholder="Ej: Civil" />
          )}
        />
      </Form.Item>

      <div className="flex justify-end">
        <Button type="primary" htmlType="submit" loading={isPending}>
          Crear Organismo
        </Button>
      </div>
    </Form>
  );
};

export default CrearOrganismoForm;
