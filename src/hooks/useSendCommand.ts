import { useToast } from "src/components/ui/use-toast";
import PlayerCommand from "src/models/playerCommand";
import useWorldStore, { ReadyState } from "src/stores/useWorldStore";

export default function useSendCommand() {
  const readyState = useWorldStore((state) => state.readyState);
  const sendCommand = useWorldStore((state) => state.sendCommand);
  const { toast } = useToast();

  return (command: PlayerCommand) => {
    if (readyState !== ReadyState.OPEN) {
      toast({
        description: "Socket not opened yet",
      });
      return;
    }

    sendCommand(command);
  };
}
