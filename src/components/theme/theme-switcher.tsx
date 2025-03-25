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
  { name: "blue", label: "Blue" },
  { name: "green", label: "Green" },
  { name: "orange", label: "Orange" },
]

export function ThemeSwitcher() {
  const { setTheme, theme } = useTheme()
  const [currentColor, setCurrentColor] = React.useState("slate")

  React.useEffect(() => {
    // Set initial theme
    const root = document.documentElement
    root.setAttribute("data-theme", "slate")
  }, [])

  const handleColorChange = (color: string) => {
    const root = document.documentElement
    root.setAttribute("data-theme", color)
    setCurrentColor(color)
  }

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <Sun className="h-[1.1rem] w-[1.1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.1rem] w-[1.1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="gap-2">
            <div className="w-4 h-4 rounded-full bg-primary" />
            {colors.find((c) => c.name === currentColor)?.label}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {colors.map((color) => (
            <DropdownMenuItem
              key={color.name}
              onClick={() => handleColorChange(color.name)}
              className="flex items-center gap-2"
            >
              <div className={`w-4 h-4 rounded-full bg-primary`} data-theme={color.name} />
              {color.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
} 