import { useEffect } from "react";
import Event from "src/models/Event";
import useStore from "src/stores/useStore";

export default function useSubcribeEvent(callback: (lastEvent: Event) => void) {
  useEffect(
    () =>
      useStore.subscribe(({ lastEvent }) => {
        if (lastEvent) {
          callback(lastEvent);
        }
      }),
    []
  );
}
