interface BaseGameEvent {
  id: string;
  type: GameEventType;
}

enum GameEventType {
  Create = "game_create",
  StateChange = "game_state_change",
  PlayerCount = "game_player_count",
  Destroy = "game_destroy",
  Start = "game_start",
  End = "game_end",
  Countdown = "game_countdown",
  Question = "game_question",
  PlayerEnter = "game_player_enter",
  PlayerJoin = "game_player_join",
  PlayerReady = "game_player_ready",
  PlayerLeave = "game_player_leave",
  PlayerCorrect = "game_player_correct",
  PlayerIncorrect = "game_player_incorrect",
}

interface GameCreateEvent extends BaseGameEvent {
  type: GameEventType.Create;
  payload: GameCreatePayload;
}

interface GameStateChangeEvent extends BaseGameEvent {
  type: GameEventType.StateChange;
  payload: GameStateChangePayload;
}

interface GamePlayerCountEvent extends BaseGameEvent {
  type: GameEventType.PlayerCount;
  payload: GamePlayerCountPayload;
}

interface GameDestroyEvent extends BaseGameEvent {
  type: GameEventType.Destroy;
}

interface GameStartEvent extends BaseGameEvent {
  type: GameEventType.Start;
}

interface GameEndEvent extends BaseGameEvent {
  type: GameEventType.End;
  payload: GameEndPayload;
}

interface GameCountdownEvent extends BaseGameEvent {
  type: GameEventType.Countdown;
  payload: GameCountdownPayload;
}

interface GameQuestionEvent extends BaseGameEvent {
  type: GameEventType.Question;
  payload: GameQuestionPayload;
}

interface GamePlayerEnterEvent extends BaseGameEvent {
  type: GameEventType.PlayerEnter;
  payload: GamePlayerEnterPayload;
}

interface GamePlayerJoinEvent extends BaseGameEvent {
  type: GameEventType.PlayerJoin;
  payload: GamePlayerJoinPayload;
}

interface GamePlayerReadyEvent extends BaseGameEvent {
  type: GameEventType.PlayerReady;
  payload: GamePlayerReadyPayload;
}

interface GamePlayerLeaveEvent extends BaseGameEvent {
  type: GameEventType.PlayerLeave;
  payload: GamePlayerLeavePayload;
}

interface GamePlayerCorrectEvent extends BaseGameEvent {
  type: GameEventType.PlayerCorrect;
  payload: GamePlayerCorrectPayload;
}

interface GamePlayerIncorrectEvent extends BaseGameEvent {
  type: GameEventType.PlayerIncorrect;
  payload: GamePlayerIncorrectPayload;
}

export type GameEvent =
  | GameCreateEvent
  | GameStateChangeEvent
  | GamePlayerCountEvent
  | GameDestroyEvent
  | GameStartEvent
  | GameEndEvent
  | GameCountdownEvent
  | GameQuestionEvent
  | GamePlayerEnterEvent
  | GamePlayerJoinEvent
  | GamePlayerReadyEvent
  | GamePlayerLeaveEvent
  | GamePlayerCorrectEvent
  | GamePlayerIncorrectEvent;

interface GameCreatePayload {
  name: string;
  question_count: number;
}

interface GameStateChangePayload {
  state: string;
}

interface GamePlayerCountPayload {
  player_count: number;
}

interface PlayerScore {
  name: string;
  score: number;
}

interface GameEndPayload {
  scores: PlayerScore[];
}

interface GameCountdownPayload {
  seconds: number;
}

interface GameQuestionPayload {
  id: string;
  options: string[];
  question: string;
  seconds: number;
}

interface GamePlayerEnterPayload {
  name: string;
  players: string[];
  players_ready: Record<string, boolean>;
  question_count: number;
}

interface GamePlayerJoinPayload {
  player: string;
}

interface GamePlayerReadyPayload {
  player: string;
}

interface GamePlayerLeavePayload {
  player: string;
}

interface GamePlayerCorrectPayload {
  id: string;
  player: string;
}

interface GamePlayerIncorrectPayload {
  id: string;
  player: string;
}
