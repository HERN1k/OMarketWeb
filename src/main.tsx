import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";    
import { router } from "./code/Router.ts";        
import { 
    addEventListenerToHeader, 
    handleThemeChange, 
    setThemeAttribute 
} from "./code/Application.ts";
import "bootstrap/dist/css/bootstrap.min.css";     
import "./index.css";

document.addEventListener("DOMContentLoaded", function () {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");
    mediaQuery.addEventListener("change", handleThemeChange);

    setThemeAttribute();

    addEventListenerToHeader();
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);