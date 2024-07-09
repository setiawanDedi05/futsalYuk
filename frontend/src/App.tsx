import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Landing from "./pages/public/landing";
import HomePage from "./pages/secure/home";
import FeedPage from "./pages/secure/feed";
import CustomeErrorBounderies from "./pages/public/error";
import PlayPage from "./pages/secure/play";
import ConfigPage from "./pages/secure/profile";
import ChatPage from "./pages/secure/chat";
import EditProfilePage from "./pages/secure/editProfile";

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
        path: "",
        index: true,
        element: <FeedPage />
      },
      {
        id: "play",
        path: "play",
        element: <PlayPage />
      },
      {
        id: "profile",
        path: "profile",
        element: <ConfigPage/>
      },
      {
        id: "chat",
        path: "chat/:id",
        element: <ChatPage />
      },
      {
        id: "edit-profile",
        path: "edit-profile",
        element: <EditProfilePage />
      }
    ]
  }
])

export default function App() {
  return (
    <RouterProvider router={routers} fallbackElement={<p>Initial Load...</p>} />
  );
}