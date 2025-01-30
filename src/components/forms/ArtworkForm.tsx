import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { ArtworkFormFields } from "./artwork/ArtworkFormFields";
import { FileUpload } from "./artwork/FileUpload";
import { ArtworkFormValues, artworkFormSchema } from "./artwork/types";

export function ArtworkForm() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ArtworkFormValues>({
    resolver: zodResolver(artworkFormSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      inspiration: "",
    },
  });

  const handleImageUpload = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const { error: uploadError, data } = await supabase.storage
      .from('artwork')
      .upload(fileName, file);

    if (uploadError) throw uploadError;
    
    if (data) {
      const { data: { publicUrl } } = supabase.storage
        .from('artwork')
        .getPublicUrl(data.path);
      return publicUrl;
    }
    return "";
  };

  const onSubmit = async (values: ArtworkFormValues) => {
    try {
      setIsSubmitting(true);
      
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("No session");

      let imageUrl = "";
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      const file = fileInput?.files?.[0];
      
      if (file) {
        imageUrl = await handleImageUpload(file);
      }

      const { error } = await supabase.from('content').insert({
        type: 'artwork',
        title: values.title,
        description: values.description,
        category: values.category,
        image: imageUrl,
        inspiration: values.inspiration,
        user_id: session.user.id,
        author: session.user.email,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Artwork created successfully",
      });
      
      navigate("/artwork");
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to create artwork. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <ArtworkFormFields form={form} />
        <FileUpload form={form} />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Artwork"}
        </Button>
      </form>
    </Form>
  );
}