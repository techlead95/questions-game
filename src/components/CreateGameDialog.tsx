import { z } from "zod";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import useCreateGame from "src/hooks/useCreateGame";
import useStartGame from "src/hooks/useStartGame";
import { useNavigate } from "react-router-dom";
import useWorldStore from "src/stores/useWorldStore";
import { useEffect, useState } from "react";
import { GameEventType } from "src/models/GameEvent";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  questionCount: z
    .number()
    .int()
    .min(1, { message: "Question count should be greater than 0." }),
});

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CreateGameDialog({ open, onOpenChange }: Props) {
  const createGame = useCreateGame();
  const startGame = useStartGame();
  const navigate = useNavigate();
  const lastEvent = useWorldStore((state) => state.lastEvent);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      questionCount: 0,
    },
  });

  useEffect(() => {
    if (lastEvent?.type === GameEventType.PlayerEnter) {
      if (lastEvent.payload.name === form.getValues().name) {
        startGame(lastEvent.id);
        navigate(`/games/${lastEvent.id}`);
      }
    }
  }, [lastEvent]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    createGame(values.name, values.questionCount);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DialogHeader>
              <DialogTitle>Create Game</DialogTitle>
              <DialogDescription className="hidden">
                Create a new game
              </DialogDescription>
            </DialogHeader>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="questionCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question Count</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      value={field.value || ""}
                      pattern="[0-9]*"
                      onChange={(e) =>
                        e.target.validity.valid &&
                        field.onChange(Number(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Create</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
