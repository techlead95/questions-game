import { createBrowserRouter, Outlet } from "react-router-dom";
import ConnectPage from "./pages/ConnectPage";
import GameListPage from "./pages/GameListPage";
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";
import GameReadyPage from "./pages/GameReadyPage";

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
        path: "games/:id/ready",
        element: <GameReadyPage />,
      },
    ],
  },
]);

export default router;
