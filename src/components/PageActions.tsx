import { PropsWithChildren } from 'react';

export default function PageActions({ children }: PropsWithChildren<{}>) {
  return <div className="mt-8 flex gap-4">{children}</div>;
}
