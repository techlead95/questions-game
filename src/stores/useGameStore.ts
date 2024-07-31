import { GameEvent } from "src/models/game-events";
import { create } from "zustand";

export enum ReadyState {
  CONNECTING,
  OPEN,
  CLOSING,
  CLOSED,
  UNINSTANTIATED,
}

interface GameState {
  readyState: ReadyState;
  messages: any[];
  sendEvent: (message: Message) => void;
  setReadyState: (status: ReadyState) => void;
  connect: (name: string) => void;
}

type Message = any;

const useGameStore = create<GameState>((set) => {
  let socket: WebSocket;

  return {
    messages: [],
    readyState: ReadyState.UNINSTANTIATED,
    sendEvent: (event: GameEvent) => {
      if (socket && socket.readyState === ReadyState.OPEN) {
        socket.send(JSON.stringify(event));
      }
    },
    setReadyState: (status: ReadyState) => set({ readyState: status }),
    connect: (name: string) => {
      if (socket) {
        socket.close();
      }

      socket = new WebSocket(`ws://localhost:8080/connect?name=${name}`);

      socket.onopen = () => {
        set({ readyState: ReadyState.OPEN });
      };

      socket.onmessage = (event) => {
        const message = JSON.parse(event.data);

        set((state) => ({
          messages: [...state.messages, message],
        }));
      };

      socket.onclose = () => {
        set({ readyState: ReadyState.CLOSED });
      };
    },
    disconnect: () => {
      if (socket) {
        socket.close();
      }
    },
  };
});

export default useGameStore;
