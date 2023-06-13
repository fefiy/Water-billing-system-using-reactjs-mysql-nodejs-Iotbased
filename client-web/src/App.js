import "./App.css";
import { useContext, useState, useEffect } from "react";
import { colorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { makeRequest } from "./axios";
import React from "react";
import Topbar from "../src/scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboards from "./scenes/dashboard/Dashboards";
import Contacts from "./scenes/contacts/Contacts";
import Calendar from "./scenes/calender/Calendar";
import Register  from "./scenes/register/Register";
import Login from "./components/loginpage/Login";
import { AuthContext } from "./context/authContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Users from "./scenes/usertable/Users";

import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import UserPage from "./useInterface/UserPage";
import EditUserModal from "./scenes/profileUpdate/EditUserModal";
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

  console.log("token", isTokenValid)

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

  const LayoutUser = ()=>{
    return(
    // <QueryClientProvider client={queryClient}>
    <colorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <div className="app">
            <main className="content">
              <Topbar />
              <Outlet />
            </main>
          </div>
        </CssBaseline>
      </ThemeProvider>
    </colorModeContext.Provider>
    )
  // </QueryClientProvider>
  } 
  const ProtectedRoue = ({ children }) => {
    if (!currentUser  || currentUser.role != "admin") {
      return <Navigate to="/login" />;
    }
    return children;
  };

 
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoue>
          <Layout />
        </ProtectedRoue>
      ),
      children: [
        {
          path: "/",
          element: <Dashboards />,
        },
        {
          path: "/calander",
          element: <Calendar />,
        },
        {
          path: "/contacts",
          element: <Contacts />,
        },
        {
          path: "/register",
          element:<Register />
        },
        {
          path: "/table",
          element:<Users/>
        },
        {
          path: "/updateuser/:id",
          element: <EditUserModal />,
        },
      ],
    },
    {
      path:"/login",
      element:<Login />
    },
    
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


// import React from 'react'
// import Donate from './components/Donate'
// const App = () => {
//   return (
//     <div>
//       <Donate />
//     </div>
//   )
// }
// export default App