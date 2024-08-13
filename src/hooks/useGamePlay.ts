import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { GameEventType } from '@/models/GameEvent';
import GameQuestion from '@/models/GameQuestion';

import { useToast } from '@/components/ui/use-toast';

import useStore from '@/stores/useStore';

import useAnswerQuestion from './useAnswerQuestion';
import useGameId from './useGameId';
import useSubcribeEvent from './useSubcribeEvent';

const formSchema = z.object({
  answer: z.string().min(1, {
    message: 'Answer should be selected.',
  }),
});

export default function useGamePlay() {
  const gameId = useGameId();
  const activeGame = useStore((state) => state.activeGame);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      answer: '',
    },
  });

  const [question, setQuestion] = useState<GameQuestion | null>(null);
  const [questionNumber, setQuestionNumber] = useState(0);
  const answerQuestion = useAnswerQuestion();
  const navigate = useNavigate();
  const [tick, setTick] = useState(0);
  const [answered, setAsnwered] = useState(false);
  const currentPlayer = useStore((state) => state.currentPlayer);

  useSubcribeEvent((lastEvent) => {
    if (lastEvent.type === GameEventType.Question) {
      setQuestion(lastEvent.payload);
      form.reset({ answer: '' });
      setTick(0);
      setQuestionNumber((prev) => prev + 1);
      setAsnwered(false);
    }

    if (
      lastEvent.type === GameEventType.End ||
      lastEvent.type === GameEventType.Destroy
    ) {
      navigate(`/games/${gameId}/scores`);
    }

    if (lastEvent.type === GameEventType.PlayerCorrect) {
      if (lastEvent.payload.player === currentPlayer) {
        toast({
          description: 'You answered correctly.',
        });
      } else {
        toast({
          description: `Player ${lastEvent.payload.player} answered correctly.`,
        });
      }
    }

    if (
      lastEvent.type === GameEventType.PlayerIncorrect &&
      lastEvent.payload.player === currentPlayer
    ) {
      toast({
        description: 'You answered incorrectly.',
      });
    }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [questionNumber]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!gameId || !question?.id) {
      return;
    }

    answerQuestion(gameId, Number(values.answer), question.id);
    setAsnwered(true);
  };

  return {
    form,
    activeGame,
    question,
    questionNumber,
    onSubmit,
    tick,
    answered,
  };
}
