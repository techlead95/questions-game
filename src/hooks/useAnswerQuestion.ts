import { PlayerCommandType } from '@/models/PlayerCommand';

import useStore from '@/stores/useStore';
import { uuid } from '@/utils';

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
