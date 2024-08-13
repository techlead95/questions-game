export enum PlayerCommandType {
  Create = 'create',
  Join = 'join',
  Ready = 'ready',
  Start = 'start',
  Answer = 'answer',
}

interface BasePlayerCommand {
  nonce: string;
  type: PlayerCommandType;
  payload: unknown;
}

interface PlayerCommandCreate extends BasePlayerCommand {
  type: PlayerCommandType.Create;
  payload: PlayerCommandCreatePayload;
}

interface PlayerCommandCreatePayload {
  name: string;
  question_count: number;
}

interface PlayerCommandJoin extends BasePlayerCommand {
  type: PlayerCommandType.Join;
  payload: PlayerCommandJoinPayload;
}

interface PlayerCommandJoinPayload {
  game_id: string;
}

interface PlayerCommandReady extends BasePlayerCommand {
  type: PlayerCommandType.Ready;
  payload: PlayerCommandReadyPayload;
}

interface PlayerCommandReadyPayload {
  game_id: string;
}

interface PlayerCommandStart extends BasePlayerCommand {
  type: PlayerCommandType.Start;
  payload: PlayerCommandStartPayload;
}

interface PlayerCommandStartPayload {
  game_id: string;
}

interface PlayerCommandAnswer extends BasePlayerCommand {
  type: PlayerCommandType.Answer;
  payload: PlayerCommandAnswerPayload;
}

interface PlayerCommandAnswerPayload {
  game_id: string;
  index: number;
  question_id: string;
}

type PlayerCommand =
  | PlayerCommandCreate
  | PlayerCommandJoin
  | PlayerCommandReady
  | PlayerCommandStart
  | PlayerCommandAnswer;

export default PlayerCommand;
