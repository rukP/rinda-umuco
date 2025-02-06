
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Music, ChevronLeft } from "lucide-react";
import { MainLayout } from "@/components/layouts/MainLayout";
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
import { useCreateHub } from "@/hooks/use-hubs";
import { useAuth } from "@/hooks/use-auth";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  location: z.string().optional(),
  website: z.string().url().optional().or(z.literal("")),
});

type FormValues = z.infer<typeof formSchema>;

const CreateMusicGroup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const createHub = useCreateHub();
  const { session } = useAuth();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      location: "",
      website: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    if (!session?.user?.id) {
      toast({
        title: "Error",
        description: "You must be logged in to create a hub",
        variant: "destructive",
      });
      return;
    }

    try {
      await createHub.mutateAsync({
        name: values.name,
        description: values.description,
        location: values.location,
        website: values.website,
        type: "music_group",
        admin_id: session.user.id,
      });
      
      toast({
        title: "Success",
        description: "Music group created successfully",
      });
      
      navigate("/hubs");
    } catch (error) {
      console.error("Error creating music group:", error);
      toast({
        title: "Error",
        description: "Failed to create music group. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <MainLayout>
      <div className="container max-w-2xl py-8 animate-fadeIn">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="flex items-center gap-4 mb-8">
          <Music className="h-8 w-8 text-green