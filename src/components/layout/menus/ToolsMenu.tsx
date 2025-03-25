import { MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger } from "@/components/ui/menubar";

export function ToolsMenu() {
  return (
    <MenubarMenu>
      <MenubarTrigger>Tools</MenubarTrigger>
      <MenubarContent className="bg-popover text-popover-foreground border-border min-w-[280px]">
        <MenubarSub>
          <MenubarSubTrigger className="flex items-center gap-2">
            Basic Tools
          </MenubarSubTrigger>
          <MenubarSubContent className="bg-popover text-popover-foreground border-border">
            <MenubarItem>Hand Tool</MenubarItem>
            <MenubarItem>Select Text</MenubarItem>
            <MenubarItem>Select Image</MenubarItem>
            <MenubarItem>Snapshot</MenubarItem>
          </MenubarSubContent>
        </MenubarSub>

        <MenubarSub>
          <MenubarSubTrigger className="flex items-center gap-2">
            Markup Tools
          </MenubarSubTrigger>
          <MenubarSubContent className="bg-popover text-popover-foreground border-border">
            <MenubarItem>Text Box</MenubarItem>
            <MenubarItem>Callout</MenubarItem>
            <MenubarItem>Typewriter</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Rectangle</MenubarItem>
            <MenubarItem>Ellipse</MenubarItem>
            <MenubarItem>Line</MenubarItem>
            <MenubarItem>Polyline</MenubarItem>
            <MenubarItem>Cloud</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Highlight</MenubarItem>
            <MenubarItem>Strikeout</MenubarItem>
            <MenubarItem>Underline</MenubarItem>
          </MenubarSubContent>
        </MenubarSub>

        <MenubarSub>
          <MenubarSubTrigger className="flex items-center gap-2">
            Measure Tools
          </MenubarSubTrigger>
          <MenubarSubContent className="bg-popover text-popover-foreground border-border">
            <MenubarItem>Distance</MenubarItem>
            <MenubarItem>Perimeter</MenubarItem>
            <MenubarItem>Area</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Calibrate</MenubarItem>
            <MenubarItem>Configure Scale</MenubarItem>
          </MenubarSubContent>
        </MenubarSub>

        <MenubarSeparator />

        <MenubarSub>
          <MenubarSubTrigger className="flex items-center gap-2">
            Stamps
          </MenubarSubTrigger>
          <MenubarSubContent className="bg-popover text-popover-foreground border-border">
            <MenubarItem>Add Stamp</MenubarItem>
            <MenubarItem>Manage Stamps...</MenubarItem>
          </MenubarSubContent>
        </MenubarSub>

        <MenubarItem className="flex items-center gap-2">
          Add Image...
        </MenubarItem>

        <MenubarSeparator />

        <MenubarSub>
          <MenubarSubTrigger className="flex items-center gap-2">
            Forms
          </MenubarSubTrigger>
          <MenubarSubContent className="bg-popover text-popover-foreground border-border">
            <MenubarItem>Text Field</MenubarItem>
            <MenubarItem>Checkbox</MenubarItem>
            <MenubarItem>Radio Button</MenubarItem>
            <MenubarItem>List Box</MenubarItem>
            <MenubarItem>Combo Box</MenubarItem>
            <MenubarItem>Button</MenubarItem>
            <MenubarItem>Digital Signature</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Form Field Recognition</MenubarItem>
            <MenubarItem>Reset Form</MenubarItem>
            <MenubarItem>Import Form Data...</MenubarItem>
            <MenubarItem>Export Form Data...</MenubarItem>
          </MenubarSubContent>
        </MenubarSub>

        <MenubarSeparator />

        <MenubarItem className="flex items-center gap-2">
          JavaScript Console
          <MenubarShortcut>⌘J</MenubarShortcut>
        </MenubarItem>

        <MenubarSub>
          <MenubarSubTrigger className="flex items-center gap-2">
            Customize
          </MenubarSubTrigger>
          <MenubarSubContent className="bg-popover text-popover-foreground border-border">
            <MenubarItem>Customize Toolbars...</MenubarItem>
            <MenubarItem>Customize Keyboard...</MenubarItem>
            <MenubarItem>Customize Status Bar...</MenubarItem>
          </MenubarSubContent>
        </MenubarSub>
      </MenubarContent>
    </MenubarMenu>
  );
} 