export default interface Game {
  id: string;
  name: string;
  questionCount: number;
  state: "waiting" | "countdown" | "question" | "ended";
}
