import { useEffect } from 'react';

import Event from '@/models/Event';

import useStore from '@/stores/useStore';

export default function useSubcribeEvent(
  callback: (lastEventWorldEvent) => void,
) {
  useEffect(
    () =>
      useStore.subscribe(({ lastEvent }) => {
        if (lastEvent) {
          callback(lastEvent);
        }
      }),
    [],
  );
}
