import { MainLayout } from "@/components/layouts/MainLayout";
import { ArtworkForm } from "@/components/forms/ArtworkForm";

const CreateArtwork = () => {
  return (
    <MainLayout>
      <div className="container max-w-4xl py-8 animate-fadeIn">
        <h1 className="text-3xl font-bold text-rwandan-brown mb-6">Create Artwork</h1>
        <ArtworkForm />
      </div>
    </MainLayout>
  );
};

export default CreateArtwork;