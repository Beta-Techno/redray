'use client';

import { ReactNode, useState, useEffect, useRef } from 'react';
import { ViewMenu } from './menus/ViewMenu';
import { FileMenu } from './menus/FileMenu';
import { EditMenu } from './menus/EditMenu';
import { DocumentMenu } from './menus/DocumentMenu';
import { ToolsMenu } from './menus/ToolsMenu';
import { WindowMenu } from './menus/WindowMenu';
import { HelpMenu } from './menus/HelpMenu';
import { Menubar } from '@/components/ui/menubar';
import { Pdf } from '@/components/pdf-editor/PdfPicker';
import { useEditorContext } from '@/components/editor/EditorContext';
import { loadPdf } from '@/utils/pdf';
import { TLAsset, TLImageShape, TLAssetId, TLShapeId, IndexKey, GeoShapeGeoStyle, react } from '@tldraw/tldraw';
import { TLShape } from '@tldraw/tldraw';
import { 
  Undo2Icon, 
  Redo2Icon, 
  Trash2Icon, 
  Copy,
  FilePlusIcon,
  FolderOpenIcon,
  SaveIcon,
  PrinterIcon,
  SendIcon,
  ZoomInIcon,
  LayoutGridIcon,
  MousePointer2Icon,
  HandIcon,
  PenIcon,
  EraserIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  ZoomOutIcon,
  MaximizeIcon,
  MinimizeIcon,
  SettingsIcon,
  HelpCircleIcon,
  SearchIcon,
  MessageSquareIcon,
  BellIcon,
  UserIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  TypeIcon,
  StickyNoteIcon,
  SquareIcon,
  CircleIcon,
  Minus,
  HighlighterIcon,
  TextIcon,
  ArrowRightIcon,
  StarIcon,
  TriangleIcon,
  DiamondIcon,
  PentagonIcon,
  HexagonIcon,
  OctagonIcon,
  CloudIcon,
  CheckSquareIcon,
  HeartIcon,
  ArrowLeftIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  XIcon,
  ImageIcon,
  TargetIcon,
  BoxIcon,
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface BluebeamShellProps {
  children: ReactNode;
  onOpenPdf?: (pdf: Pdf) => void;
}

const GEO_SHAPES = [
  { id: 'star', label: 'Star', icon: StarIcon },
  { id: 'triangle', label: 'Triangle', icon: TriangleIcon },
  { id: 'diamond', label: 'Diamond', icon: DiamondIcon },
  { id: 'pentagon', label: 'Pentagon', icon: PentagonIcon },
  { id: 'hexagon', label: 'Hexagon', icon: HexagonIcon },
  { id: 'octagon', label: 'Octagon', icon: OctagonIcon },
  { id: 'rhombus', label: 'Rhombus', icon: DiamondIcon },
  { id: 'rhombus-2', label: 'Rhombus 2', icon: DiamondIcon },
  { id: 'oval', label: 'Oval', icon: CircleIcon },
  { id: 'trapezoid', label: 'Trapezoid', icon: SquareIcon },
  { id: 'cloud', label: 'Cloud', icon: CloudIcon },
  { id: 'x-box', label: 'X Box', icon: XIcon },
  { id: 'check-box', label: 'Check Box', icon: CheckSquareIcon },
  { id: 'heart', label: 'Heart', icon: HeartIcon },
  { id: 'arrow-right', label: 'Arrow Right', icon: ArrowRightIcon },
  { id: 'arrow-left', label: 'Arrow Left', icon: ArrowLeftIcon },
  { id: 'arrow-up', label: 'Arrow Up', icon: ArrowUpIcon },
  { id: 'arrow-down', label: 'Arrow Down', icon: ArrowDownIcon },
] as const;

export function BluebeamShell({ children, onOpenPdf }: BluebeamShellProps) {
  const { editor } = useEditorContext();
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [hasSelectedShapes, setHasSelectedShapes] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTool, setCurrentTool] = useState<string>('select');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!editor) return;

    const updateState = () => {
      setCanUndo(editor.getCanUndo());
      setCanRedo(editor.getCanRedo());
      setHasSelectedShapes(editor.getSelectedShapeIds().length > 0);
    };

    // Initial state
    updateState();

    // Subscribe to changes
    const unsubscribe = editor.store.listen(updateState);

    return () => {
      unsubscribe();
    };
  }, [editor]);

  // Track tool state using tldraw's react function
  useEffect(() => {
    if (!editor) return;

    const tool = editor.getCurrentTool();
    setCurrentTool(tool.id);

    return react('tool state', () => {
      const newTool = editor.getCurrentTool();
      setCurrentTool(newTool.id);
    });
  }, [editor]);

  const handleUndo = () => {
    editor?.undo();
  };

  const handleRedo = () => {
    editor?.redo();
  };

  const handleDelete = () => {
    const selectedIds = editor?.getSelectedShapeIds();
    if (selectedIds?.length) {
      editor?.deleteShapes(selectedIds);
    }
  };

  const handleDuplicate = () => {
    const selectedIds = editor?.getSelectedShapeIds();
    if (selectedIds?.length && editor) {
      editor.duplicateShapes(selectedIds, { x: 32, y: 0 });
    }
  };

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

  const handleImageButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && editor) {
      const point = editor.getViewportScreenCenter(); // position at viewport center
      await editor.putExternalContent({
        type: 'files',
        files: [file],
        point,
        ignoreParent: false,
      });
    }
    event.target.value = '';
  };

  return (
    <div className="flex flex-col h-screen bg-[#2B2B2B] text-white">
      {/* Header Section */}
      <div className="shrink-0">
        {/* Top Menubar */}
        <div className="h-8 border-b border-[#404040] flex items-center px-1 bg-[#333333]">
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

        {/* Toolbar */}
        <div className="h-10 border-b border-[#404040] flex items-center gap-4 px-4 bg-[#333333]">
          {/* File Operations Group */}
          <div className="flex items-center gap-2 border-r-2 border-[#404040] pr-4">
            <button className="p-1 hover:bg-[#404040] rounded" title="New">
              <FilePlusIcon className="w-5 h-5" />
            </button>
            <button 
              className={`p-1 rounded ${isLoading ? 'text-gray-500 cursor-not-allowed' : 'hover:bg-[#404040]'}`}
              onClick={handleOpenPdf}
              disabled={isLoading}
              title="Open"
            >
              <FolderOpenIcon className="w-5 h-5" />
            </button>
            <button className="p-1 hover:bg-[#404040] rounded" title="Save">
              <SaveIcon className="w-5 h-5" />
            </button>
            <button className="p-1 hover:bg-[#404040] rounded" title="Print">
              <PrinterIcon className="w-5 h-5" />
            </button>
            <button className="p-1 hover:bg-[#404040] rounded" title="Send">
              <SendIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Edit Operations Group */}
          <div className="flex items-center gap-2 border-r-2 border-[#404040] pr-4">
            <button 
              className={`p-1 rounded ${canUndo ? 'hover:bg-[#404040] text-white' : 'text-gray-500 cursor-not-allowed'}`}
              onClick={handleUndo}
              disabled={!canUndo}
              title="Undo"
            >
              <Undo2Icon className="w-5 h-5" />
            </button>
            <button 
              className={`p-1 rounded ${canRedo ? 'hover:bg-[#404040] text-white' : 'text-gray-500 cursor-not-allowed'}`}
              onClick={handleRedo}
              disabled={!canRedo}
              title="Redo"
            >
              <Redo2Icon className="w-5 h-5" />
            </button>
            <button 
              className={`p-1 rounded ${hasSelectedShapes ? 'hover:bg-[#404040] text-white' : 'text-gray-500 cursor-not-allowed'}`}
              onClick={handleDuplicate}
              disabled={!hasSelectedShapes}
              title="Duplicate"
            >
              <Copy className="w-5 h-5" />
            </button>
            <button 
              className={`p-1 rounded ${hasSelectedShapes ? 'hover:bg-[#404040] text-white' : 'text-gray-500 cursor-not-allowed'}`}
              onClick={handleDelete}
              disabled={!hasSelectedShapes}
              title="Delete"
            >
              <Trash2Icon className="w-5 h-5" />
            </button>
          </div>

          {/* Selection Tools Group */}
          <div className="flex items-center gap-2 border-r-2 border-[#404040] pr-4">
            <button 
              className={`p-1 rounded ${currentTool === 'select' ? 'bg-[#0078D4]' : 'hover:bg-[#404040]'}`}
              onClick={() => editor?.setCurrentTool('select')}
              title="Select"
            >
              <MousePointer2Icon className="w-5 h-5" />
            </button>
            <button 
              className={`p-1 rounded ${currentTool === 'hand' ? 'bg-[#0078D4]' : 'hover:bg-[#404040]'}`}
              onClick={() => editor?.setCurrentTool('hand')}
              title="Hand"
            >
              <HandIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Drawing Tools Group */}
          <div className="flex items-center gap-2 border-r-2 border-[#404040] pr-4">
            <button 
              className={`p-1 rounded ${currentTool === 'draw' ? 'bg-[#0078D4]' : 'hover:bg-[#404040]'}`}
              onClick={() => editor?.setCurrentTool('draw')}
              title="Pen"
            >
              <PenIcon className="w-5 h-5" />
            </button>
            <button 
              className={`p-1 rounded ${currentTool === 'highlight' ? 'bg-[#0078D4]' : 'hover:bg-[#404040]'}`}
              onClick={() => editor?.setCurrentTool('highlight')}
              title="Highlight"
            >
              <HighlighterIcon className="w-5 h-5" />
            </button>
            <button 
              className={`p-1 rounded ${currentTool === 'eraser' ? 'bg-[#0078D4]' : 'hover:bg-[#404040]'}`}
              onClick={() => editor?.setCurrentTool('eraser')}
              title="Eraser"
            >
              <EraserIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Text and Note Tools Group */}
          <div className="flex items-center gap-2 border-r-2 border-[#404040] pr-4">
            <button 
              className={`p-1 rounded ${currentTool === 'text' ? 'bg-[#0078D4]' : 'hover:bg-[#404040]'}`}
              onClick={() => editor?.setCurrentTool('text')}
              title="Text"
            >
              <TextIcon className="w-5 h-5" />
            </button>
            <button 
              className={`p-1 rounded ${currentTool === 'note' ? 'bg-[#0078D4]' : 'hover:bg-[#404040]'}`}
              onClick={() => editor?.setCurrentTool('note')}
              title="Note"
            >
              <StickyNoteIcon className="w-5 h-5" />
            </button>
            <button 
              className="p-1 rounded hover:bg-[#404040]"
              onClick={handleImageButtonClick}
              title="Insert Image"
            >
              <ImageIcon className="w-5 h-5" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleFileInputChange}
            />
          </div>

          {/* Shape Tools Group */}
          <div className="flex items-center gap-2 border-r-2 border-[#404040] pr-4">
            {/* Line and Arrow Tools */}
            <button 
              className={`p-1 rounded ${currentTool === 'line' ? 'bg-[#0078D4]' : 'hover:bg-[#404040]'}`}
              onClick={() => editor?.setCurrentTool('line')}
              title="Line"
            >
              <Minus className="w-5 h-5" />
            </button>
            <button 
              className={`p-1 rounded ${currentTool === 'arrow' ? 'bg-[#0078D4]' : 'hover:bg-[#404040]'}`}
              onClick={() => editor?.setCurrentTool('arrow')}
              title="Arrow"
            >
              <ArrowRightIcon className="w-5 h-5" />
            </button>

            {/* Rectangle and Ellipse Tools */}
            <button 
              className={`p-1 rounded ${currentTool === 'geo-rectangle' ? 'bg-[#0078D4]' : 'hover:bg-[#404040]'}`}
              onClick={() => {
                editor?.setCurrentTool('geo');
                editor?.setStyleForNextShapes(GeoShapeGeoStyle, 'rectangle');
                setCurrentTool('geo-rectangle');
              }}
              title="Rectangle"
            >
              <SquareIcon className="w-5 h-5" />
            </button>
            <button 
              className={`p-1 rounded ${currentTool === 'geo-ellipse' ? 'bg-[#0078D4]' : 'hover:bg-[#404040]'}`}
              onClick={() => {
                editor?.setCurrentTool('geo');
                editor?.setStyleForNextShapes(GeoShapeGeoStyle, 'ellipse');
                setCurrentTool('geo-ellipse');
              }}
              title="Ellipse"
            >
              <CircleIcon className="w-5 h-5" />
            </button>

            {/* Star Shape with Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button 
                  className={`p-1 rounded ${currentTool.startsWith('geo-') ? 'bg-[#0078D4]' : 'hover:bg-[#404040]'}`}
                  title={GEO_SHAPES.find(s => currentTool === `geo-${s.id}`)?.label || 'Star'}
                  onClick={() => {
                    const currentShape = GEO_SHAPES.find(s => currentTool === `geo-${s.id}`) || GEO_SHAPES[0];
                    editor?.setCurrentTool('geo');
                    editor?.setStyleForNextShapes(GeoShapeGeoStyle, currentShape.id);
                    setCurrentTool(`geo-${currentShape.id}`);
                  }}
                >
                  {(() => {
                    const currentShape = GEO_SHAPES.find(s => currentTool === `geo-${s.id}`) || GEO_SHAPES[0];
                    const Icon = currentShape.icon;
                    return <Icon className="w-5 h-5" />;
                  })()}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 bg-[#2D2D2D] border-[#404040]">
                {GEO_SHAPES.map((shape) => {
                  const Icon = shape.icon;
                  return (
                    <DropdownMenuItem
                      key={shape.id}
                      className="text-white hover:bg-[#404040] cursor-pointer flex items-center gap-2"
                      onClick={() => {
                        editor?.setCurrentTool('geo');
                        editor?.setStyleForNextShapes(GeoShapeGeoStyle, shape.id);
                        setCurrentTool(`geo-${shape.id}`);
                      }}
                    >
                      <Icon className="w-4 h-4" />
                      {shape.label}
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Laser and Frame Tools Group */}
          <div className="flex items-center gap-2 border-r-2 border-[#404040] pr-4">
            <button 
              className={`p-1 rounded ${currentTool === 'laser' ? 'bg-[#0078D4]' : 'hover:bg-[#404040]'}`}
              onClick={() => editor?.setCurrentTool('laser')}
              title="Laser Pointer"
            >
              <TargetIcon className="w-5 h-5" />
            </button>
            <button 
              className={`p-1 rounded ${currentTool === 'frame' ? 'bg-[#0078D4]' : 'hover:bg-[#404040]'}`}
              onClick={() => editor?.setCurrentTool('frame')}
              title="Frame"
            >
              <BoxIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Push remaining buttons to the right */}
          <div className="flex-1"></div>

          {/* View Operations Group */}
          <div className="flex items-center gap-2 border-l-2 border-[#404040] pl-4">
            <button className="p-1 hover:bg-[#404040] rounded" title="Zoom">
              <ZoomInIcon className="w-5 h-5" />
            </button>
            <button className="p-1 hover:bg-[#404040] rounded" title="Grid">
              <LayoutGridIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 min-h-0">
        {/* Left Sidebar - Initially Hidden */}
        <div className="w-64 bg-[#333333] border-r border-[#404040] hidden lg:block shrink-0">
          {/* Placeholder for thumbnails */}
        </div>

        {/* Main Content with Footer */}
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          {/* Content Container */}
          <div className="flex-1 min-h-0 overflow-auto">
            {children}
          </div>
          
          {/* Bottom Bar */}
          <div className="h-8 border-t border-[#404040] flex items-center justify-between px-4 bg-[#2B2B2B] shrink-0">
            {/* Left side - Navigation */}
            <div className="flex items-center gap-2">
              <button className="p-1 hover:bg-[#404040] rounded" title="First Page">
                <ChevronsLeftIcon className="w-4 h-4" />
              </button>
              <button className="p-1 hover:bg-[#404040] rounded" title="Previous Page">
                <ChevronLeftIcon className="w-4 h-4" />
              </button>
              <span className="text-sm text-gray-400">Page 1 of 1</span>
              <button className="p-1 hover:bg-[#404040] rounded" title="Next Page">
                <ChevronRightIcon className="w-4 h-4" />
              </button>
              <button className="p-1 hover:bg-[#404040] rounded" title="Last Page">
                <ChevronsRightIcon className="w-4 h-4" />
              </button>
            </div>

            {/* Center - Zoom and View */}
            <div className="flex items-center gap-2">
              <button className="p-1 hover:bg-[#404040] rounded" title="Zoom Out">
                <ZoomOutIcon className="w-4 h-4" />
              </button>
              <span className="text-sm text-gray-400">100%</span>
              <button className="p-1 hover:bg-[#404040] rounded" title="Zoom In">
                <ZoomInIcon className="w-4 h-4" />
              </button>
              <button className="p-1 hover:bg-[#404040] rounded" title="Fit to Page">
                <MaximizeIcon className="w-4 h-4" />
              </button>
              <button className="p-1 hover:bg-[#404040] rounded" title="Actual Size">
                <MinimizeIcon className="w-4 h-4" />
              </button>
            </div>

            {/* Right side - Status and Tools */}
            <div className="flex items-center gap-2">
              <button className="p-1 hover:bg-[#404040] rounded" title="Settings">
                <SettingsIcon className="w-4 h-4" />
              </button>
              <button className="p-1 hover:bg-[#404040] rounded" title="Help">
                <HelpCircleIcon className="w-4 h-4" />
              </button>
              <button className="p-1 hover:bg-[#404040] rounded" title="Search">
                <SearchIcon className="w-4 h-4" />
              </button>
              <button className="p-1 hover:bg-[#404040] rounded" title="Comments">
                <MessageSquareIcon className="w-4 h-4" />
              </button>
              <button className="p-1 hover:bg-[#404040] rounded" title="Notifications">
                <BellIcon className="w-4 h-4" />
              </button>
              <button className="p-1 hover:bg-[#404040] rounded" title="User">
                <UserIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Toolbar - Initially Hidden */}
        <div className="w-12 bg-[#333333] border-l border-[#404040] hidden lg:block shrink-0">
          <div className="flex flex-col items-center gap-1 p-1">
            <button className="p-1 hover:bg-[#404040] rounded" title="Previous Page">
              <ChevronUpIcon className="w-5 h-5" />
            </button>
            <button className="p-1 hover:bg-[#404040] rounded" title="Next Page">
              <ChevronDownIcon className="w-5 h-5" />
            </button>
            <button className="p-1 hover:bg-[#404040] rounded" title="First Page">
              <ChevronsLeftIcon className="w-5 h-5" />
            </button>
            <button className="p-1 hover:bg-[#404040] rounded" title="Last Page">
              <ChevronsRightIcon className="w-5 h-5" />
            </button>
            <button className="p-1 hover:bg-[#404040] rounded" title="Zoom Out">
              <ZoomOutIcon className="w-5 h-5" />
            </button>
            <button className="p-1 hover:bg-[#404040] rounded" title="Zoom In">
              <ZoomInIcon className="w-5 h-5" />
            </button>
            <button className="p-1 hover:bg-[#404040] rounded" title="Fit to Page">
              <MaximizeIcon className="w-5 h-5" />
            </button>
            <button className="p-1 hover:bg-[#404040] rounded" title="Actual Size">
              <MinimizeIcon className="w-5 h-5" />
            </button>
            <button className="p-1 hover:bg-[#404040] rounded" title="Settings">
              <SettingsIcon className="w-5 h-5" />
            </button>
            <button className="p-1 hover:bg-[#404040] rounded" title="Help">
              <HelpCircleIcon className="w-5 h-5" />
            </button>
            <button className="p-1 hover:bg-[#404040] rounded" title="Search">
              <SearchIcon className="w-5 h-5" />
            </button>
            <button className="p-1 hover:bg-[#404040] rounded" title="Comments">
              <MessageSquareIcon className="w-5 h-5" />
            </button>
            <button className="p-1 hover:bg-[#404040] rounded" title="Notifications">
              <BellIcon className="w-5 h-5" />
            </button>
            <button className="p-1 hover:bg-[#404040] rounded" title="User">
              <UserIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 