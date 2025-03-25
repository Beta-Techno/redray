import { MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger } from "@/components/ui/menubar";

export function DocumentMenu() {
  return (
    <MenubarMenu>
      <MenubarTrigger>Document</MenubarTrigger>
      <MenubarContent className="bg-popover text-popover-foreground border-border min-w-[280px]">
        <MenubarSub>
          <MenubarSubTrigger className="flex items-center gap-2">
            Insert Pages
          </MenubarSubTrigger>
          <MenubarSubContent className="bg-popover text-popover-foreground border-border">
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

        <MenubarSeparator />

        <MenubarSub>
          <MenubarSubTrigger className="flex items-center gap-2">
            Header & Footer
          </MenubarSubTrigger>
          <MenubarSubContent className="bg-popover text-popover-foreground border-border">
            <MenubarItem>Add...</MenubarItem>
            <MenubarItem>Update</MenubarItem>
            <MenubarItem>Remove</MenubarItem>
          </MenubarSubContent>
        </MenubarSub>

        <MenubarSub>
          <MenubarSubTrigger className="flex items-center gap-2">
            Bates Numbering
          </MenubarSubTrigger>
          <MenubarSubContent className="bg-popover text-popover-foreground border-border">
            <MenubarItem>Add...</MenubarItem>
            <MenubarItem>Update</MenubarItem>
            <MenubarItem>Remove</MenubarItem>
          </MenubarSubContent>
        </MenubarSub>

        <MenubarSeparator />

        <MenubarItem className="flex items-center gap-2">
          OCR Pages...
        </MenubarItem>

        <MenubarItem className="flex items-center gap-2">
          Optimize...
        </MenubarItem>

        <MenubarSeparator />

        <MenubarSub>
          <MenubarSubTrigger className="flex items-center gap-2">
            Processing
          </MenubarSubTrigger>
          <MenubarSubContent className="bg-popover text-popover-foreground border-border">
            <MenubarItem>Flatten Markups</MenubarItem>
            <MenubarItem>Flatten Form Fields</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Rasterize Pages...</MenubarItem>
          </MenubarSubContent>
        </MenubarSub>

        <MenubarSeparator />

        <MenubarItem className="flex items-center gap-2">
          Document Info...
          <MenubarShortcut>⌘I</MenubarShortcut>
        </MenubarItem>

        <MenubarSub>
          <MenubarSubTrigger className="flex items-center gap-2">
            Security
          </MenubarSubTrigger>
          <MenubarSubContent className="bg-popover text-popover-foreground border-border">
            <MenubarItem>Show Security Properties...</MenubarItem>
            <MenubarSeparator />
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