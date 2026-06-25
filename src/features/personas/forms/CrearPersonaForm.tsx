import { Button, Input, Form, InputNumber } from "antd";
import { useForm, Controller } from "react-hook-form";
import useCreatePersona from "../../../hooks/personas/useCreatePersona";
import { handleValidationErrors } from "../../../utils/handleValidationErrors";
import type { AxiosError } from "axios";
import type { ApiResponse } from "../../../interfaces/api-response";

interface CrearPersonaFormProps {
  onSuccess: () => void;
}

interface CrearPersonaFormValues {
  dni: string;
  nombre: string;
  apellido: string;
}

const CrearPersonaForm = ({ onSuccess }: CrearPersonaFormProps) => {
  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<CrearPersonaFormValues>();

  const { mutate, isPending } = useCreatePersona();

  const onSubmit = (values: CrearPersonaFormValues) => {
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
        label="DNI"
        validateStatus={errors.dni ? "error" : ""}
        help={errors.dni?.message}
      >
        <Controller
          name="dni"
          control={control}
          rules={{ required: "El DNI es requerido" }}
          render={({ field }) => (
            <InputNumber
              {...field}
              placeholder="Ej: 41092025"
              className="w-full!"
              min={1000000}
              max={99999999}
            />
          )}
        />
      </Form.Item>

      <Form.Item
        label="Nombre"
        validateStatus={errors.nombre ? "error" : ""}
        help={errors.nombre?.message}
      >
        <Controller
          name="nombre"
          control={control}
          rules={{ required: "El nombre es requerido" }}
          render={({ field }) => <Input {...field} placeholder="Ej: John" />}
        />
      </Form.Item>

      <Form.Item
        label="Apellido"
        validateStatus={errors.apellido ? "error" : ""}
        help={errors.apellido?.message}
      >
        <Controller
          name="apellido"
          control={control}
          rules={{ required: "El apellido es requerido" }}
          render={({ field }) => <Input {...field} placeholder="Ej: Doe" />}
        />
      </Form.Item>

      <div className="flex justify-end">
        <Button type="primary" htmlType="submit" loading={isPending}>
          Crear Persona
        </Button>
      </div>
    </Form>
  );
};

export default CrearPersonaForm;
