import { PlayerCommandType } from "src/models/PlayerCommand";
import useStore from "src/stores/useStore";
import { uuid } from "src/utils";

export default function useCreateGame() {
  const sendCommand = useStore((state) => state.sendCommand);

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
