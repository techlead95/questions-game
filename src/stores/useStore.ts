import { Api } from "src/api";
import Event from "src/models/Event";
import Game from "src/models/Game";
import PlayerCommand from "src/models/PlayerCommand";
import PlayerScore from "src/models/PlayerScore";
import { create } from "zustand";
import handleGamesEvent from "./handleGamesEvent";
import handleActiveGameEvents from "./handleActiveGamesEvent";

export enum ReadyState {
  CONNECTING,
  OPEN,
  CLOSING,
  CLOSED,
  UNINSTANTIATED,
}

export interface StoreState {
  readyState: ReadyState;
  lastEvent: Event | null;
  currentPlayer: string;
  gamesById: Record<string, Game>;
  gamesLoaded: boolean;
  activeGame: ActiveGame | null;
  scores: PlayerScore[];
  errorMessage: string;
  sendCommand: (message: PlayerCommand) => void;
  setReadyState: (status: ReadyState) => void;
  clearErrorMessage: () => void;
  connect: (name: string) => void;
  disconnect: () => void;
}

const api = new Api("http://localhost:8080");

const useStore = create<StoreState>((set, get) => {
  let socket: WebSocket;

  const handleEvent = (event: Event) => {
    set({ lastEvent: event });

    handleGamesEvent(event, set, get);
    handleActiveGameEvents(event, set, get);
  };

  return {
    readyState: ReadyState.UNINSTANTIATED,
    lastEvent: null,
    currentPlayer: "",
    gamesById: {},
    gamesLoaded: false,
    activeGame: null,
    scores: [],
    errorMessage: "",
    sendCommand: (command: PlayerCommand) => {
      if (socket) {
        socket.send(JSON.stringify(command));
      }
    },
    setReadyState: (status: ReadyState) => set({ readyState: status }),
    clearErrorMessage: () => set({ errorMessage: "" }),
    connect: (name: string) => {
      set({ currentPlayer: name });

      socket = new WebSocket(`ws://localhost:8080/connect?name=${name}`);

      socket.onopen = () => {
        set({ readyState: ReadyState.OPEN });
      };

      socket.onmessage = (message) => {
        const data = JSON.parse(message.data);

        if (data.error) {
          set({ errorMessage: data.error });
          return;
        }

        handleEvent(data);
      };

      socket.onclose = () => {
        set({ readyState: ReadyState.CLOSED });
      };

      api.fetchGameList().then((games) => {
        set({
          gamesById: games.reduce<Record<string, Game>>((acc, cur) => {
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
      set({ gamesLoaded: false, gamesById: {}, currentPlayer: "" });
    },
  };
});

export default useStore;
