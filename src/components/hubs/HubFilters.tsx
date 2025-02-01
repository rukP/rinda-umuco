import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import type { HubType } from "@/types/hub";

interface HubFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  typeFilter: HubType | "all";
  onTypeFilterChange: (value: HubType | "all") => void;
}

export function HubFilters({
  search,
  onSearchChange,
  typeFilter,
  onTypeFilterChange,
}: HubFiltersProps) {
  return (
    <div className="mb-6 flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search hubs..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>
      <Select value={typeFilter} onValueChange={onTypeFilterChange}>
        <SelectTrigger className="w-full sm:w-[200px]">
          <SelectValue placeholder="Filter by type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="art_gallery">Art Gallery</SelectItem>
          <SelectItem value="dance_group">Dance Group</SelectItem>
          <SelectItem value="music_group">Music Group</SelectItem>
          <SelectItem value="cultural_organization">Cultural Organization</SelectItem>
          <SelectItem value="other">Other</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}