import { Button, Divider, Form, Input, InputNumber, Select } from "antd";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { PlusIcon, TrashIcon } from "@phosphor-icons/react";
import useCreateExpediente from "../../../hooks/expedientes/useCreateExpediente";
import useGetOrganismos from "../../../hooks/organismos/useGetOrganismos";
import useGetTiposVinculo from "../../../hooks/tipos-vinculo/useGetTiposVinculo";
import { handleValidationErrors } from "../../../utils/handleValidationErrors";
import type { AxiosError } from "axios";
import type { ApiResponse } from "../../../interfaces/api-response";

interface CrearExpedienteFormProps {
  onSuccess: () => void;
}

interface PersonaFormValues {
  dni: string;
  nombre: string;
  apellido: string;
  tipo_vinculo: number | null;
}

interface CrearExpedienteFormValues {
  organismo_id: number | null;
  tipo: string;
  numero: number | null;
  anno: number | null;
  caratula: string;
  ciudad: string;
  actor: {
    dni: string;
    nombre: string;
    apellido: string;
  };
  personas: PersonaFormValues[];
}

const CIUDADES = [
  { value: "Neuquén", label: "Neuquén" },
  { value: "Zapala", label: "Zapala" },
  { value: "Junín de los Andes", label: "Junín de los Andes" },
];

const TIPOS_EXPEDIENTE = [
  { value: "EXP", label: "EXP - Expediente" },
  { value: "LEG", label: "LEG - Legajo" },
];

