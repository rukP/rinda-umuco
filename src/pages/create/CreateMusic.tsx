import { MainLayout } from "@/components/layouts/MainLayout";
import { MusicForm } from "@/components/forms/MusicForm";

const CreateMusic = () => {
  return (
    <MainLayout>
      <div className="container max-w-4xl py-8 animate-fadeIn">
        <h1 className="text-3xl font-bold text-rwandan-brown mb-6">Create Music</h1>
        <MusicForm />
      </div>
    </MainLayout>
  );
};

export default CreateMusic;