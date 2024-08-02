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
import PageActions from "src/components/PageActions";

export default function GameReadyPage() {
  const gameId = useGameId();
  const activeGame = useWorldStore((state) => state.activeGame);
  const currentPlayer = useWorldStore((state) => state.currentPlayer);
  const readyGame = useReadyGame();
  const startGame = useStartGame();
  const navigate = useNavigate();

  const players = activeGame?.players || [];
  const playersReady = activeGame?.players_ready || {};

  const startDisabled = useMemo(() => {
    return players.some((player) => !playersReady[player]);
  }, [players, playersReady]);

  useSubcribeEvent((lastEvent) => {
    if (lastEvent.type === GameEventType.Start && lastEvent.id === gameId) {
      navigate(`/games/${gameId}`);
    }
  });

  return (
    <PageLayout title={`Game: ${activeGame?.name ?? ""}`}>
      {players.length ? (
        <>
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
                      checked={playersReady[player] ?? false}
                      onCheckedChange={(checked) => {
                        if (checked && gameId) {
                          readyGame(gameId);
                        }
                      }}
                      disabled={
                        currentPlayer !== player || playersReady[player]
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <PageActions>
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
          </PageActions>
        </>
      ) : (
        <CenteredLoading />
      )}
    </PageLayout>
  );
}
