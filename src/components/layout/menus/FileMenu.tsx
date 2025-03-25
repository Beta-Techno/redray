import { MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger } from "@/components/ui/menubar";
import { FileIcon, FolderIcon, PlusIcon, BookIcon, LayersIcon, MailIcon, PrinterIcon, Share2Icon, Settings2Icon, LogOutIcon, UserIcon, EyeIcon, PencilIcon, KeyboardIcon, ShieldIcon } from "lucide-react";
import { useState } from 'react';
import { Pdf } from '@/components/pdf-editor/PdfPicker';
import { loadPdf } from '@/utils/pdf';

interface FileMenuProps {
  onOpenPdf?: (pdf: Pdf) => void;
}

export function RedRayMenu() {
  return (
    <MenubarMenu>
      <MenubarTrigger className="font-semibold">RedRay</MenubarTrigger>
      <MenubarContent className="bg-popover text-popover-foreground border-border min-w-[280px]">
        <MenubarItem className="flex items-center gap-2">
          <UserIcon className="w-4 h-4" />
          About
        </MenubarItem>
        <MenubarSeparator />
        <MenubarItem className="flex items-center gap-2">
          <Settings2Icon className="w-4 h-4" />
          Preferences
          <MenubarShortcut>Ctrl+K</MenubarShortcut>
        </MenubarItem>
        <MenubarItem className="flex items-center gap-2">
          <EyeIcon className="w-4 h-4" />
          View Mode
        </MenubarItem>
        <MenubarItem className="flex items-center gap-2">
          <PencilIcon className="w-4 h-4" />
          Markup Mode
        </MenubarItem>
        <MenubarItem className="flex items-center gap-2">
          <UserIcon className="w-4 h-4" />
          Profiles
        </MenubarItem>
        <MenubarItem className="flex items-center gap-2">
          <KeyboardIcon className="w-4 h-4" />
          Keyboard Shortcuts
        </MenubarItem>
        <MenubarItem className="flex items-center gap-2">
          <ShieldIcon className="w-4 h-4" />
          Administrator
        </MenubarItem>
        <MenubarSeparator />
        <MenubarItem className="flex items-center gap-2">
          Unregister
        </MenubarItem>
        <MenubarSeparator />
        <MenubarItem className="flex items-center gap-2">
          <LogOutIcon className="w-4 h-4" />
          Exit
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  );
}

export function FileMenu({ onOpenPdf }: FileMenuProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleOpenPdf() {
    const input = window.document.createElement('input');
    input.type = 'file';
    input.accept = 'application/pdf';
    input.addEventListener('change', async (e) => {
      const fileList = (e.target as HTMLInputElement).files;
      if (!fileList || fileList.length === 0) return;
      const file = fileList[0];

      setIsLoading(true);
      try {
        const pdf = await loadPdf(file.name, await file.arrayBuffer());
        onOpenPdf?.(pdf);
      } finally {
        setIsLoading(false);
      }
    });
    input.click();
  }

  return (
    <MenubarMenu>
      <MenubarTrigger>File</MenubarTrigger>
      <MenubarContent className="bg-popover text-popover-foreground border-border min-w-[280px]">
        <MenubarItem className="flex items-center gap-2">
          <FileIcon className="w-4 h-4" />
          New PDF...
        </MenubarItem>
        
        <MenubarSub>
          <MenubarSubTrigger className="flex items-center gap-2">
            <FileIcon className="w-4 h-4" />
            New PDF from Template...
          </MenubarSubTrigger>
          <MenubarSubContent className="bg-popover text-popover-foreground border-border">
            {/* Template submenu items would go here */}
          </MenubarSubContent>
        </MenubarSub>

        <MenubarItem className="flex items-center gap-2" onClick={handleOpenPdf} disabled={isLoading}>
          <FolderIcon className="w-4 h-4" />
          {isLoading ? 'Loading...' : 'Open'}
          <MenubarShortcut>⌘O</MenubarShortcut>
        </MenubarItem>

        <MenubarSub>
          <MenubarSubTrigger className="flex items-center gap-2">
            <FolderIcon className="w-4 h-4" />
            Open Recent
          </MenubarSubTrigger>
          <MenubarSubContent className="bg-popover text-popover-foreground border-border">
            {/* Recent files would go here */}
          </MenubarSubContent>
        </MenubarSub>

        <MenubarSeparator />

        <MenubarItem className="flex items-center gap-2">
          <FileIcon className="w-4 h-4" />
          Save
          <MenubarShortcut>⌘S</MenubarShortcut>
        </MenubarItem>

        <MenubarItem className="flex items-center gap-2">
          <FileIcon className="w-4 h-4" />
          Save As...
          <MenubarShortcut>⇧⌘S</MenubarShortcut>
        </MenubarItem>

        <MenubarSeparator />

        <MenubarSub>
          <MenubarSubTrigger className="flex items-center gap-2">
            <LayersIcon className="w-4 h-4" />
            Create
          </MenubarSubTrigger>
          <MenubarSubContent className="bg-popover text-popover-foreground border-border">
            {/* Create submenu items would go here */}
          </MenubarSubContent>
        </MenubarSub>

        <MenubarSeparator />

        <MenubarItem className="flex items-center gap-2">
          <PrinterIcon className="w-4 h-4" />
          Print...
          <MenubarShortcut>⌘P</MenubarShortcut>
        </MenubarItem>

        <MenubarSeparator />

        <MenubarItem className="flex items-center gap-2">
          <Share2Icon className="w-4 h-4" />
          Share
        </MenubarItem>

        <MenubarItem className="flex items-center gap-2">
          <MailIcon className="w-4 h-4" />
          Send
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  );
} 