import { BaseEvent } from './Event';
import { GameState } from './Game';
import GameQuestion from './GameQuestion';
import PlayerScore from './PlayerScore';

interface BaseGameEvent extends BaseEvent {
  id: string;
}

export enum GameEventType {
  Create = 'game_create',
  StateChange = 'game_state_change',
  PlayerCount = 'game_player_count',
  Destroy = 'game_destroy',
  Start = 'game_start',
  End = 'game_end',
  Countdown = 'game_countdown',
  Question = 'game_question',
  PlayerEnter = 'game_player_enter',
  PlayerJoin = 'game_player_join',
  PlayerReady = 'game_player_ready',
  PlayerLeave = 'game_player_leave',
  PlayerCorrect = 'game_player_correct',
  PlayerIncorrect = 'game_player_incorrect',
}

interface GameEventCreate extends BaseGameEvent {
  type: GameEventType.Create;
  payload: GameEventCreatePayload;
}

interface GameEventCreatePayload {
  name: string;
  question_count: number;
}

interface GameEventStateChange extends BaseGameEvent {
  type: GameEventType.StateChange;
  payload: GameEventStateChange;
}

interface GameEventStateChange {
  state: GameState;
}

interface GameEventPlayerCount extends BaseGameEvent {
  type: GameEventType.PlayerCount;
  payload: GameEventPlayerCountPayload;
}

interface GameEventPlayerCountPayload {
  player_count: number;
}

interface GameEventDestroy extends BaseGameEvent {
  type: GameEventType.Destroy;
}

interface GameEventStart extends BaseGameEvent {
  type: GameEventType.Start;
}

interface GameEventEnd extends BaseGameEvent {
  type: GameEventType.End;
  payload: GameEventEndPayload;
}

interface GameEventEndPayload {
  scores: PlayerScore[];
}

interface GameEventCountdown extends BaseGameEvent {
  type: GameEventType.Countdown;
  payload: GameEventCountdownPayload;
}
interface GameEventCountdownPayload {
  seconds: number;
}

interface GameEventQuestion extends BaseGameEvent {
  type: GameEventType.Question;
  payload: GameEventQuestionPayload;
}
type GameEventQuestionPayload = GameQuestion;

interface GameEventPlayerEnter extends BaseGameEvent {
  type: GameEventType.PlayerEnter;
  payload: GameEventPlayerEnterPayload;
}
interface GameEventPlayerEnterPayload {
  name: string;
  players: string[];
  players_ready: Record<string, boolean>;
  question_count: number;
}

interface GameEventPlayerJoin extends BaseGameEvent {
  type: GameEventType.PlayerJoin;
  payload: GameEventPlayerJoinPayload;
}
interface GameEventPlayerJoinPayload {
  player: string;
}

interface GameEventPlayerReady extends BaseGameEvent {
  type: GameEventType.PlayerReady;
  payload: GameEventPlayerReadyPayload;
}
interface GameEventPlayerReadyPayload {
  player: string;
}

interface GameEventPlayerLeave extends BaseGameEvent {
  type: GameEventType.PlayerLeave;
  payload: GameEventPlayerLeavePayload;
}
interface GameEventPlayerLeavePayload {
  player: string;
}
interface GameEventPlayerCorrect extends BaseGameEvent {
  type: GameEventType.PlayerCorrect;
  payload: GameEventPlayerCorrectPayload;
}
interface GameEventPlayerCorrectPayload {
  id: string;
  player: string;
}

interface GameEventPlayerIncorrect extends BaseGameEvent {
  type: GameEventType.PlayerIncorrect;
  payload: GameEventPlayerIncorrectPayload;
}
interface GameEventPlayerIncorrectPayload {
  id: string;
  player: string;
}

type GameEvent =
  | GameEventCreate
  | GameEventStateChange
  | GameEventPlayerCount
  | GameEventDestroy
  | GameEventStart
  | GameEventEnd
  | GameEventCountdown
  | GameEventQuestion
  | GameEventPlayerEnter
  | GameEventPlayerJoin
  | GameEventPlayerReady
  | GameEventPlayerLeave
  | GameEventPlayerCorrect
  | GameEventPlayerIncorrect;

export default GameEvent;
