import configStrings from "./constants/configStrings";

const config = {
  apiBaseUrl: configStrings.API_BASE_URL,
  apiPrefix: "/api",
  authenticatedEntryPath: "/",
  unAuthenticatedEntryPath: "/login",
  tourPath: "/",
};

const getConfig = function () {
  return config;
};

export type AppConfig = {
  apiPrefix: string;
  authenticatedEntryPath: string;
  unAuthenticatedEntryPath: string;
  tourPath: string;
  locale: string;
  enableMock: boolean;
};

export default getConfig;
