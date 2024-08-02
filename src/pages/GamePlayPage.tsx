import { useEffect, useState } from "react";
import CenteredLoading from "src/components/CenteredLoading";
import PageLayout from "src/components/PageLayout";
import { Label } from "src/components/ui/label";
import { Progress } from "src/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "src/components/ui/radio-group";
import useAnswerQuestion from "src/hooks/useAnswerQuestion";
import useGameId from "src/hooks/useGameId";
import useSubcribeEvent from "src/hooks/useSubcribeEvent";
import { GameEventType } from "src/models/GameEvent";
import GameQuestion from "src/models/GameQuestion";
import useWorldStore from "src/stores/useWorldStore";

export default function GamePlayPage() {
  const gameId = useGameId();
  const game = useWorldStore((state) => (gameId ? state.games[gameId] : null));
  const [question, setQuestion] = useState<GameQuestion | null>(null);
  const [answer, setAnswer] = useState("");
  const answerQuestion = useAnswerQuestion();
  const [tick, setTick] = useState(0);

  useSubcribeEvent((lastEvent) => {
    if (lastEvent.type === GameEventType.Question) {
      setQuestion(lastEvent.payload);
      setAnswer("");
      setTick(0);
    }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((prev) => prev + 1);
    }, 1000);

    if (answer && gameId && question) {
      answerQuestion(gameId, Number(answer), question.id);
    }

    return () => {
      clearInterval(interval);
    };
  }, [answer]);

  return (
    <PageLayout title={`Game: ${game?.name ?? ""}`}>
      {question ? (
        <>
          <Progress value={(tick * 100) / question.seconds} />
          <Label htmlFor="question-option">{question.question}</Label>
          <RadioGroup
            id="question-options"
            value={answer}
            onValueChange={(value) => setAnswer(value)}
          >
            {question.options.map((option, index) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={String(index)}
                  id={`question-option-${index}`}
                />
                <Label htmlFor={`question-option-${index}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </>
      ) : (
        <CenteredLoading />
      )}
    </PageLayout>
  );
}
