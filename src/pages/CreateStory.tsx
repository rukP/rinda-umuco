import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from "react-i18next";
import { toast } from "@/hooks/use-toast";

const CreateStory = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    toast({
      title: t("create.success"),
      description: t("create.story.successMessage"),
    });
    navigate("/stories");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 p-6">
          <SidebarTrigger />
          
          <div className="max-w-2xl mx-auto">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/create")}
              className="mb-6"
            >
              ← {t("common.back")}
            </Button>

            <h1 className="text-3xl font-bold mb-8">{t("create.story.title")}</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t("create.common.title")}
                </label>
                <Input required />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {t("create.common.description")}
                </label>
                <Textarea required />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {t("create.story.content")}
                </label>
                <Textarea required className="min-h-[300px]" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {t("create.story.lesson")}
                </label>
                <Textarea required />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {t("create.story.image")} ({t("common.optional")})
                </label>
                <Input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files?.[0] || null)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {t("create.common.category")}
                </label>
                <Input required />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {t("create.common.inspiration")}
                </label>
                <Textarea />
              </div>

              <Button type="submit" className="w-full">
                {t("create.common.submit")}
              </Button>
            </form>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default CreateStory;