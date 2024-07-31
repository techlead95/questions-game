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
    <div className="p-8 flex flex-col h-screen">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl">{title}</h1>
        <div className="flex gap-4">
          {!hideDisconnect && (
            <Button
              variant="outline"
              className="ml-auto"
              onClick={handleDisconnect}
            >
              Disconnect
            </Button>
          )}
          {pageActions}
        </div>
      </div>
      <div className={cn("mt-6 flex flex-col flex-1", bodyClassName)}>
        {children}
      </div>
    </div>
  );
}
