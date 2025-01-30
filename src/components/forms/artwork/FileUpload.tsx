import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ArtworkFormValues } from "./types";

interface FileUploadProps {
  form: UseFormReturn<ArtworkFormValues>;
}

export const FileUpload = ({ form }: FileUploadProps) => {
  return (
    <FormField
      control={form.control}
      name="image"
      render={() => (
        <FormItem>
          <FormLabel>Image</FormLabel>
          <FormControl>
            <Input
              type="file"
              accept="image/*"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};