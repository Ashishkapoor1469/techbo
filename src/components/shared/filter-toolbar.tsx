"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FilterIcon, SearchIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";

interface FilterToolbarProps {
  onSearchChange?: (query: string) => void;
  searchPlaceholder?: string;
  // TODO: Add filter options and callbacks
}

export function FilterToolbar({
  onSearchChange,
  searchPlaceholder = "Search...",
}: FilterToolbarProps) {
  const [showStatusBar, setShowStatusBar] = React.useState(true); // Example filter
  const [showActivityBar, setShowActivityBar] = React.useState(false); // Example filter

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 mb-8 p-4 bg-card rounded-xl shadow">
      <div className="relative flex-grow w-full sm:w-auto">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder={searchPlaceholder}
          className="pl-10 w-full"
          onChange={(e) => onSearchChange?.(e.target.value)}
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full sm:w-auto">
            <FilterIcon className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Appearance</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={showStatusBar}
            onCheckedChange={setShowStatusBar}
          >
            Status Bar
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={showActivityBar}
            onCheckedChange={setShowActivityBar}
            disabled
          >
            Activity Bar
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
          // checked={showPanel} Example
          // onCheckedChange={setShowPanel} Example
          >
            Panel
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
