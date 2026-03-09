import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./authConfig";

export const msalInstance = new PublicClientApplication(msalConfig);

export const logout = async () => {
  await msalInstance.logoutRedirect();
};
