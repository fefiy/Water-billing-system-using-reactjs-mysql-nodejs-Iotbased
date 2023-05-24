import "./App.css";
import { useContext, useState, useEffect } from "react";
import { colorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { makeRequest } from "./axios";
import React from "react";
import Topbar from "../src/scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboards from "./scenes/dashboard/Dashboards";
import Team from "./scenes/team/Team";
import Contacts from "./scenes/contacts/Contacts";
import Invoices from "./scenes/invoices/Invoices";
import Calendar from "./scenes/calender/Calendar";
import Register  from "./scenes/register/Register";
import Land from "./landingpage/Land";
import { AuthContext } from "./context/authContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import Login from "./landingpage/Login";
const App = () => {
  const [isTokenValid, setIsTokenValid] = useState(false)
  const {currentUser } = useContext(AuthContext)
  const queryClient = new QueryClient();

  useEffect(() => {
    async function fetchData() {
      try {
        console.log("access is fetching")
        const response = await makeRequest.get("/autenticate");
        console.log("tokeV", response.data)
        setIsTokenValid(response.data)
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);


  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <colorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline>
              <div className="app">
                <Sidebar />
                <main className="content">
                  <Topbar />
                  <Outlet />
                </main>
              </div>
            </CssBaseline>
          </ThemeProvider>
        </colorModeContext.Provider>
      </QueryClientProvider>
    );
  };
  const ProtectedRoue = ({ children }) => {
    if (!currentUser || !isTokenValid || currentUser.role != "admin") {
      return <Navigate to="/login" />;
    }
    return children;
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Land />,
    },
    {
      path: "/admin",
      element: (
        <ProtectedRoue>
          <Layout />
        </ProtectedRoue>
      ),
      children: [
        {
          path: "/admin",
          element: <Dashboards />,
        },
        {
          path: "/admin/calander",
          element: <Calendar />,
        },
        {
          path: "/admin/contacts",
          element: <Contacts />,
        },
        {
          path: "/admin/team",
          element: <Team />,
        },
        {
          path: "/admin/register",
          element:<Register />
        }
      ],
    },
    {
      path:"/login",
      element:<Login />
    }
  ]);

  const [theme, colorMode] = useMode();
  console.log();
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;


