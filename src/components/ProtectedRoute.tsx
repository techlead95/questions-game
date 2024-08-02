import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import useStore, { ReadyState } from "src/stores/useStore";

export default function ProtectedRoute({ children }: PropsWithChildren<{}>) {
  const readyState = useStore((state) => state.readyState);

  console.log({ readyState });

  if (readyState === ReadyState.OPEN) {
    return children;
  }

  return <Navigate to="/connect" />;
}
