import { PlayerCommandType } from "src/models/PlayerCommand";
import useWorldStore from "src/stores/useWorldStore";
import { uuid } from "src/utils";

export default function useStartGame() {
  const sendCommand = useWorldStore((state) => state.sendCommand);

  return (gameId: string) => {
    sendCommand({
      nonce: uuid(),
      type: PlayerCommandType.Start,
      payload: {
        game_id: gameId,
      },
    });
  };
}
