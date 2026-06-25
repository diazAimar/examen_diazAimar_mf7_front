import { Button, Input, Form, InputNumber } from "antd";
import { useForm, Controller } from "react-hook-form";
import useCreatePersona from "../../../hooks/personas/useCreatePersona";
import { handleValidationErrors } from "../../../utils/handleValidationErrors";
import type { AxiosError } from "axios";
import type { ApiResponse } from "../../../interfaces/api-response";
import useEditPersona from "../../../hooks/personas/useEditPersona";

interface EditarPersonaFormProps {
  onSuccess: () => void;
  persona: IPersona;
}

interface EditarPersonaFormValues {
  id: number;
  dni: string;
  nombre: string;
  apellido: string;
}

const EditarPersonaForm = ({ onSuccess, persona }: EditarPersonaFormProps) => {
  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<EditarPersonaFormValues>({
    defaultValues: {
      id: persona.id,
      dni: persona.dni,
      nombre: persona.nombre,
      apellido: persona.apellido,
    },
  });

  const { mutate, isPending } = useEditPersona();

  const onSubmit = (values: EditarPersonaFormValues) => {
    mutate(
      { id: persona.id, ...values },
      {
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
      },
    );
  };

  return (
    <Form
      layout="vertical"
      className="flex flex-col"
      onFinish={() => handleSubmit(onSubmit)()}
      initialValues={{
        dni: persona.dni,
        nombre: persona.nombre,
        apellido: persona.apellido,
      }}
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
            <InputNumber {...field} placeholder="Ej: 41092025" className="w-full!" />
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
          Editar Persona
        </Button>
      </div>
    </Form>
  );
};

export default EditarPersonaForm;
