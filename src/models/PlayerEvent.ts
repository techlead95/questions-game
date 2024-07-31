import { BaseEvent } from "./Event";

export enum PlayerEventType {
  Connect = "player_connect",
  Disconnect = "player_disconnect",
}

export default interface PlayerEvent extends BaseEvent {
  player: string;
  type: PlayerEventType;
}
