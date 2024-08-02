import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Input } from "src/components/ui/input";
import useStore from "src/stores/useStore";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
});

export default function ConnectPage() {
  const connect = useStore((state) => state.connect);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    connect(values.name);
  };

  return (
    <PageLayout title="Connect to the World Server">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Connect</Button>
        </form>
      </Form>
    </PageLayout>
  );
}
