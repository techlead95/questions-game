import { useState } from "react";
import CenteredLoading from "src/components/CenteredLoading";
import CreateGameDialog from "src/components/CreateGameDialog";
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
import useWorldStore from "src/stores/useWorldStore";

export default function GameListPage() {
  const gamesLoaded = useWorldStore((state) => state.gamesLoaded);
  const games = useWorldStore((state) => state.games);
  const joinGame = useJoinGame();
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <PageLayout
      title="Games"
      pageActions={
        <Button onClick={() => setCreateOpen(true)}>New Game</Button>
      }
    >
      {!gamesLoaded ? (
        <CenteredLoading />
      ) : (
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
                    <Button variant="outline" onClick={() => joinGame(game.id)}>
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
      )}
      <CreateGameDialog open={createOpen} onOpenChange={setCreateOpen} />
    </PageLayout>
  );
}
