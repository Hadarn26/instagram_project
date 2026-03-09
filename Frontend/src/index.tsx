import React from "react";
import ReactDOM from "react-dom/client";
import { InteractionType } from "@azure/msal-browser";
import { MsalAuthenticationTemplate, MsalProvider } from "@azure/msal-react";
import { CssBaseline } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";

import "./index.scss";
import { msalInstance } from "./config/msal/msal";
import AuthWrapper from "./config/msal/AuthWrapper";
import { authRequest } from "./config/msal/authConfig";
import queryClient from "./config/queries/queryClient";
import { RouterProvider } from "react-router-dom";
import { router } from "./config/router/router";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <MsalAuthenticationTemplate
        interactionType={InteractionType.Redirect}
        authenticationRequest={authRequest}
        loadingComponent={() => <div>LOADING, wait a little :)</div>}
      >
        <AuthWrapper>
          <QueryClientProvider client={queryClient}>
            <CssBaseline />
            <RouterProvider router={router} />
          </QueryClientProvider>
        </AuthWrapper>
      </MsalAuthenticationTemplate>
    </MsalProvider>
  </React.StrictMode>
);
