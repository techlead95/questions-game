import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import CenteredLoading from "src/components/CenteredLoading";
import PageLayout from "src/components/PageLayout";
import { Button } from "src/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "src/components/ui/form";
import { Label } from "src/components/ui/label";
import { RadioGroup, RadioGroupItem } from "src/components/ui/radio-group";
import useAnswerQuestion from "src/hooks/useAnswerQuestion";
import useGameId from "src/hooks/useGameId";
import useSubcribeEvent from "src/hooks/useSubcribeEvent";
import { GameEventType } from "src/models/GameEvent";
import GameQuestion from "src/models/GameQuestion";
import useWorldStore from "src/stores/useWorldStore";
import { z } from "zod";

const formSchema = z.object({
  answer: z.string().min(1, { message: "Please select an answer." }),
});

export default function GamePlayPage() {
  const gameId = useGameId();
  const game = useWorldStore((state) => (gameId ? state.games[gameId] : null));
  const [question, setQuestion] = useState<GameQuestion | null>(null);
  const answerQuestion = useAnswerQuestion();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      answer: "",
    },
  });

  useSubcribeEvent((lastEvent) => {
    if (lastEvent.type === GameEventType.Question) {
      setQuestion(lastEvent.payload);
      form.reset({ answer: "" });
    }
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!gameId || !question) {
      return;
    }

    answerQuestion(gameId, Number(values.answer), question.id);
  };

  return (
    <PageLayout title={`Game: ${game?.name ?? ""}`}>
      {question ? (
        <div>
          <h1>{question.question}</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="answer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <RadioGroup {...field}>
                        {question.options.map((option, index) => (
                          <div
                            key={option}
                            className="flex items-center space-x-2"
                          >
                            <RadioGroupItem
                              value={String(index)}
                              id={`${question.id}-${index}`}
                            />
                            <Label htmlFor={`${question.id}-${index}`}>
                              {option}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Next</Button>
            </form>
          </Form>
        </div>
      ) : (
        <CenteredLoading />
      )}
    </PageLayout>
  );
}
