import type { RequestOptions } from "./http.types";

export class HttpError extends Error {
  readonly status: number | undefined;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "HttpError";
    this.status = status;
  }
}

const buildUrl = (url: string, params: RequestOptions["params"]): string => {
  const search = new URLSearchParams();

  for (const [key, value] of Object.entries(params ?? {})) {
    if (value !== undefined && value !== "") {
      search.set(key, String(value));
    }
  }

  const query = search.toString();

  return query ? `${url}?${query}` : url;
};

const readErrorMessage = async (response: Response): Promise<string | null> => {
  try {
    const body: unknown = await response.json();

    if (body && typeof body === "object" && "error_message" in body) {
      const message = (body as { error_message?: unknown }).error_message;

      return typeof message === "string" && message ? message : null;
    }
  } catch {}

  return null;
};

export const apiService = async <T>(
  url: string,
  options: RequestOptions = {},
): Promise<T> => {
  let response: Response;

  try {
    response = await fetch(buildUrl(url, options.params), {
      method: "GET",
      headers: { Accept: "application/json" },
      signal: options.signal,
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw error;
    }

    throw new HttpError(
      "Не удалось связаться с сервером. Проверьте подключение к сети.",
    );
  }

  if (!response.ok) {
    const message = await readErrorMessage(response);

    throw new HttpError(
      message ??
        `Сервер ответил ошибкой ${response.status} (${response.statusText}).`,
      response.status,
    );
  }

  try {
    return (await response.json()) as T;
  } catch {
    throw new HttpError(
      "Сервер вернул ответ в неизвестном формате.",
      response.status,
    );
  }
};
