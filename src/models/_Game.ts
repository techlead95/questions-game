export enum GameState {
  Waiting = "waiting",
  Countdown = "countdown",
  Question = "question",
  Ended = "ended",
}

export default interface Game {
  id: string;
  name: string;
  question_count: number;
  player_count: number;
  state: GameState;
}
