import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom';

import GuestRoute from './components/GuestRoute';
import ProtectedRoute from './components/ProtectedRoute';
import ConnectPage from './pages/ConnectPage';
import GameListPage from './pages/GameListPage';
import GamePlayPage from './pages/GamePlayPage';
import GameReadyPage from './pages/GameReadyPage';
import GameScoresPage from './pages/GameScoresPage';

const router = createBrowserRouter([
  {
    path: '/connect',
    element: (
      <GuestRoute>
        <ConnectPage />
      </GuestRoute>
    ),
  },
  {
    path: '',
    element: <Navigate to="/games" replace />,
  },
  {
    path: '/games',
    element: (
      <ProtectedRoute>
        <Outlet />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '',
        element: <GameListPage />,
      },
      {
        path: ':id',
        element: <Outlet />,
        children: [
          {
            path: 'ready',
            element: <GameReadyPage />,
          },
          {
            path: '',
            element: <GamePlayPage />,
          },
          {
            path: 'scores',
            element: <GameScoresPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
