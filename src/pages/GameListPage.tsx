import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { GameState } from '@/models/Game';
import { GameEventType } from '@/models/GameEvent';

import CenteredLoading from '@/components/CenteredLoading';
import CreateGameDialog from '@/components/CreateGameDialog';
import PageActions from '@/components/PageActions';
import PageLayout from '@/components/PageLayout';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import useJoinGame from '@/hooks/useJoinGame';
import useSubcribeEvent from '@/hooks/useSubcribeEvent';

import useStore from '@/stores/useStore';

export default function GameListPage() {
  const gamesLoaded = useStore((state) => state.gamesLoaded);
  const games = useStore((state) => Object.values(state.gamesById));
  const joinGame = useJoinGame();
  const [createOpen, setCreateOpen] = useState(false);
  const navigate = useNavigate();
  const disconnect = useStore((state) => state.disconnect);

  useSubcribeEvent((lastEvent) => {
    if (lastEvent.type === GameEventType.PlayerEnter) {
      navigate(`/games/${lastEvent.id}/ready`);
    }
  });

  return (
    <PageLayout title="Games">
      {!gamesLoaded ? (
        <CenteredLoading />
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Question Count</TableHead>
                <TableHead>State</TableHead>
                <TableHead className="w-0" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.values(games)
                .filter((game) => game.id)
                .map((game) => (
                  <TableRow key={game.id}>
                    <TableCell>{game.name}</TableCell>
                    <TableCell>{game.question_count}</TableCell>
                    <TableCell>{game.state}</TableCell>
                    <TableCell>
                      <Button
                        disabled={game.state !== GameState.Waiting}
                        variant="outline"
                        onClick={() => joinGame(game.id)}
                      >
                        Join
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              {!games.length && (
                <TableRow>
                  <TableCell colSpan={4}>No games available.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <PageActions>
            <Button onClick={() => setCreateOpen(true)}>New Game</Button>
            <Button variant="outline" onClick={() => disconnect()}>
              Disconnect
            </Button>
          </PageActions>
        </>
      )}
      <CreateGameDialog open={createOpen} onOpenChange={setCreateOpen} />
    </PageLayout>
  );
}
