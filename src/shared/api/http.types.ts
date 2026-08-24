export interface RequestOptions {
  params?: Record<string, string | number | boolean | undefined>;
  signal?: AbortSignal;
}
