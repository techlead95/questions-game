import PageLayout from "src/components/PageLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "src/components/ui/table";
import useWorldStore from "src/stores/useWorldStore";

export default function GameScoresPage() {
  const activeGame = useWorldStore((state) => state.activeGame);
  const scores = useWorldStore((state) => state.scores);

  return (
    <PageLayout title={`Game Scores: ${activeGame?.name ?? ""}`}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Player</TableHead>
            <TableHead>Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {scores.map((score) => (
            <TableRow key={score.name}>
              <TableCell>{score.name}</TableCell>
              <TableCell>{score.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </PageLayout>
  );
}
