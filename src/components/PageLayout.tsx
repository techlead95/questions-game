import { PropsWithChildren, useEffect } from "react";
import useWorldStore from "src/stores/useWorldStore";
import { useToast } from "./ui/use-toast";

interface Props {
  title: String;
}

export default function PageLayout({
  title,
  children,
}: PropsWithChildren<Props>) {
  const errorMessage = useWorldStore((state) => state.errorMessage);
  const clearErrorMessage = useWorldStore((state) => state.clearErrorMessage);
  const { toast } = useToast();

  useEffect(() => {
    if (errorMessage) {
      toast({
        description: errorMessage,
      });
      clearErrorMessage();
    }
  }, [errorMessage]);

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-xl p-8">
        <h1 className="text-xl text-center">{title}</h1>
        <div className="mt-8 flex flex-col">{children}</div>
      </div>
    </div>
  );
}
