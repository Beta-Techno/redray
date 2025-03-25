import { MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger } from "@/components/ui/menubar";

export function HelpMenu() {
  return (
    <MenubarMenu>
      <MenubarTrigger>Help</MenubarTrigger>
      <MenubarContent className="min-w-[280px] bg-popover text-popover-foreground border-border">
        <MenubarItem className="flex items-center gap-2">
          Red Ray Help
          <MenubarShortcut>F1</MenubarShortcut>
        </MenubarItem>

        <MenubarItem className="flex items-center gap-2">
          Getting Started
        </MenubarItem>

        <MenubarItem className="flex items-center gap-2">
          Tutorials
        </MenubarItem>

        <MenubarSeparator />

        <MenubarItem className="flex items-center gap-2">
          Knowledge Base
        </MenubarItem>

        <MenubarItem className="flex items-center gap-2">
          Support
        </MenubarItem>

        <MenubarItem className="flex items-center gap-2">
          Remote Support
        </MenubarItem>

        <MenubarSeparator />

        <MenubarItem className="flex items-center gap-2">
          Check for Updates...
        </MenubarItem>

        <MenubarItem className="flex items-center gap-2">
          Register...
        </MenubarItem>

        <MenubarSeparator />

        <MenubarItem className="flex items-center gap-2">
          About Red Ray Revu
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  );
} 