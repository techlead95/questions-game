import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import useWorldStore, { ReadyState } from "src/stores/useWorldStore";

export default function GuestRoute({ children }: PropsWithChildren<{}>) {
  const readyState = useWorldStore((state) => state.readyState);

  if (readyState === ReadyState.OPEN) {
    return <Navigate to="/" />;
  }

  return children;
}
