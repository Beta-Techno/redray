import { MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger } from "@/components/ui/menubar";

export function HelpMenu() {
  return (
    <MenubarMenu>
      <MenubarTrigger>Help</MenubarTrigger>
      <MenubarContent className="bg-[#333333] text-white border-[#404040] min-w-[280px]">
        <MenubarItem className="flex items-center gap-2">
          Bluebeam Help
          <MenubarShortcut>F1</MenubarShortcut>
        </MenubarItem>

        <MenubarItem className="flex items-center gap-2">
          Getting Started
        </MenubarItem>

        <MenubarItem className="flex items-center gap-2">
          Tutorials
        </MenubarItem>

        <MenubarSeparator className="bg-[#404040]" />

        <MenubarItem className="flex items-center gap-2">
          Knowledge Base
        </MenubarItem>

        <MenubarItem className="flex items-center gap-2">
          Support
        </MenubarItem>

        <MenubarItem className="flex items-center gap-2">
          Remote Support
        </MenubarItem>

        <MenubarSeparator className="bg-[#404040]" />

        <MenubarItem className="flex items-center gap-2">
          Check for Updates...
        </MenubarItem>

        <MenubarItem className="flex items-center gap-2">
          Register...
        </MenubarItem>

        <MenubarSeparator className="bg-[#404040]" />

        <MenubarItem className="flex items-center gap-2">
          About Bluebeam Revu
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  );
} 