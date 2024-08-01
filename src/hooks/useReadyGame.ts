import { PlayerCommandType } from "src/models/PlayerCommand";
import useWorldStore from "src/stores/useWorldStore";
import { uuid } from "src/utils";

export default function useReadyGame() {
  const sendCommand = useWorldStore((state) => state.sendCommand);

  return (gameId: string) => {
    sendCommand({
      nonce: uuid(),
      type: PlayerCommandType.Ready,
      payload: {
        game_id: gameId,
      },
    });
  };
}
