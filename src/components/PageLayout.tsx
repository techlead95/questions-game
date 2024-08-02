import { PropsWithChildren, ReactNode } from "react";
import { cn } from "src/lib/utils";
import { Button } from "./ui/button";
import useWorldStore from "src/stores/useWorldStore";
import { useNavigate } from "react-router-dom";

interface Props {
  title: String;
  bodyClassName?: String;
  hideDisconnect?: boolean;
  pageActions?: ReactNode;
}

export default function PageLayout({
  title,
  children,
  bodyClassName,
  hideDisconnect,
  pageActions,
}: PropsWithChildren<Props>) {
  const disconnect = useWorldStore((state) => state.disconnect);
  const navigate = useNavigate();

  const handleDisconnect = () => {
    disconnect();
    navigate("/");
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-xl p-8">
        <h1 className="text-xl text-center">{title}</h1>
        <div className="mt-8 flex flex-col">{children}</div>
      </div>
    </div>
  );
}
