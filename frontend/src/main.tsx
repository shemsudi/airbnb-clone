import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import router from "./route.tsx";

//tailwind
import "./index.css";
import { AuthProvider } from "./authProvider.tsx";

const rootElement: HTMLElement | null = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <Provider store={store}>
        <AuthProvider>
          <RouterProvider router={router}></RouterProvider>
        </AuthProvider>
      </Provider>
    </StrictMode>
  );
}
