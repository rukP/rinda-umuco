import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(2, "Category is required"),
  mediaUrl: z.string().url("Please enter a valid URL"),
  lyrics: z.string().optional(),
  isDance: z.boolean().default(false),
  inspiration: z.string().optional(),
});

export function MusicForm() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      mediaUrl: "",
      lyrics: "",
      isDance: false,
      inspiration: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("No session");

      const { error } = await supabase.from('content').insert({
        type: 'music',
        title: values.title,
        description: values.description,
        category: values.category,
        mediaUrl: values.mediaUrl,
        lyrics: values.lyrics,
        isDance: values.isDance,
        inspiration: values.inspiration,
        user_id: session.user.id,
        author: session.user.email,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Music created successfully",
      });
      
      navigate("/music");
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to create music. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter music title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe your music" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input placeholder="E.g., Traditional, Modern, etc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mediaUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Media URL (YouTube or Audio URL)</FormLabel>
              <FormControl>
                <Input placeholder="Enter media URL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lyrics"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lyrics (Optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter song lyrics" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isDance"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel>Dance Music</FormLabel>
                <div className="text-sm text-muted-foreground">
                  Is this a dance music piece?
                </div>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="inspiration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Inspiration (Optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="What inspired this music?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Music"}
        </Button>
      </form>
    </Form>
  );
}