import { useEffect } from "react";
import Event from "src/models/Event";
import useWorldStore from "src/stores/useWorldStore";

export default function useSubcribeEvent(callback: (lastEvent: Event) => void) {
  useEffect(
    () =>
      useWorldStore.subscribe(({ lastEvent }) => {
        if (lastEvent) {
          callback(lastEvent);
        }
      }),
    []
  );
}
