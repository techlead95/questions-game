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
import useWorldStore from "src/stores/useWorldStore";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
});

export default function ConnectPage() {
  const connect = useWorldStore((state) => state.connect);

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
    <PageLayout
      title="Connect to the World Server"
      bodyClassName="items-center mt-32"
      hideDisconnect
    >
      <div className="max-w-sm w-full">
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
      </div>
    </PageLayout>
  );
}
