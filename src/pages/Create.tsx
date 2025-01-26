import { useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Palette, Music, BookOpen, Quote } from "lucide-react";

const Create = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const contentTypes = [
    {
      id: 'artwork',
      title: t('create.artwork.title'),
      description: t('create.artwork.description'),
      icon: Palette,
      path: '/create/artwork'
    },
    {
      id: 'music',
      title: t('create.music.title'),
      description: t('create.music.description'),
      icon: Music,
      path: '/create/music'
    },
    {
      id: 'story',
      title: t('create.story.title'),
      description: t('create.story.description'),
      icon: BookOpen,
      path: '/create/story'
    },
    {
      id: 'proverb',
      title: t('create.proverb.title'),
      description: t('create.proverb.description'),
      icon: Quote,
      path: '/create/proverb'
    }
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 p-6">
          <SidebarTrigger />
          
          <div className="max-w-4xl mx-auto">
            <header className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">{t('create.selectType')}</h1>
              <p className="text-lg text-muted-foreground">
                {t('create.selectTypeDescription')}
              </p>
            </header>

            <div className="grid md:grid-cols-2 gap-6">
              {contentTypes.map((type) => (
                <Card 
                  key={type.id}
                  className="cursor-pointer hover:border-primary transition-colors"
                  onClick={() => navigate(type.path)}
                >
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <type.icon className="h-8 w-8 text-primary" />
                      <div>
                        <CardTitle>{type.title}</CardTitle>
                        <CardDescription>{type.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Create;