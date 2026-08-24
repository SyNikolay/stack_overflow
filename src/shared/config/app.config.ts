const DEFAULTS = {
  apiUrl: "https://api.stackexchange.com/2.3",
  site: "stackoverflow",
  intitle: "react-redux",
  pageSize: 5,
  fromDate: "2026-01-01",
} as any;

const env = typeof __APP_ENV__ === "undefined" ? {} : __APP_ENV__;

export const appConfig = {
  apiUrl: env.VITE_SE_API_URL ?? DEFAULTS.apiUrl,
  site: env.VITE_SE_SITE ?? DEFAULTS.site,
  apiKey: env.VITE_SE_API_KEY?.trim() ?? "",
  searchIntitle: env.VITE_SEARCH_INTITLE ?? DEFAULTS.intitle,
  searchPageSize: env.VITE_SEARCH_PAGE_SIZE ?? DEFAULTS.pageSize,
  defaultFromDate: env.VITE_DEFAULT_FROM_DATE ?? DEFAULTS.fromDate,
} as const;
