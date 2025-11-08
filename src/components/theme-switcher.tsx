"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const themes = [
  { name: "light", label: "Light" },
  { name: "dark", label: "Dark" },
  { name: "system", label: "System" },
]

const colors = [
  { name: "slate", label: "Slate" },
  { name: "zinc", label: "Zinc" },
  { name: "stone", label: "Stone" },
  { name: "gray", label: "Gray" },
  { name: "neutral", label: "Neutral" },
  { name: "red", label: "Red" },
  { name: "rose", label: "Rose" },
  { name: "orange", label: "Orange" },
  { name: "green", label: "Green" },
  { name: "blue", label: "Blue" },
  { name: "yellow", label: "Yellow" },
  { name: "violet", label: "Violet" },
]

export function ThemeSwitcher() {
  const { setTheme } = useTheme()
  const [color, setColor] = React.useState("slate")

  React.useEffect(() => {
    // Update the data-theme attribute on the root element
    document.documentElement.setAttribute("data-theme", color)
  }, [color])

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {themes.map((t) => (
            <DropdownMenuItem key={t.name} onClick={() => setTheme(t.name)}>
              {t.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            {colors.find((c) => c.name === color)?.label}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {colors.map((c) => (
            <DropdownMenuItem key={c.name} onClick={() => setColor(c.name)}>
              {c.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
} 