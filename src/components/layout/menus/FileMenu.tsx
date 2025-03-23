import { MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger } from "@/components/ui/menubar";
import { FileIcon, FolderIcon, PlusIcon, BookIcon, LayersIcon, MailIcon, PrinterIcon, Share2Icon } from "lucide-react";
import { useState } from 'react';
import { Pdf, PdfPage } from '@/components/pdf-editor/PdfPicker';
import { AssetRecordType, Box, TLAssetId, TLShapeId, createShapeId } from '@tldraw/tldraw';

interface FileMenuProps {
  onOpenPdf?: (pdf: Pdf) => void;
}

export function FileMenu({ onOpenPdf }: FileMenuProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function loadPdf(name: string, source: ArrayBuffer): Promise<Pdf> {
    const PdfJS = await import('pdfjs-dist');
    PdfJS.GlobalWorkerOptions.workerSrc = new URL(
      'pdfjs-dist/build/pdf.worker.min.mjs',
      import.meta.url
    ).toString();
    const pdf = await PdfJS.getDocument(source.slice(0)).promise;
    const pages: PdfPage[] = [];

    const canvas = window.document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Failed to create canvas context');

    const visualScale = 1.5;
    const scale = window.devicePixelRatio;

    let top = 0;
    let widest = 0;
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: scale * visualScale });
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const renderContext = {
        canvasContext: context,
        viewport,
      };
      await page.render(renderContext).promise;

      const width = viewport.width / scale;
      const height = viewport.height / scale;
      pages.push({
        src: canvas.toDataURL(),
        bounds: new Box(0, top, width, height),
        assetId: AssetRecordType.createId(),
        shapeId: createShapeId(),
      });
      top += height + 32; // pageSpacing = 32
      widest = Math.max(widest, width);
    }
    canvas.width = 0;
    canvas.height = 0;

    for (const page of pages) {
      page.bounds.x = (widest - page.bounds.w) / 2;
    }

    return {
      name,
      pages,
      source,
    };
  }

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
      <MenubarTrigger className="bg-[#0078D4] text-white data-[highlighted]:bg-[#106EBE]">File</MenubarTrigger>
      <MenubarContent className="bg-[#333333] text-white border-[#404040] min-w-[280px]">
        <MenubarItem className="flex items-center gap-2">
          <FileIcon className="w-4 h-4" />
          New PDF...
        </MenubarItem>
        
        <MenubarSub>
          <MenubarSubTrigger className="flex items-center gap-2">
            <FileIcon className="w-4 h-4" />
            New PDF from Template...
          </MenubarSubTrigger>
          <MenubarSubContent className="bg-[#333333] text-white border-[#404040]">
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
          <MenubarSubContent className="bg-[#333333] text-white border-[#404040]">
            {/* Recent files would go here */}
          </MenubarSubContent>
        </MenubarSub>

        <MenubarItem className="flex items-center gap-2">
          <BookIcon className="w-4 h-4" />
          New Studio Project...
        </MenubarItem>

        <MenubarSub>
          <MenubarSubTrigger className="flex items-center gap-2">
            <PlusIcon className="w-4 h-4" />
            Create
          </MenubarSubTrigger>
          <MenubarSubContent className="bg-[#333333] text-white border-[#404040]">
            {/* Create submenu items would go here */}
          </MenubarSubContent>
        </MenubarSub>

        <MenubarItem className="flex items-center gap-2">
          <LayersIcon className="w-4 h-4" />
          Combine...
        </MenubarItem>

        <MenubarSeparator className="bg-[#404040]" />

        <MenubarItem disabled className="text-gray-500 flex items-center gap-2">
          Close
          <MenubarShortcut>⌘F4</MenubarShortcut>
        </MenubarItem>

        <MenubarItem disabled className="text-gray-500 flex items-center gap-2">
          Close All
          <MenubarShortcut>⌘⇧W</MenubarShortcut>
        </MenubarItem>

        <MenubarSeparator className="bg-[#404040]" />

        <MenubarItem disabled className="text-gray-500 flex items-center gap-2">
          <FileIcon className="w-4 h-4" />
          Save
          <MenubarShortcut>⌘S</MenubarShortcut>
        </MenubarItem>

        <MenubarItem disabled className="text-gray-500 flex items-center gap-2">
          <FileIcon className="w-4 h-4" />
          Save As...
          <MenubarShortcut>⌘⇧S</MenubarShortcut>
        </MenubarItem>

        <MenubarItem disabled className="text-gray-500 flex items-center gap-2">
          <FileIcon className="w-4 h-4" />
          Save All
          <MenubarShortcut>⇧F2</MenubarShortcut>
        </MenubarItem>

        <MenubarItem disabled className="text-gray-500 flex items-center gap-2">
          Revert As
        </MenubarItem>

        <MenubarSeparator className="bg-[#404040]" />

        <MenubarSub>
          <MenubarSubTrigger disabled className="text-gray-500 flex items-center gap-2">
            Publish
          </MenubarSubTrigger>
          <MenubarSubContent className="bg-[#333333] text-white border-[#404040]">
            {/* Publish submenu items would go here */}
          </MenubarSubContent>
        </MenubarSub>

        <MenubarItem disabled className="text-gray-500 flex items-center gap-2">
          <MailIcon className="w-4 h-4" />
          Email...
          <MenubarShortcut>⌘E</MenubarShortcut>
        </MenubarItem>

        <MenubarSub>
          <MenubarSubTrigger className="flex items-center gap-2">
            <MailIcon className="w-4 h-4" />
            Email Templates
          </MenubarSubTrigger>
          <MenubarSubContent className="bg-[#333333] text-white border-[#404040]">
            {/* Email templates would go here */}
          </MenubarSubContent>
        </MenubarSub>

        <MenubarSub>
          <MenubarSubTrigger className="flex items-center gap-2">
            <Share2Icon className="w-4 h-4" />
            Export
          </MenubarSubTrigger>
          <MenubarSubContent className="bg-[#333333] text-white border-[#404040]">
            {/* Export options would go here */}
          </MenubarSubContent>
        </MenubarSub>

        <MenubarItem disabled className="text-gray-500 flex items-center gap-2">
          <PrinterIcon className="w-4 h-4" />
          Print...
          <MenubarShortcut>⌘P</MenubarShortcut>
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  );
} 