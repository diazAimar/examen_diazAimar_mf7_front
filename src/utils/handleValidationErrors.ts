import { message } from "antd";
import type { AxiosError } from "axios";
import type { ApiResponse } from "../interfaces/api-response";
import type { FieldValues, Path, UseFormSetError } from "react-hook-form";

export const handleValidationErrors = <T extends FieldValues>(
  error: AxiosError<ApiResponse<null>>,
  setError: UseFormSetError<T>,
) => {
  const axiosError = error;
  const errorData = axiosError.response?.data;

  if (axiosError.response?.status === 422 && errorData?.validationErrors) {
    Object.entries(errorData.validationErrors).forEach(
      ([, validationError]) => {
        if (validationError) {
          setError(validationError.key as Path<T>, {
            type: "server",
            message: validationError.message,
          });
        }
      },
    );
    return;
  }

  const raw =
    errorData?.error ??
    "Ocurrió un error inesperado. Por favor, intente nuevamente.";
  const genericMessage = typeof raw === "string" ? raw : JSON.stringify(raw);
  message.error(genericMessage);
};
