import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PhoneInput } from "@/components/ui/phone-input";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";

const FormSchema = z.object({
  phone: z.string().refine(isValidPhoneNumber, { message: "Invalid phone number" }),
});

export default function Showcase() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      phone: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <>
        <div id="try" className="w-full py-8">
          <div className="w-full relative my-4 flex flex-col space-y-2">
            <div className="preview flex min-h-[350px] w-full justify-center p-10 items-start mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 relative rounded-md border">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col items-start">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem className="flex flex-col items-start">
                        <FormLabel className="text-left">Phone Number</FormLabel>
                        <FormControl className="w-full">
                          <PhoneInput placeholder="Enter a phone number" {...field} />
                        </FormControl>
                        <FormDescription className="text-left">Enter a phone number</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <pre>
                    <code className="text-foreground">{JSON.stringify(form.watch("phone"), null, 2)}</code>
                </pre>
                
                <div className="flex flex-row gap-3">
                  <Button type="submit">Submit</Button>
                  <ModeToggle />
                </div>
                  
                </form>
              </Form>
            </div>
          </div>
        </div>
    </>
  );
}
