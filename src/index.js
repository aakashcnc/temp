import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Importing components and styling
import "./assets/styling/main.min.css";
import Header from "./sections/Header";
import Footer from "./sections/Footer";

// Importing pages
import HomePage from "./pages/home";
import AboutPage from "./pages/about";
import NotFoundPage from "./pages/not-found400";

// Define a Layout component that wraps around page content
const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

// Define the routes array
const routes = [
  {
    path: "/",
    element: <Layout><HomePage /></Layout>,
    errorElement: <NotFoundPage />
  },
  {
    path: "/about",
    element: <Layout><AboutPage /></Layout>,
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
