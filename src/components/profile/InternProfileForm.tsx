
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  college: z.string().min(2, "College name is required"),
  address: z.string().min(10, "Please enter your complete address"),
  currentSemester: z.string().min(1, "Current semester is required"),
  previousSemGPA: z.string().regex(/^[0-9]*\.?[0-9]+$/, "Please enter a valid GPA"),
  facultyRecommendation: z.string().min(50, "Faculty recommendation must be at least 50 characters"),
});

export function InternProfileForm() {
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      college: "",
      address: "",
      currentSemester: "",
      previousSemGPA: "",
      facultyRecommendation: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: "Profile Updated",
      description: "Your intern profile has been successfully updated.",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="college"
          render={({ field }) => (
            <FormItem>
              <FormLabel>College Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your college name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>College Address</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter your college address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="currentSemester"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Semester</FormLabel>
              <FormControl>
                <Input type="number" min="1" max="10" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="previousSemGPA"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Previous Semester GPA</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Enter your GPA (e.g., 3.5)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="facultyRecommendation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Faculty Recommendation</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter faculty recommendation letter" 
                  className="min-h-[100px]"
                  {...field} 
                />
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
