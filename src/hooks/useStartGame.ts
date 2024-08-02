import { PlayerCommandType } from "src/models/PlayerCommand";
import useStore from "src/stores/useStore";
import { uuid } from "src/utils";

export default function useStartGame() {
  const sendCommand = useStore((state) => state.sendCommand);

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
