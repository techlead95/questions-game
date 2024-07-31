import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import useWorldStore, { ReadyState } from "src/stores/useWorldStore";

export default function ProtectedRoute({ children }: PropsWithChildren<{}>) {
  const readyState = useWorldStore((state) => state.readyState);

  if (readyState === ReadyState.OPEN) {
    return children;
  }

  return <Navigate to="/connect" />;
}
