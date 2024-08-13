import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { GameEventType } from '@/models/GameEvent';

import CenteredLoading from '@/components/CenteredLoading';
import PageActions from '@/components/PageActions';
import PageLayout from '@/components/PageLayout';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import useGameId from '@/hooks/useGameId';
import useReadyGame from '@/hooks/useReadyGame';
import useStartGame from '@/hooks/useStartGame';
import useSubcribeEvent from '@/hooks/useSubcribeEvent';

import useStore from '@/stores/useStore';

export default function GameReadyPage() {
  const gameId = useGameId();
  const activeGame = useStore((state) => state.activeGame);
  const currentPlayer = useStore((state) => state.currentPlayer);
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
    <PageLayout title={`Game: ${activeGame?.name ?? ''}`}>
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
            {currentPlayer === players[0] && (
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
            )}
          </PageActions>
        </>
      ) : (
        <CenteredLoading />
      )}
    </PageLayout>
  );
}
