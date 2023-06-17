import "./App.css";
import {useContext, useEffect, useState} from "react"
import NavBar from "./components/NavBar";
import { AuthContext } from "./context/authContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./pages/login/Login";
import { makeRequest } from "./axios";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home/Home";

function App() {
  // const [isTokenValid, setIsTokenValid] = useState(false)
  const { currentUser } = useContext(AuthContext);
  const queryClient = new QueryClient();
  
  const Layout = () => {    
    return (
      <QueryClientProvider client={queryClient}>
        <div className="app">
          <main className="content">
        <NavBar />
            <Outlet />
          </main>
        </div>
      </QueryClientProvider>
    );
  };
  // console.log(isTokenValid)
  console.log(currentUser)
  const ProtectedRoue = ({ children }) => {
    if (!currentUser || currentUser.role != "user") {
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
          path:"/",
          element:(<Home/>)
        },
      ],
    },
    {
      path:"/login",
      element:<Login />
    },
   
  ]);
  return (
    <RouterProvider router={router} />
  );
}

export default App;
