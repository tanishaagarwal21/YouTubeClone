"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export default function FilterButtons() {
  const [activeFilter, setActiveFilter] = useState("All")

  const filters = [
    "All",
    "Music",
    "Gaming",
    "Programming",
    "React",
    "JavaScript",
    "Computer Science",
    "Comedy",
    "Podcasts",
    "Recently uploaded",
    "Live",
    "News",
    "Cooking",
    "Sports",
  ]

  return (
    <div className="py-4">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex gap-2 pb-4">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "default" : "secondary"}
              size="sm"
              className="rounded-full"
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}
