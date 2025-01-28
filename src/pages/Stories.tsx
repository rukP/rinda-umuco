import { MainLayout } from "@/components/layouts/MainLayout";
import { ContentCard } from "@/components/ContentCard";
import { useContentByType } from "@/hooks/use-content-query";
import { useTranslation } from "react-i18next";

const Stories = () => {
  const { t } = useTranslation();
  const { data: stories, isLoading } = useContentByType("story");

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12 animate-fadeIn">
          <h1 className="text-4xl font-bold text-rwandan-brown mb-4">
            {t("stories.title")}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t("stories.subtitle")}
          </p>
        </header>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-96 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories?.map((story) => (
              <ContentCard key={story.id} content={story} />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Stories;