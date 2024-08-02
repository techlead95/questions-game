import { useState } from "react";
import CenteredLoading from "src/components/CenteredLoading";
import CreateGameDialog from "src/components/CreateGameDialog";
import PageActions from "src/components/PageActions";
import PageLayout from "src/components/PageLayout";
import { Button } from "src/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "src/components/ui/table";
import useJoinGame from "src/hooks/useJoinGame";
import useStore from "src/stores/useStore";
import { useNavigate } from "react-router-dom";
import { GameEventType } from "src/models/GameEvent";
import useSubcribeEvent from "src/hooks/useSubcribeEvent";
import { GameState } from "src/models/Game";

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
