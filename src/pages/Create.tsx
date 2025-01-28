import { MainLayout } from "@/components/layouts/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Image, Music, BookOpen, ChevronLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

const Create = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const contentTypes = [
    {
      title: "Create Artwork",
      description: "Share your visual art with the community",
      icon: Image,
      href: "/create/artwork",
      color: "text-rwandan-brown",
    },
    {
      title: "Create Music",
      description: "Share your musical creations and performances",
      icon: Music,
      href: "/create/music",
      color: "text-rwandan-terracotta",
    },
    {
      title: "Create Story",
      description: "Share your stories and cultural narratives",
      icon: BookOpen,
      href: "/create/story",
      color: "text-rwandan-red",
    },
  ];

  return (
    <MainLayout>
      <div className="container max-w-4xl py-8 animate-fadeIn">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <header className="text-center space-y-4 mb-8">
          <h1 className="text-4xl font-bold text-rwandan-brown">
            Create Content
          </h1>
          <p className="text-lg text-muted-foreground">
            Choose the type of content you want to create
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
                    Get Started
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