const CrearExpedienteForm = ({ onSuccess }: CrearExpedienteFormProps) => {
  const {
    control,
    handleSubmit,
    setError,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CrearExpedienteFormValues>({
    defaultValues: {
      organismo_id: null,
      tipo: undefined,
      numero: null,
      anno: null,
      caratula: "",
      ciudad: undefined,
      actor: { dni: "", nombre: "", apellido: "" },
      personas: [{ dni: "", nombre: "", apellido: "", tipo_vinculo: null }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "personas",
  });

  const { data: organismos = [] } = useGetOrganismos();
  const { data: tiposVinculo = [] } = useGetTiposVinculo();
  const { mutate, isPending } = useCreateExpediente();

  const tiposVinculoOptions = tiposVinculo
    .filter((tv) => tv.id !== 1)
    .map((tv) => ({ value: tv.id, label: tv.descripcion }));

  const organismoId = watch("organismo_id");

  const handleOrganismoChange = (id: number) => {
    setValue("organismo_id", id);
    const organismo = organismos.find((o) => o.id === id);
    if (organismo) {
      setValue("ciudad", organismo.ciudad);
    }
  };

  const onSubmit = (values: CrearExpedienteFormValues) => {
    if (
      !values.organismo_id ||
      !values.numero ||
      !values.anno
    ) return;

    mutate(
      {
        organismo_id: values.organismo_id,
        tipo: values.tipo,
        numero: values.numero,
        anno: values.anno,
        caratula: values.caratula,
        ciudad: values.ciudad,
        actor: {
          dni: Number(values.actor.dni),
          nombre: values.actor.nombre,
          apellido: values.actor.apellido,
        },
        personas: values.personas.map((p) => ({
          dni: Number(p.dni),
          nombre: p.nombre,
          apellido: p.apellido,
          tipo_vinculo: p.tipo_vinculo!,
        })),
      },
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
    >
      <div className="grid grid-cols-2 gap-x-4">
        <Form.Item
          label="Organismo"
          className="col-span-2"
          validateStatus={errors.organismo_id ? "error" : ""}
          help={errors.organismo_id?.message}
        >
          <Controller
            name="organismo_id"
            control={control}
            rules={{ required: "El organismo es requerido" }}
            render={({ field }) => (
              <Select
                {...field}
                showSearch
                optionFilterProp="label"
                placeholder="Seleccionar organismo"
                onChange={handleOrganismoChange}
                options={organismos.map((o) => ({
                  value: o.id,
                  label: `${o.codigo} — ${o.nombre}`,
                }))}
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Tipo"
          validateStatus={errors.tipo ? "error" : ""}
          help={errors.tipo?.message}
        >
          <Controller
            name="tipo"
            control={control}
            rules={{ required: "El tipo es requerido" }}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Tipo"
                options={TIPOS_EXPEDIENTE}
              />
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
              <Select
                {...field}
                placeholder="Ciudad"
                disabled={!!organismoId}
                options={CIUDADES}
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Número"
          validateStatus={errors.numero ? "error" : ""}
          help={errors.numero?.message}
        >
          <Controller
            name="numero"
            control={control}
            rules={{ required: "El número es requerido" }}
            render={({ field }) => (
              <InputNumber
                {...field}
                min={1}
                className="w-full"
                placeholder="Ej: 150"
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Año"
          validateStatus={errors.anno ? "error" : ""}
          help={errors.anno?.message}
        >
          <Controller
            name="anno"
            control={control}
            rules={{ required: "El año es requerido" }}
            render={({ field }) => (
              <InputNumber
                {...field}
                min={1900}
                max={2100}
                className="w-full"
                placeholder="Ej: 2025"
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Carátula"
          className="col-span-2"
          validateStatus={errors.caratula ? "error" : ""}
          help={errors.caratula?.message}
        >
          <Controller
            name="caratula"
            control={control}
            rules={{ required: "La carátula es requerida" }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Ej: Pérez c/ García s/ Daños y Perjuicios"
              />
            )}
          />
        </Form.Item>
      </div>

      <Divider orientation="left" className="!mt-0">
        Actor (Parte Actora)
      </Divider>

      <div className="grid grid-cols-3 gap-x-4">
        <Form.Item
          label="DNI"
          validateStatus={errors.actor?.dni ? "error" : ""}
          help={errors.actor?.dni?.message}
        >
          <Controller
            name="actor.dni"
            control={control}
            rules={{ required: "El DNI es requerido" }}
            render={({ field }) => (
              <Input {...field} placeholder="Ej: 30123456" />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Nombre"
          validateStatus={errors.actor?.nombre ? "error" : ""}
          help={errors.actor?.nombre?.message}
        >
          <Controller
            name="actor.nombre"
            control={control}
            rules={{ required: "El nombre es requerido" }}
            render={({ field }) => (
              <Input {...field} placeholder="Ej: Juan" />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Apellido"
          validateStatus={errors.actor?.apellido ? "error" : ""}
          help={errors.actor?.apellido?.message}
        >
          <Controller
            name="actor.apellido"
            control={control}
            rules={{ required: "El apellido es requerido" }}
            render={({ field }) => (
              <Input {...field} placeholder="Ej: Pérez" />
            )}
          />
        </Form.Item>
      </div>

      <Divider orientation="left" className="!mt-0">
        Personas Vinculadas
      </Divider>

      <div className="flex flex-col gap-3">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="rounded-lg border border-default-200 p-3"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-foreground/70">
                Persona {index + 1}
              </span>
              {fields.length > 1 && (
                <Button
                  type="text"
                  danger
                  size="small"
                  icon={<TrashIcon size="1rem" />}
                  onClick={() => remove(index)}
                />
              )}
            </div>

            <div className="grid grid-cols-2 gap-x-4">
              <Form.Item
                label="DNI"
                validateStatus={
                  errors.personas?.[index]?.dni ? "error" : ""
                }
                help={errors.personas?.[index]?.dni?.message}
              >
                <Controller
                  name={`personas.${index}.dni`}
                  control={control}
                  rules={{ required: "El DNI es requerido" }}
                  render={({ field: f }) => (
                    <Input {...f} placeholder="Ej: 28987654" />
                  )}
                />
              </Form.Item>

              <Form.Item
                label="Tipo de Vínculo"
                validateStatus={
                  errors.personas?.[index]?.tipo_vinculo ? "error" : ""
                }
                help={errors.personas?.[index]?.tipo_vinculo?.message}
              >
                <Controller
                  name={`personas.${index}.tipo_vinculo`}
                  control={control}
                  rules={{ required: "El tipo de vínculo es requerido" }}
                  render={({ field: f }) => (
                    <Select
                      {...f}
                      placeholder="Vínculo"
                      options={tiposVinculoOptions}
                    />
                  )}
                />
              </Form.Item>

              <Form.Item
                label="Nombre"
                validateStatus={
                  errors.personas?.[index]?.nombre ? "error" : ""
                }
                help={errors.personas?.[index]?.nombre?.message}
              >
                <Controller
                  name={`personas.${index}.nombre`}
                  control={control}
                  rules={{ required: "El nombre es requerido" }}
                  render={({ field: f }) => (
                    <Input {...f} placeholder="Ej: María" />
                  )}
                />
              </Form.Item>

              <Form.Item
                label="Apellido"
                validateStatus={
                  errors.personas?.[index]?.apellido ? "error" : ""
                }
                help={errors.personas?.[index]?.apellido?.message}
              >
                <Controller
                  name={`personas.${index}.apellido`}
                  control={control}
                  rules={{ required: "El apellido es requerido" }}
                  render={({ field: f }) => (
                    <Input {...f} placeholder="Ej: García" />
                  )}
                />
              </Form.Item>
            </div>
          </div>
        ))}

        <Button
          type="dashed"
          icon={<PlusIcon size="1rem" />}
          onClick={() =>
            append({ dni: "", nombre: "", apellido: "", tipo_vinculo: null })
          }
        >
          Agregar persona
        </Button>
      </div>

      <div className="mt-4 flex justify-end">
        <Button type="primary" htmlType="submit" loading={isPending}>
          Crear Expediente
        </Button>
      </div>
    </Form>
  );
};

export default CrearExpedienteForm;
