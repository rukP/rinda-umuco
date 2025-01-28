import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(2, "Category is required"),
  content: z.string().min(50, "Story content must be at least 50 characters"),
  lesson: z.string().min(10, "Moral lesson must be at least 10 characters"),
  image: z.any(),
  inspiration: z.string().optional(),
});

export function StoryForm() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      content: "",
      lesson: "",
      inspiration: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("No session");

      let imageUrl = "";
      if (values.image?.[0]) {
        const file = values.image[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { error: uploadError, data } = await supabase.storage
          .from('stories')
          .upload(fileName, file);

        if (uploadError) throw uploadError;
        if (data) imageUrl = data.path;
      }

      const { error } = await supabase.from('content').insert({
        type: 'story',
        title: values.title,
        description: values.description,
        category: values.category,
        content: values.content,
        lesson: values.lesson,
        image: imageUrl,
        inspiration: values.inspiration,
        user_id: session.user.id,
        author: session.user.email,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Story created successfully",
      });
      
      navigate("/stories");
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to create story. Please try again.",
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
                <Input placeholder="Enter story title" {...field} />
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
                <Textarea placeholder="Brief description of your story" {...field} />
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
                <Input placeholder="E.g., Folk Tale, Modern Story, etc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Story Content</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Write your story here..." 
                  className="min-h-[200px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lesson"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Moral Lesson</FormLabel>
              <FormControl>
                <Textarea placeholder="What is the moral lesson of your story?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field: { onChange, ...field } }) => (
            <FormItem>
              <FormLabel>Cover Image (Optional)</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => onChange(e.target.files)}
                  {...field}
                />
              </FormControl>
              <FormMessage />
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
                <Textarea placeholder="What inspired this story?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Story"}
        </Button>
      </form>
    </Form>
  );
}