'use client';

import { ReactNode, useState, useEffect, useRef } from 'react';
import { ViewMenu } from './menus/ViewMenu';
import { FileMenu } from './menus/FileMenu';
import { EditMenu } from './menus/EditMenu';
import { DocumentMenu } from './menus/DocumentMenu';
import { ToolsMenu } from './menus/ToolsMenu';
import { WindowMenu } from './menus/WindowMenu';
import { HelpMenu } from './menus/HelpMenu';
import { RedRayMenu } from './menus/FileMenu';
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
  RulerIcon,
  SplitSquareHorizontalIcon,
  SplitSquareVerticalIcon,
  ScaleIcon,
  FileTextIcon,
  PlusIcon,
  MinusIcon,
  BugIcon,
  SparklesIcon,
  PanelLeftIcon,
  PanelRightIcon,
  PanelBottomIcon,
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface RedRayShellProps {
  children: ReactNode;
  onOpenPdf?: (pdf: Pdf) => void;
}

const GEO_SHAPES = [
  { id: 'rectangle', label: 'Rectangle', icon: SquareIcon },
  { id: 'ellipse', label: 'Ellipse', icon: CircleIcon },
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

export function RedRayShell({ children, onOpenPdf }: RedRayShellProps) {
  const { editor } = useEditorContext();
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [hasSelectedShapes, setHasSelectedShapes] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTool, setCurrentTool] = useState<string>('select');
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isEditingZoom, setIsEditingZoom] = useState(false);
  const [tempZoomValue, setTempZoomValue] = useState('100');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const zoomInputRef = useRef<HTMLInputElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isEditingPage, setIsEditingPage] = useState(false);
  const [tempPageValue, setTempPageValue] = useState('1');
  const pageInputRef = useRef<HTMLInputElement>(null);

  // Add a function to check if editor is ready
  const isEditorReady = () => {
    return editor !== null;
  };

  useEffect(() => {
    if (!editor) return;

    const updateState = () => {
      setCanUndo(editor.getCanUndo());
      setCanRedo(editor.getCanRedo());
      setHasSelectedShapes(editor.getSelectedShapeIds().length > 0);
      // Update zoom level
      const zoom = editor.getZoomLevel();
      setZoomLevel(Math.round(zoom * 100));
      setTempZoomValue(Math.round(zoom * 100).toString());
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

  // Add zoom handlers
  const handleZoomIn = () => {
    if (!isEditorReady()) return;
    editor?.zoomIn();
  };

  const handleZoomOut = () => {
    if (!isEditorReady()) return;
    editor?.zoomOut();
  };

  const handleZoomToFit = () => {
    if (!isEditorReady()) return;
    editor?.zoomToFit();
  };

  const handleZoomInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTempZoomValue(value);
  };

  const handleZoomInputBlur = () => {
    if (!isEditorReady()) return;
    const value = parseInt(tempZoomValue);
    if (!isNaN(value) && value > 0) {
      const currentCamera = editor?.getCamera();
      if (currentCamera) {
        editor?.setCamera({
          ...currentCamera,
          z: value / 100
        });
      }
    } else {
      setTempZoomValue(zoomLevel.toString());
    }
    setIsEditingZoom(false);
  };

  const handleZoomInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleZoomInputBlur();
    }
  };

  const handleUndo = () => {
    if (!isEditorReady()) return;
    editor?.undo();
  };

  const handleRedo = () => {
    if (!isEditorReady()) return;
    editor?.redo();
  };

  const handleDelete = () => {
    if (!isEditorReady()) return;
    const selectedIds = editor?.getSelectedShapeIds();
    if (selectedIds?.length) {
      editor?.deleteShapes(selectedIds);
    }
  };

  const handleDuplicate = () => {
    if (!isEditorReady()) return;
    const selectedIds = editor?.getSelectedShapeIds();
    if (selectedIds?.length && editor) {
      editor.duplicateShapes(selectedIds, { x: 32, y: 0 });
    }
  };

  const handleToolChange = (toolId: string) => {
    if (!isEditorReady()) return;
    editor?.setCurrentTool(toolId);
  };

  const handleGeoShapeChange = (shapeId: typeof GEO_SHAPES[number]['id']) => {
    if (!isEditorReady()) return;
    editor?.setCurrentTool('geo');
    editor?.setStyleForNextShapes(GeoShapeGeoStyle, shapeId);
    setCurrentTool(`geo-${shapeId}`);
  };

  const handleImageButtonClick = () => {
    if (!isEditorReady()) return;
    fileInputRef.current?.click();
  };

  const handleFileInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isEditorReady()) return;
    const file = event.target.files?.[0];
    if (file && editor) {
      const point = editor.getViewportScreenCenter();
      await editor.putExternalContent({
        type: 'files',
        files: [file],
        point,
        ignoreParent: false,
      });
    }
    event.target.value = '';
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

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTempPageValue(value);
  };

  const handlePageInputBlur = () => {
    const value = parseInt(tempPageValue);
    if (!isNaN(value) && value > 0 && value <= totalPages) {
      setCurrentPage(value);
    } else {
      setTempPageValue(currentPage.toString());
    }
    setIsEditingPage(false);
  };

  const handlePageInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handlePageInputBlur();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#2B2B2B] text-white">
      {/* Header Section */}
      <div className="shrink-0">
        {/* Top Menubar */}
        <div className="h-8 border-b border-[#404040] flex items-center bg-[#333333]">
          {/* Left side - Menu */}
          <div className="flex-none">
            <Menubar className="border-none bg-transparent flex-1">
              <RedRayMenu />
              <FileMenu onOpenPdf={onOpenPdf} />
              <EditMenu />
              <ViewMenu />
              <DocumentMenu />
              <ToolsMenu />
              <WindowMenu />
              <HelpMenu />
            </Menubar>
          </div>

          {/* Center - Search Bar */}
          <div className="flex-1 flex justify-center items-center">
            <div className="w-64 bg-[#2B2B2B] rounded px-2 py-0.5 flex items-center">
              <SearchIcon className="w-3 h-3 text-gray-400 shrink-0" />
              <span className="text-xs text-gray-400 flex-1 text-center">Search</span>
            </div>
          </div>

          {/* Right side - Panel Indicators and Account Menu */}
          <div className="flex-none flex items-center gap-2 border-l-2 border-[#404040] pl-4">
            <button className="p-1 hover:bg-[#404040] rounded" title="Toggle Left Panel">
              <PanelLeftIcon className="w-3 h-3" />
            </button>
            <button className="p-1 hover:bg-[#404040] rounded" title="Toggle Bottom Panel">
              <PanelBottomIcon className="w-3 h-3" />
            </button>
            <button className="p-1 hover:bg-[#404040] rounded" title="Toggle Right Panel">
              <PanelRightIcon className="w-3 h-3" />
            </button>
            <div className="w-px h-4 bg-[#404040] mx-2"></div>
            <button className="p-1 hover:bg-[#404040] rounded" title="Notifications">
              <BellIcon className="w-4 h-4" />
            </button>
            <button className="p-1 hover:bg-[#404040] rounded" title="Account">
              <UserIcon className="w-4 h-4" />
            </button>
          </div>
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
              onClick={() => handleToolChange('select')}
              title="Select"
            >
              <MousePointer2Icon className="w-5 h-5" />
            </button>
            <button 
              className={`p-1 rounded ${currentTool === 'hand' ? 'bg-[#0078D4]' : 'hover:bg-[#404040]'}`}
              onClick={() => handleToolChange('hand')}
              title="Hand"
            >
              <HandIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Drawing Tools Group */}
          <div className="flex items-center gap-2 border-r-2 border-[#404040] pr-4">
            <button 
              className={`p-1 rounded ${currentTool === 'draw' ? 'bg-[#0078D4]' : 'hover:bg-[#404040]'}`}
              onClick={() => handleToolChange('draw')}
              title="Pen"
            >
              <PenIcon className="w-5 h-5" />
            </button>
            <button 
              className={`p-1 rounded ${currentTool === 'highlight' ? 'bg-[#0078D4]' : 'hover:bg-[#404040]'}`}
              onClick={() => handleToolChange('highlight')}
              title="Highlight"
            >
              <HighlighterIcon className="w-5 h-5" />
            </button>
            <button 
              className={`p-1 rounded ${currentTool === 'eraser' ? 'bg-[#0078D4]' : 'hover:bg-[#404040]'}`}
              onClick={() => handleToolChange('eraser')}
              title="Eraser"
            >
              <EraserIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Text and Note Tools Group */}
          <div className="flex items-center gap-2 border-r-2 border-[#404040] pr-4">
            <button 
              className={`p-1 rounded ${currentTool === 'text' ? 'bg-[#0078D4]' : 'hover:bg-[#404040]'}`}
              onClick={() => handleToolChange('text')}
              title="Text"
            >
              <TextIcon className="w-5 h-5" />
            </button>
            <button 
              className={`p-1 rounded ${currentTool === 'note' ? 'bg-[#0078D4]' : 'hover:bg-[#404040]'}`}
              onClick={() => handleToolChange('note')}
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
              onClick={() => handleToolChange('line')}
              title="Line"
            >
              <Minus className="w-5 h-5" />
            </button>
            <button 
              className={`p-1 rounded ${currentTool === 'arrow' ? 'bg-[#0078D4]' : 'hover:bg-[#404040]'}`}
              onClick={() => handleToolChange('arrow')}
              title="Arrow"
            >
              <ArrowRightIcon className="w-5 h-5" />
            </button>

            {/* Rectangle and Circle Tools */}
            <button 
              className={`p-1 rounded ${currentTool === 'geo-rectangle' ? 'bg-[#0078D4]' : 'hover:bg-[#404040]'}`}
              onClick={() => handleGeoShapeChange('rectangle')}
              title="Rectangle"
            >
              <SquareIcon className="w-5 h-5" />
            </button>
            <button 
              className={`p-1 rounded ${currentTool === 'geo-ellipse' ? 'bg-[#0078D4]' : 'hover:bg-[#404040]'}`}
              onClick={() => handleGeoShapeChange('ellipse')}
              title="Circle"
            >
              <CircleIcon className="w-5 h-5" />
            </button>

            {/* Other Shape Tools Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button 
                  className={`p-1 rounded ${currentTool.startsWith('geo-') && !['geo-rectangle', 'geo-ellipse'].includes(currentTool) ? 'bg-[#0078D4]' : 'hover:bg-[#404040]'}`}
                  title={GEO_SHAPES.find(s => currentTool === `geo-${s.id}` && !['rectangle', 'ellipse'].includes(s.id))?.label || 'Star'}
                  onClick={() => {
                    const currentShape = GEO_SHAPES.find(s => currentTool === `geo-${s.id}` && !['rectangle', 'ellipse'].includes(s.id)) || GEO_SHAPES[2];
                    handleGeoShapeChange(currentShape.id);
                  }}
                >
                  {(() => {
                    const currentShape = GEO_SHAPES.find(s => currentTool === `geo-${s.id}` && !['rectangle', 'ellipse'].includes(s.id)) || GEO_SHAPES[2];
                    const Icon = currentShape.icon;
                    return <Icon className="w-5 h-5" />;
                  })()}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 bg-[#2D2D2D] border-[#404040]">
                {GEO_SHAPES.filter(shape => !['rectangle', 'ellipse'].includes(shape.id)).map((shape) => {
                  const Icon = shape.icon;
                  return (
                    <DropdownMenuItem
                      key={shape.id}
                      className="text-white hover:bg-[#404040] cursor-pointer flex items-center gap-2"
                      onClick={() => handleGeoShapeChange(shape.id)}
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
              onClick={() => handleToolChange('laser')}
              title="Laser Pointer"
            >
              <TargetIcon className="w-5 h-5" />
            </button>
            <button 
              className={`p-1 rounded ${currentTool === 'frame' ? 'bg-[#0078D4]' : 'hover:bg-[#404040]'}`}
              onClick={() => handleToolChange('frame')}
              title="Frame"
            >
              <BoxIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Push remaining buttons to the right */}
          <div className="flex-1"></div>
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
            {/* Left side - View Controls */}
            <div className="flex items-center gap-2">
              <button className="p-1 hover:bg-[#404040] rounded" title="Split Vertically">
                <SplitSquareVerticalIcon className="w-4 h-4" />
              </button>
              <button className="p-1 hover:bg-[#404040] rounded" title="Split Horizontally">
                <SplitSquareHorizontalIcon className="w-4 h-4" />
              </button>
              <button 
                className="p-1 hover:bg-[#404040] rounded" 
                title="Fit to Page"
                onClick={handleZoomToFit}
              >
                <MaximizeIcon className="w-4 h-4" />
              </button>
            </div>

            {/* Center - Navigation */}
            <div className="flex items-center gap-2">
              <button className="p-1 hover:bg-[#404040] rounded" title="First Page">
                <ChevronsLeftIcon className="w-4 h-4" />
              </button>
              <button className="p-1 hover:bg-[#404040] rounded" title="Previous Page">
                <ChevronLeftIcon className="w-4 h-4" />
              </button>
              <div 
                className="relative group"
                onMouseEnter={() => setIsEditingPage(true)}
                onMouseLeave={() => !pageInputRef.current?.contains(document.activeElement) && setIsEditingPage(false)}
              >
                <div className={`flex items-center rounded px-2 py-0.5 w-[6rem] justify-center ${isEditingPage ? 'bg-[#404040]' : 'bg-transparent group-hover:bg-[#404040]'}`}>
                  {isEditingPage ? (
                    <input
                      ref={pageInputRef}
                      type="text"
                      value={`${tempPageValue} of ${totalPages}`}
                      onChange={handlePageInputChange}
                      onBlur={handlePageInputBlur}
                      onKeyDown={handlePageInputKeyDown}
                      className="w-full bg-transparent text-white text-sm focus:outline-none text-center"
                      autoFocus
                    />
                  ) : (
                    <span className="text-sm text-white text-center w-full group-hover:text-gray-400">{currentPage} of {totalPages}</span>
                  )}
                </div>
              </div>
              <button className="p-1 hover:bg-[#404040] rounded" title="Next Page">
                <ChevronRightIcon className="w-4 h-4" />
              </button>
              <button className="p-1 hover:bg-[#404040] rounded" title="Last Page">
                <ChevronsRightIcon className="w-4 h-4" />
              </button>
            </div>

            {/* Right side - Scale and Size */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">1 in : 20 ft</span>
              <button 
                className="p-1 hover:bg-[#404040] rounded" 
                title="Zoom Out"
                onClick={handleZoomOut}
              >
                <MinusIcon className="w-4 h-4" />
              </button>
              <div 
                className="relative group"
                onMouseEnter={() => setIsEditingZoom(true)}
                onMouseLeave={() => !zoomInputRef.current?.contains(document.activeElement) && setIsEditingZoom(false)}
              >
                <div className={`flex items-center rounded px-2 py-0.5 min-w-[3.5rem] justify-end ${isEditingZoom ? 'bg-[#404040]' : 'bg-transparent group-hover:bg-[#404040]'}`}>
                  {isEditingZoom ? (
                    <input
                      ref={zoomInputRef}
                      type="text"
                      value={tempZoomValue}
                      onChange={handleZoomInputChange}
                      onBlur={handleZoomInputBlur}
                      onKeyDown={handleZoomInputKeyDown}
                      className="w-8 bg-transparent text-white text-sm focus:outline-none text-right"
                      autoFocus
                    />
                  ) : (
                    <span className="text-sm text-white text-right w-8 group-hover:text-gray-400">{zoomLevel}</span>
                  )}
                  <span className={`text-sm ml-1 ${isEditingZoom ? 'text-white' : 'text-white group-hover:text-gray-400'}`}>%</span>
                </div>
              </div>
              <button 
                className="p-1 hover:bg-[#404040] rounded" 
                title="Zoom In"
                onClick={handleZoomIn}
              >
                <PlusIcon className="w-4 h-4" />
              </button>
              <span className="text-sm text-gray-400">24" x 36"</span>
            </div>
          </div>
        </div>

        {/* Right Toolbar */}
        <div className="w-12 bg-[#333333] border-l border-[#404040] hidden lg:block shrink-0">
          <div className="flex flex-col h-full">
            <div className="flex flex-col items-center gap-1 p-1">
              <button className="p-1 hover:bg-[#404040] rounded" title="Settings">
                <SettingsIcon className="w-5 h-5" />
              </button>
              <button className="p-1 hover:bg-[#404040] rounded" title="Ruler">
                <RulerIcon className="w-5 h-5" />
              </button>
              <button className="p-1 hover:bg-[#404040] rounded" title="Location">
                <FileTextIcon className="w-5 h-5" />
              </button>
              <button className="p-1 hover:bg-[#404040] rounded" title="Layout">
                <LayoutGridIcon className="w-5 h-5" />
              </button>
              <button className="p-1 hover:bg-[#404040] rounded" title="Search">
                <SearchIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1"></div>
            <div className="flex flex-col items-center gap-1 p-1 border-t border-[#404040]">
              <button className="p-1 text-gray-500 cursor-not-allowed" title="AI Assistant (Inactive)">
                <SparklesIcon className="w-5 h-5" />
              </button>
              <button className="p-1 text-gray-500 cursor-not-allowed" title="Support (Inactive)">
                <HelpCircleIcon className="w-5 h-5" />
              </button>
              <button className="p-1 text-gray-500 cursor-not-allowed" title="Messages (Inactive)">
                <MessageSquareIcon className="w-5 h-5" />
              </button>
              <button className="p-1 text-gray-500 cursor-not-allowed" title="Debugger (Inactive)">
                <BugIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 