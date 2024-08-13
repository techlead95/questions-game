import { PropsWithChildren } from 'react';

import useHandleError from '@/hooks/useHandleError';

interface Props {
  title: String;
}

export default function PageLayout({
  title,
  children,
}: PropsWithChildren<Props>) {
  useHandleError();

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-xl p-8">
        <h1 className="text-xl text-center">{title}</h1>
        <div className="mt-8 flex flex-col">{children}</div>
      </div>
    </div>
  );
}
