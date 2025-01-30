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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const musicFormSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(2, "Category is required"),
  mediaUrl: z.string().url("Please enter a valid URL"),
  lyrics: z.string().optional(),
  isDance: z.boolean().default(false),
  inspiration: z.string().optional(),
});

const poetryFormSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(2, "Category is required"),
  verses: z.string().min(10, "Verses must be at least 10 characters"),
  inspiration: z.string().optional(),
});

export function MusicForm() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contentType, setContentType] = useState<'music' | 'poetry'>('music');

  const musicForm = useForm<z.infer<typeof musicFormSchema>>({
    resolver: zodResolver(musicFormSchema),
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

  const poetryForm = useForm<z.infer<typeof poetryFormSchema>>({
    resolver: zodResolver(poetryFormSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      verses: "",
      inspiration: "",
    },
  });

  const onSubmitMusic = async (values: z.infer<typeof musicFormSchema>) => {
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

  const onSubmitPoetry = async (values: z.infer<typeof poetryFormSchema>) => {
    try {
      setIsSubmitting(true);
      
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("No session");

      const { error } = await supabase.from('content').insert({
        type: 'poetry',
        title: values.title,
        description: values.description,
        category: values.category,
        verses: values.verses,
        inspiration: values.inspiration,
        user_id: session.user.id,
        author: session.user.email,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Poetry created successfully",
      });
      
      navigate("/music");
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to create poetry. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Tabs defaultValue="music" onValueChange={(value) => setContentType(value as 'music' | 'poetry')}>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="music">Music</TabsTrigger>
        <TabsTrigger value="poetry">Poetry</TabsTrigger>
      </TabsList>

      <TabsContent value="music">
        <Form {...musicForm}>
          <form onSubmit={musicForm.handleSubmit(onSubmitMusic)} className="space-y-6">
            <FormField
              control={musicForm.control}
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
              control={musicForm.control}
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
              control={musicForm.control}
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
              control={musicForm.control}
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
              control={musicForm.control}
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
              control={musicForm.control}
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
              control={musicForm.control}
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
      </TabsContent>

      <TabsContent value="poetry">
        <Form {...poetryForm}>
          <form onSubmit={poetryForm.handleSubmit(onSubmitPoetry)} className="space-y-6">
            <FormField
              control={poetryForm.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter poetry title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={poetryForm.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe your poetry" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={poetryForm.control}
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
              control={poetryForm.control}
              name="verses"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verses</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter your poetry verses" {...field} rows={10} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={poetryForm.control}
              name="inspiration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Inspiration (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="What inspired this poetry?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Poetry"}
            </Button>
          </form>
        </Form>
      </TabsContent>
    </Tabs>
  );
}