import { useEffect } from "react";
import useGameStore, { ReadyState } from "src/stores/useGameStore";
import { uuid } from "src/utils";

export default function GameListPage() {
  const messages = useGameStore((state) => state.messages);
  const status = useGameStore((state) => state.readyState);
  const sendMessage = useGameStore((state) => state.sendEvent);

  useEffect(() => {
    if (status === ReadyState.OPEN) {
      sendMessage({
        id: uuid,
        payload: {
          name: "NewGame",
          question_count: 5,
        },
        type: "GameEventType",
      });
    }
  }, [status]);

  console.log(messages);

  return <div>Test</div>;
}
