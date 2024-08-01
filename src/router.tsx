import { createBrowserRouter, Outlet } from "react-router-dom";
import ConnectPage from "./pages/ConnectPage";
import GameListPage from "./pages/GameListPage";
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";
import GameDetailPage from "./pages/GameDetailPage";

const router = createBrowserRouter([
  {
    path: "/connect",
    element: (
      <GuestRoute>
        <ConnectPage />
      </GuestRoute>
    ),
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Outlet />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <GameListPage />,
      },
      {
        path: "games/:id",
        element: <GameDetailPage />,
      },
    ],
  },
]);

export default router;
