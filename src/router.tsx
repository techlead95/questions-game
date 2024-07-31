import { createBrowserRouter } from "react-router-dom";
import ConnectPage from "./pages/ConnectPage";
import GameListPage from "./pages/GameListPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ConnectPage />,
  },
  {
    path: "/games",
    element: <GameListPage />,
  },
]);

export default router;
