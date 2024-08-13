import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

import useStore from '@/stores/useStore';

export default function GuestRoute({ children }: PropsWithChildren<{}>) {
  const currentPlayer = useStore((state) => state.currentPlayer);

  if (currentPlayer) {
    return <Navigate to="/" />;
  }

  return children;
}
