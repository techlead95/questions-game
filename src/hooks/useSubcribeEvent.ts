import { useEffect } from 'react';

import WorldEvent from '@/models/WorldEvent';

import useStore from '@/stores/useStore';

export default function useSubcribeEvent(
  callback: (lastEvent: WorldEvent) => void,
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
