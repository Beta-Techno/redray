'use client';

import { useState, useRef, useEffect } from 'react';
import { useEditorContext } from '@/components/editor/EditorContext';
import { MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger } from "@/components/ui/menubar";

export function ViewMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { editor } = useEditorContext();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleZoom = (zoomLevel: number) => {
    if (!editor) return;
    const camera = editor.getCamera();
    editor.setCamera({ 
      x: camera.x,
      y: camera.y,
      z: zoomLevel 
    });
  };

  const handleFitToPage = () => {
    if (!editor) return;
    editor.zoomToFit({ 
      animation: {
        duration: 200
      }
    });
  };

  const handleFitToWidth = () => {
    if (!editor) return;
    editor.zoomToFit({ 
      animation: {
        duration: 200
      }
    });
  };

  return (
    <MenubarMenu>
      <MenubarTrigger>View</MenubarTrigger>
      <MenubarContent className="bg-[#333333] text-white border-[#404040] min-w-[280px]">
        <MenubarItem onClick={handleFitToPage} className="flex items-center gap-2">
          Fit Page
          <MenubarShortcut>⌘9</MenubarShortcut>
        </MenubarItem>

        <MenubarItem onClick={handleFitToWidth} className="flex items-center gap-2">
          Fit Width
          <MenubarShortcut>⌘0</MenubarShortcut>
        </MenubarItem>

        <MenubarItem onClick={() => handleZoom(1)} className="flex items-center gap-2">
          Actual Size
          <MenubarShortcut>⌘8</MenubarShortcut>
        </MenubarItem>

        <MenubarSub>
          <MenubarSubTrigger className="flex items-center gap-2">
            Zoom Level
          </MenubarSubTrigger>
          <MenubarSubContent className="bg-[#333333] text-white border-[#404040]">
            <MenubarItem onClick={() => handleZoom(0.25)} className="flex items-center gap-2">
              25%
            </MenubarItem>
            <MenubarItem onClick={() => handleZoom(0.5)} className="flex items-center gap-2">
              50%
            </MenubarItem>
            <MenubarItem onClick={() => handleZoom(0.75)} className="flex items-center gap-2">
              75%
            </MenubarItem>
            <MenubarItem onClick={() => handleZoom(1)} className="flex items-center gap-2">
              100%
            </MenubarItem>
            <MenubarItem onClick={() => handleZoom(1.25)} className="flex items-center gap-2">
              125%
            </MenubarItem>
            <MenubarItem onClick={() => handleZoom(1.5)} className="flex items-center gap-2">
              150%
            </MenubarItem>
            <MenubarItem onClick={() => handleZoom(2)} className="flex items-center gap-2">
              200%
            </MenubarItem>
            <MenubarItem onClick={() => handleZoom(3)} className="flex items-center gap-2">
              300%
            </MenubarItem>
            <MenubarItem onClick={() => handleZoom(4)} className="flex items-center gap-2">
              400%
            </MenubarItem>
          </MenubarSubContent>
        </MenubarSub>

        <MenubarSeparator className="bg-[#404040]" />

        <MenubarItem className="flex items-center gap-2">
          Single Page
          <MenubarShortcut>⌘4</MenubarShortcut>
        </MenubarItem>

        <MenubarItem className="flex items-center gap-2">
          Continuous Pages
          <MenubarShortcut>⌘5</MenubarShortcut>
        </MenubarItem>

        <MenubarItem className="flex items-center gap-2">
          Side-by-Side
          <MenubarShortcut>⌘6</MenubarShortcut>
        </MenubarItem>

        <MenubarItem className="flex items-center gap-2">
          Continuous Side-by-Side
          <MenubarShortcut>⌘7</MenubarShortcut>
        </MenubarItem>

        <MenubarItem className="flex items-center gap-2">
          Show Cover Page in Side-by-Side
        </MenubarItem>

        <MenubarSeparator className="bg-[#404040]" />

        <MenubarSub>
          <MenubarSubTrigger className="flex items-center gap-2">
            Rotate View
          </MenubarSubTrigger>
          <MenubarSubContent className="bg-[#333333] text-white border-[#404040]">
            {/* Rotate view options would go here */}
          </MenubarSubContent>
        </MenubarSub>

        <MenubarItem className="flex items-center gap-2">
          Split Vertical
          <MenubarShortcut>⌘2</MenubarShortcut>
        </MenubarItem>

        <MenubarItem className="flex items-center gap-2">
          Split Horizontal
          <MenubarShortcut>⌘H</MenubarShortcut>
        </MenubarItem>

        <MenubarItem disabled className="text-gray-500 flex items-center gap-2">
          Toggle Split
          <MenubarShortcut>⌘I</MenubarShortcut>
        </MenubarItem>

        <MenubarItem disabled className="text-gray-500 flex items-center gap-2">
          Switch
          <MenubarShortcut>⌘↑</MenubarShortcut>
        </MenubarItem>

        <MenubarItem disabled className="text-gray-500 flex items-center gap-2">
          Balance
          <MenubarShortcut>⇧F12</MenubarShortcut>
        </MenubarItem>

        <MenubarItem disabled className="text-gray-500 flex items-center gap-2">
          Unsplit
          <MenubarShortcut>⌘⇧2</MenubarShortcut>
        </MenubarItem>

        <MenubarSeparator className="bg-[#404040]" />

        <MenubarItem className="flex items-center gap-2">
          Synchronize Document
        </MenubarItem>

        <MenubarItem className="flex items-center gap-2">
          Synchronize Page
        </MenubarItem>

        <MenubarSeparator className="bg-[#404040]" />

        <MenubarItem className="flex items-center gap-2">
          Rulers
          <MenubarShortcut>⌘R</MenubarShortcut>
        </MenubarItem>

        <MenubarItem className="flex items-center gap-2">
          Full-Screen Crosshair
        </MenubarItem>

        <MenubarItem className="flex items-center gap-2">
          Show Grid
          <MenubarShortcut>⇧F9</MenubarShortcut>
        </MenubarItem>

        <MenubarItem className="flex items-center gap-2">
          Snap to Grid
          <MenubarShortcut>⌘⇧F9</MenubarShortcut>
        </MenubarItem>

        <MenubarItem className="flex items-center gap-2">
          Snap to Content
          <MenubarShortcut>⌘⇧F8</MenubarShortcut>
        </MenubarItem>

        <MenubarItem className="flex items-center gap-2">
          Snap to Markup
          <MenubarShortcut>⌘⇧F7</MenubarShortcut>
        </MenubarItem>

        <MenubarSeparator className="bg-[#404040]" />

        <MenubarSub>
          <MenubarSubTrigger className="flex items-center gap-2">
            Dimmer
          </MenubarSubTrigger>
          <MenubarSubContent className="bg-[#333333] text-white border-[#404040]">
            {/* Dimmer options would go here */}
          </MenubarSubContent>
        </MenubarSub>

        <MenubarItem className="flex items-center gap-2">
          Disable Line Weights
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  );
} 