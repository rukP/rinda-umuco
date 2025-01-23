import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

const Create = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Content submitted",
      description: "Your contribution has been received and will be reviewed shortly.",
    });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 p-6">
          <SidebarTrigger />
          
          <div className="max-w-3xl mx-auto">
            <header className="text-center mb-12 animate-fadeIn">
              <h1 className="text-4xl font-bold text-rwandan-brown mb-4">
                Share Your Cultural Contribution
              </h1>
              <p className="text-lg text-muted-foreground">
                Help preserve and share Rwanda's rich cultural heritage
              </p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">Title</label>
                <Input id="title" placeholder="Enter the title of your work" required />
              </div>

              <div className="space-y-2">
                <label htmlFor="category" className="text-sm font-medium">Category</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="artwork">Artwork</SelectItem>
                    <SelectItem value="music">Music</SelectItem>
                    <SelectItem value="story">Story</SelectItem>
                    <SelectItem value="proverb">Proverb</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">Description</label>
                <Textarea 
                  id="description" 
                  placeholder="Tell us about your contribution..." 
                  className="min-h-[150px]"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="file" className="text-sm font-medium">Upload File (optional)</label>
                <Input id="file" type="file" className="cursor-pointer" />
              </div>

              <Button type="submit" className="w-full">
                Submit Contribution
              </Button>
            </form>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Create;