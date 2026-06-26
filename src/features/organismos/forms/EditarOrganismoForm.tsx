import { Button, Input, Form, Select } from "antd";
import { useForm, Controller } from "react-hook-form";
import { handleValidationErrors } from "../../../utils/handleValidationErrors";
import type { AxiosError } from "axios";
import type { ApiResponse } from "../../../interfaces/api-response";
import useEditOrganismo from "../../../hooks/organismos/useEditOrganismo";

interface EditarOrganismoFormProps {
  onSuccess: () => void;
  organismo: IOrganismo;
}

interface EditarOrganismoFormValues {
  nombre: string;
  caratula: string;
  ciudad: string;
  fuero: string;
}

const EditarOrganismoForm = ({ onSuccess, organismo }: EditarOrganismoFormProps) => {
  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<EditarOrganismoFormValues>({
    defaultValues: {
      nombre: organismo.nombre,
      caratula: organismo.caratula,
      ciudad: organismo.ciudad,
      fuero: organismo.fuero,
    },
  });

  const { mutate, isPending } = useEditOrganismo();

  const onSubmit = (values: EditarOrganismoFormValues) => {
    mutate(
      { id: organismo.id, ...values },
      {
        onSuccess: () => {
          reset();
          onSuccess();
        },
        onError: (error) => {
          handleValidationErrors(error as AxiosError<ApiResponse<null>>, setError);
        },
      }
    );
  };

  return (
    <Form layout="vertical" className="flex flex-col" onFinish={() => handleSubmit(onSubmit)()}>
      <Form.Item label="Nombre" validateStatus={errors.nombre ? "error" : ""} help={errors.nombre?.message}>
        <Controller
          name="nombre"
          control={control}
          rules={{ required: "El nombre es requerido" }}
          render={({ field }) => <Input {...field} placeholder="Ej: Juzgado Civil Neuquén" />}
        />
      </Form.Item>

      <Form.Item label="Carátula" validateStatus={errors.caratula ? "error" : ""} help={errors.caratula?.message}>
        <Controller
          name="caratula"
          control={control}
          rules={{ required: "La carátula es requerida" }}
          render={({ field }) => <Input {...field} placeholder="Ej: Juzgado Civil Neuquén" />}
        />
      </Form.Item>

      <Form.Item label="Ciudad" validateStatus={errors.ciudad ? "error" : ""} help={errors.ciudad?.message}>
        <Controller
          name="ciudad"
          control={control}
          rules={{ required: "La ciudad es requerida" }}
          render={({ field }) => (
            <Select
              {...field}
              defaultValue={organismo.ciudad}
              onChange={field.onChange}
              options={[
                { value: "Neuquén", label: "Neuquén" },
                { value: "Zapala", label: "Zapala" },
                { value: "Junín de los Andes", label: "Junín de los Andes" },
              ]}
            />
          )}
        />
      </Form.Item>

      <Form.Item label="Fuero" validateStatus={errors.fuero ? "error" : ""} help={errors.fuero?.message}>
        <Controller
          name="fuero"
          control={control}
          rules={{ required: "El fuero es requerido" }}
          render={({ field }) => (
            <Select
              {...field}
              defaultValue={organismo.fuero}
              onChange={field.onChange}
              options={[
                { value: "Ejecutivos", label: "Ejecutivos" },
                { value: "Civil", label: "Civil" },
                { value: "Laboral", label: "Laboral" },
                { value: "Familia", label: "Familia" },
              ]}
            />
          )}
        />
      </Form.Item>

      <div className="flex justify-end">
        <Button type="primary" htmlType="submit" loading={isPending}>
          Editar Organismo
        </Button>
      </div>
    </Form>
  );
};

export default EditarOrganismoForm;
