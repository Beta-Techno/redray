'use client';

import { ReactNode } from 'react';
import { ViewMenu } from './menus/ViewMenu';
import { FileMenu } from './menus/FileMenu';
import { EditMenu } from './menus/EditMenu';
import { DocumentMenu } from './menus/DocumentMenu';
import { ToolsMenu } from './menus/ToolsMenu';
import { WindowMenu } from './menus/WindowMenu';
import { HelpMenu } from './menus/HelpMenu';
import { Menubar } from '@/components/ui/menubar';
import { Pdf } from '@/components/pdf-editor/PdfPicker';

interface BluebeamShellProps {
  children: ReactNode;
  onOpenPdf?: (pdf: Pdf) => void;
}

export function BluebeamShell({ children, onOpenPdf }: BluebeamShellProps) {
  return (
    <div className="flex flex-col h-screen bg-[#2B2B2B] text-white">
      {/* Top Bar with Menubar */}
      <div className="h-12 border-b border-[#404040] flex items-center px-4 shrink-0 bg-[#333333]">
        <Menubar className="border-none bg-transparent">
          <FileMenu onOpenPdf={onOpenPdf} />
          <EditMenu />
          <ViewMenu />
          <DocumentMenu />
          <ToolsMenu />
          <WindowMenu />
          <HelpMenu />
        </Menubar>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 min-h-0">
        {/* Left Sidebar - Initially Hidden */}
        <div className="w-64 bg-[#333333] border-r border-[#404040] hidden lg:block shrink-0">
          {/* Placeholder for thumbnails */}
        </div>

        {/* Main Content with Footer */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Content Container */}
          <div className="flex-1 min-h-0">
            {children}
          </div>
          
          {/* Bottom Bar */}
          <div className="h-8 border-t border-[#404040] flex items-center px-4 bg-[#2B2B2B] shrink-0">
            <div className="text-sm text-gray-400">Ready</div>
          </div>
        </div>

        {/* Right Toolbar - Initially Hidden */}
        <div className="w-12 bg-[#333333] border-l border-[#404040] hidden lg:block shrink-0">
          {/* Placeholder for tools */}
        </div>
      </div>
    </div>
  );
} 