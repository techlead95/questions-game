import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import useStore from "src/stores/useStore";

export default function ProtectedRoute({ children }: PropsWithChildren<{}>) {
  const currentPlayer = useStore((state) => state.currentPlayer);

  if (currentPlayer) {
    return children;
  }

  return <Navigate to="/connect" />;
}
