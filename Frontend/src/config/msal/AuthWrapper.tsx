import { AccountInfo, IPublicClientApplication } from "@azure/msal-browser";
import { useAccount, useMsal } from "@azure/msal-react";
import axios from "axios";
import React, { useEffect, useState } from "react";

import { axiosInstance } from "../queries/axiosInstance";
import { authRequest } from "./authConfig";

type AuthWrapperProps = {
  children: React.ReactNode;
};

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const { instance, accounts } = useMsal();
  const account = useAccount(accounts[0]) ?? undefined;
  const [isTokenAcquired, setIsTokenAcquired] = useState(false);

  const getAccessToken = async (
    instance: IPublicClientApplication,
    account?: AccountInfo
  ) => {
    try {
      return await instance.acquireTokenSilent({
        ...authRequest,
        account: account,
      });
    } catch (error) {
      return await instance.acquireTokenRedirect({
        ...authRequest,
        account: account,
      });
    }
  };

  useEffect(() => {
    const middlewareId = axiosInstance.interceptors.request.use(
      async (config) => {
        const accessToken = await getAccessToken(instance, account);

        if (config.headers) {
          if (accessToken) {
            const token = "Bearer " + accessToken.accessToken;
            axios.defaults.headers.common["Authorization"] = token;
            config.headers.Authorization = token;
          }
          config.headers["Content-Type"] = "application/json";
        }
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );

    setIsTokenAcquired(true);
    return () => axiosInstance.interceptors.request.eject(middlewareId);
  }, [instance, account]);

  return isTokenAcquired ? <>{children}</> : <></>;
};
export default AuthWrapper;
