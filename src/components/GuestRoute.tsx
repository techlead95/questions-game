import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import useStore, { ReadyState } from "src/stores/useStore";

export default function GuestRoute({ children }: PropsWithChildren<{}>) {
  const readyState = useStore((state) => state.readyState);

  if (readyState === ReadyState.OPEN) {
    return <Navigate to="/" />;
  }

  return children;
}
