import { Skeleton } from "@/components/ui/skeleton";

export function ProfileSkeleton() {
  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-32 w-32 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-8 w-[250px]" />
          <Skeleton className="h-4 w-[300px]" />
        </div>
      </div>
    </div>
  );
}