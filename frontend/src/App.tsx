import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Landing from "./pages/public/landing";
import HomePage from "./pages/secure/home";

const routers = createBrowserRouter([
  {
    id: "root",
    path: "/",
    index: true,
    element: <Landing />,
  },
  {
    id: "homepage",
    path: "/home",
    element: <HomePage />,
  }
])

export default function App() {
  return (
    <RouterProvider router={routers} fallbackElement={<p>Initial Load...</p>} />
  );
}