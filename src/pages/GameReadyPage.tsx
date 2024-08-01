import { useNavigate } from "react-router-dom";
import PageLayout from "src/components/PageLayout";
import useWorldStore from "src/stores/useWorldStore";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "src/components/ui/table";
import CenteredLoading from "src/components/CenteredLoading";
import { Checkbox } from "src/components/ui/checkbox";
import useReadyGame from "src/hooks/useReadyGame";
import { Button } from "src/components/ui/button";
import useStartGame from "src/hooks/useStartGame";
import { useMemo } from "react";
import useSubcribeEvent from "src/hooks/useSubcribeEvent";
import { GameEventType } from "src/models/GameEvent";
import useGameId from "src/hooks/useGameId";

export default function GameReadyPage() {
  const gameId = useGameId();
  const game = useWorldStore((state) => (gameId ? state.games[gameId] : null));
  const currentPlayer = useWorldStore((state) => state.currentPlayer);
  const readyGame = useReadyGame();
  const startGame = useStartGame();
  const navigate = useNavigate();

  const players = game?.players || [];
  const playerReady = game?.player_ready || {};

  const startDisabled = useMemo(() => {
    return players.some((player) => !playerReady[player]);
  }, [players, playerReady]);

  useSubcribeEvent((lastEvent) => {
    if (lastEvent.type === GameEventType.Start && lastEvent.id === gameId) {
      navigate(`/games/${gameId}`);
    }
  });

  return (
    <PageLayout
      title={`Game: ${game?.name ?? ""}`}
      pageActions={
        <Button
          disabled={startDisabled}
          onClick={() => {
            if (gameId) {
              startGame(gameId);
            }
          }}
        >
          Start Game
        </Button>
      }
    >
      {!players.length ? (
        <CenteredLoading />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Player</TableHead>
              <TableHead>Ready</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {players.map((player) => (
              <TableRow key={player}>
                <TableCell>{player}</TableCell>
                <TableCell>
                  <Checkbox
                    checked={playerReady[player] ?? false}
                    onCheckedChange={(checked) => {
                      if (checked && gameId) {
                        readyGame(gameId);
                      }
                    }}
                    disabled={currentPlayer !== player || playerReady[player]}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </PageLayout>
  );
}
