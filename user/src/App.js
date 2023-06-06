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
import PaymentHistory from "./pages/paymenthistory/PaymentHistory";

function App() {
  const [isTokenValid, setIsTokenValid] = useState(false)
  const { currentUser } = useContext(AuthContext);
  const queryClient = new QueryClient();
  useEffect(() => {
    console.log("useEffect Calleded")
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
        <div className="app">
          <main className="content">
        <NavBar />
            <Outlet />
          </main>
        </div>
      </QueryClientProvider>
    );
  };
  console.log(isTokenValid)
  console.log(currentUser)
  const ProtectedRoue = ({ children }) => {
    if (!currentUser || !isTokenValid || currentUser.role != "user") {
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
        {
          path:"/history",
          element:(<PaymentHistory/>)
        }
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
