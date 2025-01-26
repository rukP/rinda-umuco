import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useTranslation } from "react-i18next";
import { toast } from "@/hooks/use-toast";

const CreateMusic = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isDance, setIsDance] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    toast({
      title: t("create.success"),
      description: t("create.music.successMessage"),
    });
    navigate("/music");
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

            <h1 className="text-3xl font-bold mb-8">{t("create.music.title")}</h1>

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
                  {t("create.music.lyrics")}
                </label>
                <Textarea required className="min-h-[200px]" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {t("create.music.mediaUrl")}
                </label>
                <Input placeholder="YouTube URL or audio file link" />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="isDance" 
                  checked={isDance}
                  onCheckedChange={(checked) => setIsDance(checked as boolean)}
                />
                <label 
                  htmlFor="isDance" 
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {t("create.music.isDance")}
                </label>
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

export default CreateMusic;