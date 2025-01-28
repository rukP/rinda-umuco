import { MainLayout } from "@/components/layouts/MainLayout";
import { StoryForm } from "@/components/forms/StoryForm";

const CreateStory = () => {
  return (
    <MainLayout>
      <div className="container max-w-4xl py-8 animate-fadeIn">
        <h1 className="text-3xl font-bold text-rwandan-brown mb-6">Create Story</h1>
        <StoryForm />
      </div>
    </MainLayout>
  );
};

export default CreateStory;