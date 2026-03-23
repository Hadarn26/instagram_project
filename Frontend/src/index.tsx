import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";

import "./index.scss";
import queryClient from "./config/queries/queryClient";
import { router } from "./config/router/router";
import { useLoadUser } from "./hooks/core/useLoadUser";

function Root() {
  useLoadUser();

  return (
    <>
      <CssBaseline />
      <RouterProvider router={router} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Root />
    </QueryClientProvider>
  </React.StrictMode>,
);
