import { GameEventType } from "@/models/GameEvent";
import { StoreState } from "./useStore";
import WorldEvent from "@/models/WorldEvent";
import { GameState } from "@/models/Game";

export default function handleActiveGameEvents(
  event: WorldEvent,
  set: (state: Partial<StoreState>) => void,
  get: () => StoreState
) {
  const { activeGame, gamesById, currentPlayer } = get();

  switch (event.type) {
    case GameEventType.PlayerEnter:
      set({
        activeGame: event.payload,
      });
      if (currentPlayer === event.payload.players[0]) {
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
      }
      break;
    case GameEventType.PlayerJoin:
      if (activeGame) {
        set({
          activeGame: {
            ...activeGame,
            players: activeGame.players.concat(event.payload.player),
          },
        });
      }
      break;
    case GameEventType.PlayerReady:
      if (activeGame) {
        set({
          activeGame: {
            ...activeGame,
            players_ready: {
              ...activeGame.players_ready,
              [event.payload.player]: true,
            },
          },
        });
      }
      break;
    case GameEventType.End:
      set({
        scores: event.payload.scores,
      });
  }
}
