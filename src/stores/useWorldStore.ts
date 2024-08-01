import { Api } from "src/api";
import Event from "src/models/Event";
import Game, { GameState } from "src/models/Game";
import { GameEventType } from "src/models/GameEvent";
import PlayerCommand from "src/models/PlayerCommand";
import { create } from "zustand";

export enum ReadyState {
  CONNECTING,
  OPEN,
  CLOSING,
  CLOSED,
  UNINSTANTIATED,
}

interface WorldState {
  readyState: ReadyState;
  games: Record<string, Game>;
  gamesLoaded: boolean;
  lastEvent: Event | null;
  sendCommand: (message: PlayerCommand) => void;
  setReadyState: (status: ReadyState) => void;
  connect: (name: string) => void;
  disconnect: () => void;
}

const api = new Api("http://localhost:8080");

const useWorldStore = create<WorldState>((set, get) => {
  let socket: WebSocket;

  return {
    readyState: ReadyState.UNINSTANTIATED,
    games: {},
    gamesLoaded: false,
    lastEvent: null,
    sendCommand: (command: PlayerCommand) => {
      if (socket) {
        socket.send(JSON.stringify(command));
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

      socket.onmessage = (message) => {
        const event: Event = JSON.parse(message.data);

        set({ lastEvent: event });
        console.log({ event });

        switch (event.type) {
          case GameEventType.Create:
            set({
              games: {
                ...get().games,
                [event.id]: {
                  id: event.id,
                  name: event.payload.name,
                  question_count: event.payload.question_count,
                  state: GameState.Waiting,
                },
              },
            });
            break;
          case GameEventType.PlayerEnter:

          default:
            break;
        }
      };

      socket.onclose = () => {
        set({ readyState: ReadyState.CLOSED });
      };

      api.fetchGameList().then((games) => {
        set({
          games: games.reduce<Record<string, Game>>((acc, cur) => {
            acc[cur.id] = cur;
            return acc;
          }, {}),
          gamesLoaded: true,
        });
      });
    },
    disconnect: () => {
      if (socket) {
        socket.close();
      }
      set({ gamesLoaded: false, games: {} });
    },
  };
});

export default useWorldStore;
