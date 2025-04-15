
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  barCouncilNumber: z.string().min(5, "Bar council number must be at least 5 characters"),
  lawDegree: z.string().min(2, "Please enter your law degree"),
  passoutYear: z.string().regex(/^\d{4}$/, "Please enter a valid year"),
  primaryCourt: z.string().min(2, "Please select your primary court"),
  yearsOfExperience: z.string().min(1, "Please enter years of experience"),
});

export function LawyerProfileForm() {
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      barCouncilNumber: "",
      lawDegree: "",
      passoutYear: "",
      primaryCourt: "",
      yearsOfExperience: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: "Profile Updated",
      description: "Your lawyer profile has been successfully updated.",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="barCouncilNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bar Council Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter your bar council number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="lawDegree"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Law Degree</FormLabel>
              <FormControl>
                <Input placeholder="Enter your law degree" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="passoutYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Year of Passing</FormLabel>
              <FormControl>
                <Input placeholder="YYYY" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="primaryCourt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Primary Court</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your primary court" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="supreme">Supreme Court</SelectItem>
                  <SelectItem value="high">High Court</SelectItem>
                  <SelectItem value="district">District Court</SelectItem>
                  <SelectItem value="sessions">Sessions Court</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="yearsOfExperience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Years of Experience</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">Update Profile</Button>
      </form>
    </Form>
  );
}
