import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Importing pages
import HomePage from "./pages/home";
import NotFoundPage from "./pages/not-found400";

// Define the routes array
const routes = [
  {
    path: "/",
    element: <HomePage />,
    errorElement: <NotFoundPage />
  },
];

// Create the router using createBrowserRouter with routes
const router = createBrowserRouter(routes);

// Render the app using ReactDOM
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
