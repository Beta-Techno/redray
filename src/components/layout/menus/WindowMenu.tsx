import { MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger } from "@/components/ui/menubar";

export function WindowMenu() {
  return (
    <MenubarMenu>
      <MenubarTrigger>Window</MenubarTrigger>
      <MenubarContent className="bg-popover text-popover-foreground border-border min-w-[280px]">
        <MenubarItem className="flex items-center gap-2">
          Minimize
          <MenubarShortcut>⌘M</MenubarShortcut>
        </MenubarItem>

        <MenubarItem className="flex items-center gap-2">
          Zoom
        </MenubarItem>

        <MenubarSeparator />

        <MenubarSub>
          <MenubarSubTrigger className="flex items-center gap-2">
            Panels
          </MenubarSubTrigger>
          <MenubarSubContent className="bg-popover text-popover-foreground border-border">
            <MenubarItem>Properties</MenubarItem>
            <MenubarItem>Thumbnails</MenubarItem>
            <MenubarItem>Bookmarks</MenubarItem>
            <MenubarItem>Attachments</MenubarItem>
            <MenubarItem>Layers</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Comments</MenubarItem>
            <MenubarItem>Tool Chest</MenubarItem>
            <MenubarItem>Measurements</MenubarItem>
            <MenubarItem>Sets</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Search</MenubarItem>
          </MenubarSubContent>
        </MenubarSub>

        <MenubarSub>
          <MenubarSubTrigger className="flex items-center gap-2">
            Toolbars
          </MenubarSubTrigger>
          <MenubarSubContent className="bg-popover text-popover-foreground border-border">
            <MenubarItem>Properties Bar</MenubarItem>
            <MenubarItem>File Access Bar</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Basic Tools</MenubarItem>
            <MenubarItem>Insert</MenubarItem>
            <MenubarItem>Markup</MenubarItem>
            <MenubarItem>Measure</MenubarItem>
          </MenubarSubContent>
        </MenubarSub>

        <MenubarSeparator />

        <MenubarItem className="flex items-center gap-2">
          Reset Workspace
        </MenubarItem>

        <MenubarItem className="flex items-center gap-2">
          Save Workspace...
        </MenubarItem>

        <MenubarSeparator />

        <MenubarItem className="flex items-center gap-2">
          Bring All to Front
        </MenubarItem>

        <MenubarSeparator />

        <MenubarItem className="flex items-center gap-2">
          Document 1.pdf
          <MenubarShortcut>⌘1</MenubarShortcut>
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  );
} 