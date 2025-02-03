
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import type { Hub } from "@/types/hub";

interface EditHubFormProps {
  hub: Hub;
  onSuccess: () => void;
}

export function EditHubForm({ hub, onSuccess }: EditHubFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: hub.name,
      description: hub.description || "",
      location: hub.location || "",
      website: hub.website || "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      toast({
        title: "Success",
        description: "Hub updated successfully",
      });
      onSuccess();
    } catch (error) {
      console.error("Error updating hub:", error);
      toast({
        title: "Error",
        description: "Failed to update hub",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input
          {...register("name", { required: "Name is required" })}
          placeholder="Hub name"
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Textarea
          {...register("description")}
          placeholder="Description"
          className="min-h-[100px]"
        />
      </div>

      <div>
        <Input
          {...register("location")}
          placeholder="Location"
        />
      </div>

      <div>
        <Input
          {...register("website")}
          placeholder="Website"
          type="url"
        />
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Updating..." : "Update Hub"}
      </Button>
    </form>
  );
}
