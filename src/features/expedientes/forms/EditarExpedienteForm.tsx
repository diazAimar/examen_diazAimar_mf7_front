import { Button, Divider, Form, Input, InputNumber, Select } from "antd";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { PlusIcon, TrashIcon } from "@phosphor-icons/react";
import useEditExpediente from "../../../hooks/expedientes/useEditExpediente";
import useGetOrganismos from "../../../hooks/organismos/useGetOrganismos";
import useGetTiposVinculo from "../../../hooks/tipos-vinculo/useGetTiposVinculo";
import useGetPersonas from "../../../hooks/personas/useGetPersonas";
import { handleValidationErrors } from "../../../utils/handleValidationErrors";
import type { AxiosError } from "axios";
import type { ApiResponse } from "../../../interfaces/api-response";

interface EditarExpedienteFormProps {
  onSuccess: () => void;
  expediente: IExpedienteDetail;
}

interface PersonaVinculadaFormValues {
  persona_id: number | null;
  tipo_vinculo: number | null;
}

interface EditarExpedienteFormValues {
  organismo_id: number | null;
  tipo: string;
  numero: number | null;
  anno: number | null;
  caratula: string;
  ciudad: string;
  actor_id: number | null;
  personas: PersonaVinculadaFormValues[];
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

const EditarExpedienteForm = ({
  onSuccess,
  expediente,
}: EditarExpedienteFormProps) => {
  const actor = expediente.personas.find((p) => p.tipo_vinculo.id === 1);
  const otrasPersonas = expediente.personas.filter(
    (p) => p.tipo_vinculo.id !== 1,
  );

  const {
    control,
    handleSubmit,
    setError,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EditarExpedienteFormValues>({
    defaultValues: {
      organismo_id: expediente.organismo.id,
      tipo: expediente.tipo,
      numero: expediente.numero,
      anno: expediente.anno,
      caratula: expediente.caratula,
      ciudad: expediente.ciudad,
      actor_id: actor?.id ?? null,
      personas: otrasPersonas.map((p) => ({
        persona_id: p.id,
        tipo_vinculo: p.tipo_vinculo.id,
      })),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "personas",
  });

  const { data: organismos = [] } = useGetOrganismos();
  const { data: todasPersonas = [] } = useGetPersonas();
  const { data: tiposVinculo = [] } = useGetTiposVinculo();
  const { mutate, isPending } = useEditExpediente();

  const organismoId = watch("organismo_id");
  const actorId = watch("actor_id");
  const personasValues = watch("personas");

  const activeOrganismos = organismos.filter((o) => !o.deleted_at);
  const activePersonas = todasPersonas.filter((p) => !p.deleted_at);

  const tiposVinculoOptions = tiposVinculo
    .filter((tv) => tv.id !== 1)
    .map((tv) => ({ value: tv.id, label: tv.descripcion }));

  const allSelectedIds = [
    actorId,
    ...personasValues.map((p) => p.persona_id),
  ].filter((id): id is number => id !== null);

  const buildPersonaOptions = (currentRowId: number | null) =>
    activePersonas.map((p) => ({
      value: p.id,
      label: `${p.apellido}, ${p.nombre} — DNI: ${p.dni}`,
      disabled: allSelectedIds.includes(p.id) && p.id !== currentRowId,
    }));

  const handleOrganismoChange = (id: number) => {
    setValue("organismo_id", id);
    const organismo = activeOrganismos.find((o) => o.id === id);
    if (organismo) setValue("ciudad", organismo.ciudad);
  };

  const onSubmit = (values: EditarExpedienteFormValues) => {
    if (!values.organismo_id || !values.numero || !values.anno || !values.actor_id)
      return;

    const actorPersona = activePersonas.find((p) => p.id === values.actor_id);
    if (!actorPersona) return;

    const personasResolved = values.personas
      .filter((p) => p.persona_id !== null && p.tipo_vinculo !== null)
      .map((p) => {
        const persona = activePersonas.find((ap) => ap.id === p.persona_id)!;
        return {
          dni: Number(persona.dni),
          nombre: persona.nombre,
          apellido: persona.apellido,
          tipo_vinculo: p.tipo_vinculo!,
        };
      });

    mutate(
      {
        id: expediente.id,
        organismo_id: values.organismo_id,
        tipo: values.tipo,
        numero: values.numero,
        anno: values.anno,
        caratula: values.caratula,
        ciudad: values.ciudad,
        actor: {
          dni: Number(actorPersona.dni),
          nombre: actorPersona.nombre,
          apellido: actorPersona.apellido,
        },
        personas: personasResolved,
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
                options={activeOrganismos.map((o) => ({
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
              <Select {...field} placeholder="Tipo" options={TIPOS_EXPEDIENTE} />
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

      <Divider titlePlacement="start" className="!mt-0">
        Actor (Parte Actora)
      </Divider>

      <Form.Item
        validateStatus={errors.actor_id ? "error" : ""}
        help={errors.actor_id?.message}
      >
        <Controller
          name="actor_id"
          control={control}
          rules={{ required: "El actor es requerido" }}
          render={({ field }) => (
            <Select
              {...field}
              showSearch
              optionFilterProp="label"
              placeholder="Seleccionar actor"
              options={buildPersonaOptions(actorId)}
            />
          )}
        />
      </Form.Item>

      <Divider titlePlacement="start" className="!mt-0">
        Personas Vinculadas
      </Divider>

      <div className="flex flex-col gap-3">
        {fields.map((field, index) => {
          const currentPersonaId = personasValues[index]?.persona_id ?? null;
          return (
            <div
              key={field.id}
              className="rounded-lg border border-default-200 p-3"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-foreground/70">
                  Persona {index + 1}
                </span>
                <Button
                  type="text"
                  danger
                  size="small"
                  icon={<TrashIcon size="1rem" />}
                  onClick={() => remove(index)}
                />
              </div>

              <div className="grid grid-cols-2 gap-x-4">
                <Form.Item
                  label="Persona"
                  validateStatus={
                    errors.personas?.[index]?.persona_id ? "error" : ""
                  }
                  help={errors.personas?.[index]?.persona_id?.message}
                >
                  <Controller
                    name={`personas.${index}.persona_id`}
                    control={control}
                    rules={{ required: "La persona es requerida" }}
                    render={({ field: f }) => (
                      <Select
                        {...f}
                        showSearch
                        optionFilterProp="label"
                        placeholder="Seleccionar persona"
                        options={buildPersonaOptions(currentPersonaId)}
                      />
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
              </div>
            </div>
          );
        })}

        <Button
          type="dashed"
          icon={<PlusIcon size="1rem" />}
          onClick={() => append({ persona_id: null, tipo_vinculo: null })}
        >
          Agregar persona vinculada
        </Button>
      </div>

      <div className="mt-4 flex justify-end">
        <Button type="primary" htmlType="submit" loading={isPending}>
          Guardar Cambios
        </Button>
      </div>
    </Form>
  );
};

export default EditarExpedienteForm;
