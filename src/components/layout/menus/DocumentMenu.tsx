import { MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger } from "@/components/ui/menubar";

export function DocumentMenu() {
  return (
    <MenubarMenu>
      <MenubarTrigger>Document</MenubarTrigger>
      <MenubarContent className="bg-[#333333] text-white border-[#404040] min-w-[280px]">
        <MenubarSub>
          <MenubarSubTrigger className="flex items-center gap-2">
            Insert Pages
          </MenubarSubTrigger>
          <MenubarSubContent className="bg-[#333333] text-white border-[#404040]">
            <MenubarItem>From File...</MenubarItem>
            <MenubarItem>From Scanner...</MenubarItem>
            <MenubarItem>Blank Pages...</MenubarItem>
          </MenubarSubContent>
        </MenubarSub>

        <MenubarItem className="flex items-center gap-2">
          Extract Pages...
        </MenubarItem>

        <MenubarItem className="flex items-center gap-2">
          Delete Pages...
        </MenubarItem>

        <MenubarItem className="flex items-center gap-2">
          Crop Pages...
        </MenubarItem>

        <MenubarSeparator className="bg-[#404040]" />

        <MenubarSub>
          <MenubarSubTrigger className="flex items-center gap-2">
            Header & Footer
          </MenubarSubTrigger>
          <MenubarSubContent className="bg-[#333333] text-white border-[#404040]">
            <MenubarItem>Add...</MenubarItem>
            <MenubarItem>Update</MenubarItem>
            <MenubarItem>Remove</MenubarItem>
          </MenubarSubContent>
        </MenubarSub>

        <MenubarSub>
          <MenubarSubTrigger className="flex items-center gap-2">
            Bates Numbering
          </MenubarSubTrigger>
          <MenubarSubContent className="bg-[#333333] text-white border-[#404040]">
            <MenubarItem>Add...</MenubarItem>
            <MenubarItem>Update</MenubarItem>
            <MenubarItem>Remove</MenubarItem>
          </MenubarSubContent>
        </MenubarSub>

        <MenubarSeparator className="bg-[#404040]" />

        <MenubarItem className="flex items-center gap-2">
          OCR Pages...
        </MenubarItem>

        <MenubarItem className="flex items-center gap-2">
          Optimize...
        </MenubarItem>

        <MenubarSeparator className="bg-[#404040]" />

        <MenubarSub>
          <MenubarSubTrigger className="flex items-center gap-2">
            Processing
          </MenubarSubTrigger>
          <MenubarSubContent className="bg-[#333333] text-white border-[#404040]">
            <MenubarItem>Flatten Markups</MenubarItem>
            <MenubarItem>Flatten Form Fields</MenubarItem>
            <MenubarSeparator className="bg-[#404040]" />
            <MenubarItem>Rasterize Pages...</MenubarItem>
          </MenubarSubContent>
        </MenubarSub>

        <MenubarSeparator className="bg-[#404040]" />

        <MenubarItem className="flex items-center gap-2">
          Document Info...
          <MenubarShortcut>⌘I</MenubarShortcut>
        </MenubarItem>

        <MenubarSub>
          <MenubarSubTrigger className="flex items-center gap-2">
            Security
          </MenubarSubTrigger>
          <MenubarSubContent className="bg-[#333333] text-white border-[#404040]">
            <MenubarItem>Show Security Properties...</MenubarItem>
            <MenubarSeparator className="bg-[#404040]" />
            <MenubarItem>Add Security...</MenubarItem>
            <MenubarItem>Remove Security</MenubarItem>
          </MenubarSubContent>
        </MenubarSub>

        <MenubarItem className="flex items-center gap-2">
          Sign Document...
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  );
} 