"use client"

import type React from "react"

import { createContext, useContext, useState } from "react"
import Link from "next/link"
import {
  Home,
  Compass,
  Clock,
  ThumbsUp,
  History,
  PlaySquare,
  Flame,
  ShoppingBag,
  Music2,
  Film,
  Gamepad2,
  Newspaper,
  Trophy,
  Lightbulb,
} from "lucide-react"

// Create sidebar context
type SidebarContextType = {
  isOpen: boolean
  toggleSidebar: () => void
}

const SidebarContext = createContext<SidebarContextType>({
  isOpen: true,
  toggleSidebar: () => {},
})

export const useSidebar = () => useContext(SidebarContext)

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>{children}</SidebarContext.Provider>
}

export default function Sidebar() {
  const { isOpen } = useSidebar()

  const mainLinks = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Compass, label: "Explore", href: "#" },
    { icon: PlaySquare, label: "Subscriptions", href: "#" },
  ]

  const secondaryLinks = [
    { icon: Clock, label: "Library", href: "#" },
    { icon: History, label: "History", href: "#" },
    { icon: PlaySquare, label: "Your Videos", href: "#" },
    { icon: ThumbsUp, label: "Liked Videos", href: "#" },
  ]

  const categories = [
    { icon: Flame, label: "Trending", href: "#" },
    { icon: ShoppingBag, label: "Shopping", href: "#" },
    { icon: Music2, label: "Music", href: "#" },
    { icon: Film, label: "Movies & TV", href: "#" },
    { icon: Gamepad2, label: "Gaming", href: "#" },
    { icon: Newspaper, label: "News", href: "#" },
    { icon: Trophy, label: "Sports", href: "#" },
    { icon: Lightbulb, label: "Learning", href: "#" },
  ]

  if (!isOpen) {
    return (
      <aside className="hidden md:block w-[72px] shrink-0 border-r bg-background">
        <div className="flex flex-col items-center py-4">
          {mainLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="flex flex-col items-center justify-center w-full p-3 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <link.icon className="h-5 w-5" />
              <span className="mt-1 text-[10px]">{link.label}</span>
            </Link>
          ))}
        </div>
      </aside>
    )
  }

  return (
    <aside className="hidden md:block w-56 shrink-0 border-r bg-background">
      <div className="flex flex-col gap-2 p-2">
        <div className="py-2">
          {mainLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <link.icon className="h-5 w-5" />
              <span>{link.label}</span>
            </Link>
          ))}
        </div>

        <div className="border-t pt-2">
          {secondaryLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <link.icon className="h-5 w-5" />
              <span>{link.label}</span>
            </Link>
          ))}
        </div>

        <div className="border-t pt-2">
          <h3 className="px-3 py-2 text-sm font-medium">Explore</h3>
          {categories.map((category) => (
            <Link
              key={category.label}
              href={category.href}
              className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <category.icon className="h-5 w-5" />
              <span>{category.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  )
}
