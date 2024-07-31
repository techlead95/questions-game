import { PlayerCommandType } from "src/models/PlayerCommand";
import useWorldStore from "src/stores/useWorldStore";
import { uuid } from "src/utils";

export default function useCreateGame() {
  const sendCommand = useWorldStore((state) => state.sendCommand);

  return (name: string, questionCount: number) => {
    sendCommand({
      nonce: uuid(),
      type: PlayerCommandType.Create,
      payload: {
        name,
        question_count: questionCount,
      },
    });
  };
}
