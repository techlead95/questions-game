import { PlayerCommandType } from '@/models/PlayerCommand';

import useStore from '@/stores/useStore';
import { uuid } from '@/utils';

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
