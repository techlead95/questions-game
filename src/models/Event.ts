import GameEvent, { GameEventType } from "./GameEvent";
import PlayerEvent, { PlayerEventType } from "./PlayerEvent";

export interface BaseEvent {
  type: GameEventType | PlayerEventType;
  payload: unknown;
}

type Event = PlayerEvent | GameEvent;

export default Event;
