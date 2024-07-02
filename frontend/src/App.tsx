import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Landing from "./pages/public/landing";
import HomePage from "./pages/secure/home";
import FeedPage from "./pages/secure/feed";
import FriendPage from "./pages/secure/friend";
import CustomeErrorBounderies from "./pages/public/error";
import PlayPage from "./pages/secure/play";

const routers = createBrowserRouter([
  {
    id: "root",
    path: "/",
    index: true,
    errorElement: <CustomeErrorBounderies />,
    element: <Landing />,
  },
  {
    id: "homepage",
    path: "/secure",
    element: <HomePage />,
    children:[
      {
        id: "feed",
        path: "home",
        element: <FeedPage />
      },
      {
        id: "friend",
        path: "friend",
        element: <FriendPage />
      },
      {
        id: "play",
        path: "play",
        element: <PlayPage />
      },

    ]
  }
])

export default function App() {
  return (
    <RouterProvider router={routers} fallbackElement={<p>Initial Load...</p>} />
  );
}