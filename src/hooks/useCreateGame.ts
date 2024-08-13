import { PlayerCommandType } from '@/models/PlayerCommand';

import useStore from '@/stores/useStore';
import { uuid } from '@/utils';

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
