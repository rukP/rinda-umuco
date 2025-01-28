import { MainLayout } from "@/components/layouts/MainLayout";
import { ArtworkForm } from "@/components/forms/ArtworkForm";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CreateArtwork = () => {
  const navigate = useNavigate();

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
        <h1 className="text-3xl font-bold text-rwandan-brown mb-6">Create Artwork</h1>
        <ArtworkForm />
      </div>
    </MainLayout>
  );
};

export default CreateArtwork;