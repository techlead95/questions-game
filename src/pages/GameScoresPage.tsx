import { useNavigate } from 'react-router-dom';

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

import useStore from '@/stores/useStore';

export default function GameScoresPage() {
  const activeGame = useStore((state) => state.activeGame);
  const scores = useStore((state) => state.scores);
  const navigate = useNavigate();

  return (
    <PageLayout title={`Game Scores: ${activeGame?.name ?? ''}`}>
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

      <PageActions>
        <Button onClick={() => navigate('/games')}>Return</Button>
      </PageActions>
    </PageLayout>
  );
}
