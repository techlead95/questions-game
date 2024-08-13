import { GameEventType } from "@/models/GameEvent";
import { StoreState } from "./useStore";

import { GameState } from "@/models/Game";
import WorldEvent from "@/models/WorldEvent";

export default function handleGamesEvent(
  event: WorldEvent,
  set: (state: Partial<StoreState>) => void,
  get: () => StoreState
) {
  const { gamesById } = get();

  switch (event.type) {
    case GameEventType.Create:
      set({
        gamesById: {
          ...gamesById,
          [event.id]: {
            id: event.id,
            name: event.payload.name,
            question_count: event.payload.question_count,
            player_count: 1,
            state: GameState.Waiting,
          },
        },
      });
      break;
    case GameEventType.StateChange:
      set({
        gamesById: {
          ...gamesById,
          [event.id]: {
            ...get().gamesById[event.id],
            state: event.payload.state,
          },
        },
      });
      break;
    case GameEventType.PlayerCount:
      set({
        gamesById: {
          ...gamesById,
          [event.id]: {
            ...get().gamesById[event.id],
            player_count: event.payload.player_count,
          },
        },
      });
      break;
    case GameEventType.Destroy:
      const { [event.id]: _, ...rest } = gamesById;
      set({ gamesById: rest });
      break;
  }
}
