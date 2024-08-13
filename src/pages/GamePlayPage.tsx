import CenteredLoading from '@/components/CenteredLoading';
import PageLayout from '@/components/PageLayout';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import useGamePlay from '@/hooks/useGamePlay';

export default function GamePlayPage() {
  const {
    form,
    activeGame,
    question,
    questionNumber,
    onSubmit,
    tick,
    answered,
  } = useGamePlay();

  return (
    <PageLayout title={`Game: ${activeGame?.name ?? ''}`}>
      {activeGame && question ? (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-2">
                <div className="text-right">
                  Question {questionNumber} of {activeGame.question_count}
                </div>
                <Progress value={(tick * 100) / question.seconds} />
              </div>
              <FormField
                control={form.control}
                name="answer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{question.question}</FormLabel>
                    <FormControl>
                      <RadioGroup
                        disabled={answered}
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        {question.options.map((option, index) => (
                          <div
                            key={option}
                            className="flex items-center space-x-2"
                          >
                            <RadioGroupItem
                              value={String(index)}
                              id={`question-option-${index}`}
                            />
                            <Label htmlFor={`question-option-${index}`}>
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
              <Button type="submit" disabled={answered}>
                Submit
              </Button>
            </form>
          </Form>
        </>
      ) : (
        <CenteredLoading />
      )}
    </PageLayout>
  );
}
