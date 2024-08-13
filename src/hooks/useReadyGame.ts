import { PlayerCommandType } from '@/models/PlayerCommand';

import useStore from '@/stores/useStore';
import { uuid } from '@/utils';

export default function useReadyGame() {
  const sendCommand = useStore((state) => state.sendCommand);

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
