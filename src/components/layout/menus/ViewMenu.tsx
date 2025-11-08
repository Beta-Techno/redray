'use client';

import { useRef, useEffect } from 'react';
import { MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger } from "@/components/ui/menubar";

export function ViewMenu() {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        // Handle click outside if needed
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <MenubarMenu>
      <MenubarTrigger>View</MenubarTrigger>
      <MenubarContent className="bg-popover text-popover-foreground border-border min-w-[280px]">
        <MenubarItem className="flex items-center gap-2">
          Single Page
          <MenubarShortcut>⌘1</MenubarShortcut>
        </MenubarItem>

        <MenubarItem className="flex items-center gap-2">
          Continuous
          <MenubarShortcut>⌘2</MenubarShortcut>
        </MenubarItem>

        <MenubarItem className="flex items-center gap-2">
          Continuous Facing
          <MenubarShortcut>⌘3</MenubarShortcut>
        </MenubarItem>

        <MenubarItem className="flex items-center gap-2">
          Continuous Facing Cover
          <MenubarShortcut>⌘4</MenubarShortcut>
        </MenubarItem>

        <MenubarSeparator />

        <MenubarItem className="flex items-center gap-2">
          Side-by-Side
          <MenubarShortcut>⌘5</MenubarShortcut>
        </MenubarItem>

        <MenubarItem className="flex items-center gap-2">
          Continuous Side-by-Side
          <MenubarShortcut>⌘6</MenubarShortcut>
        </MenubarItem>

        <MenubarItem className="flex items-center gap-2">
          Continuous Side-by-Side
          <MenubarShortcut>⌘7</MenubarShortcut>
        </MenubarItem>

        <MenubarItem className="flex items-center gap-2">
          Show Cover Page in Side-by-Side
        </MenubarItem>

        <MenubarSeparator />

        <MenubarSub>
          <MenubarSubTrigger className="flex items-center gap-2">
            Rotate View
          </MenubarSubTrigger>
          <MenubarSubContent className="bg-popover text-popover-foreground border-border">
            {/* Rotate view options would go here */}
          </MenubarSubContent>
        </MenubarSub>

        <MenubarItem className="flex items-center gap-2">
          Split Vertical
          <MenubarShortcut>⌘2</MenubarShortcut>
        </MenubarItem>

        <MenubarItem className="flex items-center gap-2">
          Split Horizontal
          <MenubarShortcut>⌘H</MenubarShortcut>
        </MenubarItem>

        <MenubarItem disabled className="text-muted-foreground flex items-center gap-2">
          Toggle Split
          <MenubarShortcut>⌘I</MenubarShortcut>
        </MenubarItem>

        <MenubarItem disabled className="text-muted-foreground flex items-center gap-2">
          Switch
          <MenubarShortcut>⌘↑</MenubarShortcut>
        </MenubarItem>

        <MenubarItem disabled className="text-muted-foreground flex items-center gap-2">
          Balance
          <MenubarShortcut>⇧F12</MenubarShortcut>
        </MenubarItem>

        <MenubarItem disabled className="text-muted-foreground flex items-center gap-2">
          Unsplit
          <MenubarShortcut>⌘⇧2</MenubarShortcut>
        </MenubarItem>

        <MenubarSeparator />

        <MenubarItem className="flex items-center gap-2">
          Synchronize Document
        </MenubarItem>

        <MenubarItem className="flex items-center gap-2">
          Synchronize Page
        </MenubarItem>

        <MenubarSeparator />

        <MenubarItem className="flex items-center gap-2">
          Rulers
          <MenubarShortcut>⌘R</MenubarShortcut>
        </MenubarItem>

        <MenubarItem className="flex items-center gap-2">
          Full-Screen Crosshair
        </MenubarItem>

        <MenubarItem className="flex items-center gap-2">
          Show Grid
          <MenubarShortcut>⇧F9</MenubarShortcut>
        </MenubarItem>

        <MenubarItem className="flex items-center gap-2">
          Snap to Grid
          <MenubarShortcut>⌘⇧F9</MenubarShortcut>
        </MenubarItem>

        <MenubarItem className="flex items-center gap-2">
          Snap to Content
          <MenubarShortcut>⌘⇧F8</MenubarShortcut>
        </MenubarItem>

        <MenubarItem className="flex items-center gap-2">
          Snap to Markup
          <MenubarShortcut>⌘⇧F7</MenubarShortcut>
        </MenubarItem>

        <MenubarSeparator />

        <MenubarSub>
          <MenubarSubTrigger className="flex items-center gap-2">
            Dimmer
          </MenubarSubTrigger>
          <MenubarSubContent className="bg-popover text-popover-foreground border-border">
            {/* Dimmer options would go here */}
          </MenubarSubContent>
        </MenubarSub>

        <MenubarItem className="flex items-center gap-2">
          Disable Line Weights
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  );
} 