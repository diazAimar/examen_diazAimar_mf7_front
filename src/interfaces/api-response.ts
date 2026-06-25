export interface ApiResponse<T = unknown> {
  data: T | null;
  error: string | Record<string, string[]> | null;
  validationErrors?: { key: string; message: string }[] | null;
}
