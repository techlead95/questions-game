import { BaseWorldEvent } from './WorldEvent';

export enum PlayerEventType {
  Connect = 'player_connect',
  Disconnect = 'player_disconnect',
}

export default interface PlayerEvent extends BaseWorldEvent {
  player: string;
  type: PlayerEventType;
}
