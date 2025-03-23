import { MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger } from "@/components/ui/menubar";

export function WindowMenu() {
  return (
    <MenubarMenu>
      <MenubarTrigger>Window</MenubarTrigger>
      <MenubarContent className="bg-[#333333] text-white border-[#404040] min-w-[280px]">
        <MenubarItem className="flex items-center gap-2">
          Minimize
          <MenubarShortcut>⌘M</MenubarShortcut>
        </MenubarItem>

        <MenubarItem className="flex items-center gap-2">
          Zoom
        </MenubarItem>

        <MenubarSeparator className="bg-[#404040]" />

        <MenubarSub>
          <MenubarSubTrigger className="flex items-center gap-2">
            Panels
          </MenubarSubTrigger>
          <MenubarSubContent className="bg-[#333333] text-white border-[#404040]">
            <MenubarItem>Properties</MenubarItem>
            <MenubarItem>Thumbnails</MenubarItem>
            <MenubarItem>Bookmarks</MenubarItem>
            <MenubarItem>Attachments</MenubarItem>
            <MenubarItem>Layers</MenubarItem>
            <MenubarSeparator className="bg-[#404040]" />
            <MenubarItem>Comments</MenubarItem>
            <MenubarItem>Tool Chest</MenubarItem>
            <MenubarItem>Measurements</MenubarItem>
            <MenubarItem>Sets</MenubarItem>
            <MenubarSeparator className="bg-[#404040]" />
            <MenubarItem>Search</MenubarItem>
          </MenubarSubContent>
        </MenubarSub>

        <MenubarSub>
          <MenubarSubTrigger className="flex items-center gap-2">
            Toolbars
          </MenubarSubTrigger>
          <MenubarSubContent className="bg-[#333333] text-white border-[#404040]">
            <MenubarItem>Properties Bar</MenubarItem>
            <MenubarItem>File Access Bar</MenubarItem>
            <MenubarSeparator className="bg-[#404040]" />
            <MenubarItem>Basic Tools</MenubarItem>
            <MenubarItem>Insert</MenubarItem>
            <MenubarItem>Markup</MenubarItem>
            <MenubarItem>Measure</MenubarItem>
          </MenubarSubContent>
        </MenubarSub>

        <MenubarSeparator className="bg-[#404040]" />

        <MenubarItem className="flex items-center gap-2">
          Reset Workspace
        </MenubarItem>

        <MenubarItem className="flex items-center gap-2">
          Save Workspace...
        </MenubarItem>

        <MenubarSeparator className="bg-[#404040]" />

        <MenubarItem className="flex items-center gap-2">
          Bring All to Front
        </MenubarItem>

        <MenubarSeparator className="bg-[#404040]" />

        <MenubarItem className="flex items-center gap-2">
          Document 1.pdf
          <MenubarShortcut>⌘1</MenubarShortcut>
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  );
} 