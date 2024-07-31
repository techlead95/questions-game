import { PropsWithChildren } from "react";
import { cn } from "src/lib/utils";

interface Props {
  title: String;
  bodyClassName?: String;
}

export default function PageLayout({
  title,
  children,
  bodyClassName,
}: PropsWithChildren<Props>) {
  return (
    <div className="p-8 flex flex-col h-screen">
      <h1 className="text-3xl">{title}</h1>
      <div className={cn("mt-6 flex flex-1", bodyClassName)}>{children}</div>
    </div>
  );
}
