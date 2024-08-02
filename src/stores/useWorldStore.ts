import { Api } from "src/api";
import Event from "src/models/Event";
import Game, { GameState } from "src/models/Game";
import { GameEventType } from "src/models/GameEvent";
import PlayerCommand from "src/models/PlayerCommand";
import PlayerScore from "src/models/PlayerScore";
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
  lastEvent: Event | null;
  currentPlayer: string;
  games: Game[];
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

const useWorldStore = create<WorldState>((set, get) => {
  let socket: WebSocket;

  return {
    readyState: ReadyState.UNINSTANTIATED,
    lastEvent: null,
    currentPlayer: "",
    games: [],
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
        const messageData = JSON.parse(message.data);

        if (messageData.error) {
          set({ errorMessage: messageData.error });
          return;
        }

        const event: Event = messageData;
        set({ lastEvent: event });

        console.log({ event });

        const activeGame = get().activeGame;

        switch (event.type) {
          case GameEventType.Create:
            set({
              games: get().games.concat({
                id: event.id,
                name: event.payload.name,
                question_count: event.payload.question_count,
                state: GameState.Waiting,
              }),
            });
            break;
          case GameEventType.PlayerEnter:
            set({
              activeGame: event.payload,
            });
            break;
          case GameEventType.PlayerJoin:
            if (activeGame) {
              set({
                activeGame: {
                  ...activeGame,
                  players: activeGame.players.concat(event.payload.player),
                },
              });
            }
            break;
          case GameEventType.PlayerReady:
            if (activeGame) {
              set({
                activeGame: {
                  ...activeGame,
                  players_ready: {
                    ...activeGame.players_ready,
                    [event.payload.player]: true,
                  },
                },
              });
            }
            break;
          case GameEventType.End:
            set({
              scores: event.payload.scores,
            });
            break;
          default:
            break;
        }
      };

      socket.onclose = () => {
        set({ readyState: ReadyState.CLOSED });
      };

      api.fetchGameList().then((games) => {
        set({
          games,
          gamesLoaded: true,
        });
      });
    },
    disconnect: () => {
      if (socket) {
        socket.close();
      }
      set({ gamesLoaded: false, games: [] });
    },
  };
});

export default useWorldStore;
