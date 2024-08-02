interface ActiveGame {
  name: string;
  players: string[];
  players_ready: Record<string, boolean>;
  question_count: number;
}
