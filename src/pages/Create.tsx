import { MainLayout } from "@/components/layouts/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Image, Music, BookOpen } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Create = () => {
  const { t } = useTranslation();

  const contentTypes = [
    {
      title: t("create.artwork"),
      description: t("create.artworkDesc"),
      icon: Image,
      href: "/create/artwork",
      color: "text-rwandan-brown",
    },
    {
      title: t("create.music"),
      description: t("create.musicDesc"),
      icon: Music,
      href: "/create/music",
      color: "text-rwandan-terracotta",
    },
    {
      title: t("create.story"),
      description: t("create.storyDesc"),
      icon: BookOpen,
      href: "/create/story",
      color: "text-rwandan-red",
    },
  ];

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-rwandan-brown">
            {t("create.title")}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t("create.subtitle")}
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contentTypes.map((type) => (
            <Card 
              key={type.title}
              className="hover:shadow-lg transition-shadow"
            >
              <Link to={type.href}>
                <CardHeader>
                  <type.icon className={`h-8 w-8 ${type.color}`} />
                  <CardTitle className="text-xl">{type.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{type.description}</p>
                  <Button className="mt-4 w-full">
                    {t("create.start")}
                  </Button>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Create;