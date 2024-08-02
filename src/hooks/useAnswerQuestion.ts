import { PlayerCommandType } from "src/models/PlayerCommand";
import useStore from "src/stores/useStore";
import { uuid } from "src/utils";

export default function useAnswerQuestion() {
  const sendCommand = useStore((state) => state.sendCommand);

  return (gameId: string, index: number, questionId: string) => {
    sendCommand({
      nonce: uuid(),
      type: PlayerCommandType.Answer,
      payload: {
        game_id: gameId,
        index,
        question_id: questionId,
      },
    });
  };
}
