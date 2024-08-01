import PageLayout from "src/components/PageLayout";
import useGameId from "src/hooks/useGameId";
import useWorldStore from "src/stores/useWorldStore";

export default function GamePlayPage() {
  const gameId = useGameId();
  const game = useWorldStore((state) => (gameId ? state.games[gameId] : null));

  if (!game) {
    return null;
  }

  return <PageLayout title="Game"></PageLayout>;
}
