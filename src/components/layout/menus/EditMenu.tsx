import { MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger } from "@/components/ui/menubar";

export function EditMenu() {
  return (
    <MenubarMenu>
      <MenubarTrigger>Edit</MenubarTrigger>
      <MenubarContent className="bg-[#333333] text-white border-[#404040] min-w-[280px]">
        <MenubarItem className="flex items-center gap-2">
          Undo
          <MenubarShortcut>⌘Z</MenubarShortcut>
        </MenubarItem>

        <MenubarItem className="flex items-center gap-2">
          Redo
          <MenubarShortcut>⌘Y</MenubarShortcut>
        </MenubarItem>

        <MenubarItem className="flex items-center gap-2">
          Undo History
        </MenubarItem>

        <MenubarSeparator className="bg-[#404040]" />

        <MenubarItem className="flex items-center gap-2">
          Cut
          <MenubarShortcut>⌘X</MenubarShortcut>
        </MenubarItem>

        <MenubarItem className="flex items-center gap-2">
          Copy
          <MenubarShortcut>⌘C</MenubarShortcut>
        </MenubarItem>

        <MenubarItem className="flex items-center gap-2">
          Paste
          <MenubarShortcut>⌘V</MenubarShortcut>
        </MenubarItem>

        <MenubarItem className="flex items-center gap-2">
          Paste in Place
          <MenubarShortcut>⌘⇧V</MenubarShortcut>
        </MenubarItem>

        <MenubarSeparator className="bg-[#404040]" />

        <MenubarItem className="flex items-center gap-2">
          Delete
          <MenubarShortcut>Del</MenubarShortcut>
        </MenubarItem>

        <MenubarItem className="flex items-center gap-2">
          Pan
          <MenubarShortcut>⇧V</MenubarShortcut>
        </MenubarItem>

        <MenubarItem className="flex items-center gap-2">
          Select
          <MenubarShortcut>V</MenubarShortcut>
        </MenubarItem>

        <MenubarItem className="flex items-center gap-2">
          Select All
          <MenubarShortcut>⌘A</MenubarShortcut>
        </MenubarItem>

        <MenubarItem className="flex items-center gap-2">
          Lasso
          <MenubarShortcut>⇧O</MenubarShortcut>
        </MenubarItem>

        <MenubarItem className="flex items-center gap-2">
          Snapshot
          <MenubarShortcut>G</MenubarShortcut>
        </MenubarItem>

        <MenubarItem className="flex items-center gap-2">
          Format Painter
          <MenubarShortcut>⌘⇧C</MenubarShortcut>
        </MenubarItem>

        <MenubarSeparator className="bg-[#404040]" />

        <MenubarSub>
          <MenubarSubTrigger className="flex items-center gap-2">
            PDF Content
          </MenubarSubTrigger>
          <MenubarSubContent className="bg-[#333333] text-white border-[#404040]">
            <MenubarItem>Edit Text</MenubarItem>
            <MenubarItem>Edit Images</MenubarItem>
            <MenubarItem>Edit Paths</MenubarItem>
          </MenubarSubContent>
        </MenubarSub>

        <MenubarSub>
          <MenubarSubTrigger className="flex items-center gap-2">
            Check Spelling
          </MenubarSubTrigger>
          <MenubarSubContent className="bg-[#333333] text-white border-[#404040]">
            <MenubarItem>Check Spelling</MenubarItem>
            <MenubarItem>Auto-Check Spelling</MenubarItem>
            <MenubarSeparator className="bg-[#404040]" />
            <MenubarItem>Edit Dictionary</MenubarItem>
          </MenubarSubContent>
        </MenubarSub>
      </MenubarContent>
    </MenubarMenu>
  );
} 