import GameEvent, { GameEventType } from './GameEvent';
import PlayerEvent, { PlayerEventType } from './PlayerEvent';

export interface BaseWorldEvent {
  type: GameEventType | PlayerEventType;
  payload: unknown;
}

type WorldEvent = PlayerEvent | GameEvent;

export default WorldEvent;
