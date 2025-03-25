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
import { SettingsDialog } from '@/components/settings/SettingsDialog';

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
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [deleteButtonRef, setDeleteButtonRef] = useState<HTMLButtonElement | null>(null);
  const [undoButtonRef, setUndoButtonRef] = useState<HTMLButtonElement | null>(null);
  const [redoButtonRef, setRedoButtonRef] = useState<HTMLButtonElement | null>(null);

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
    setIsEditingZoom(false);  // Always set to false first
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

  // Add effect to reset button styles when states change
  useEffect(() => {
    if (deleteButtonRef && !hasSelectedShapes) {
      deleteButtonRef.style.backgroundColor = "transparent";
      deleteButtonRef.style.color = "hsl(var(--foreground))";
    }
    if (undoButtonRef && !canUndo) {
      undoButtonRef.style.backgroundColor = "transparent";
      undoButtonRef.style.color = "hsl(var(--foreground))";
    }
    if (redoButtonRef && !canRedo) {
      redoButtonRef.style.backgroundColor = "transparent";
      redoButtonRef.style.color = "hsl(var(--foreground))";
    }
  }, [hasSelectedShapes, canUndo, canRedo]);

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      {/* Header Section */}
      <div className="shrink-0">
        {/* Top Menubar */}
        <div className="h-8 border-b border-border flex items-center bg-header">
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
            <div className="w-64 relative flex items-center">
              <SearchIcon className="w-3 h-3 text-muted-foreground absolute left-2" />
              <input
                type="text"
                placeholder="Search"
                className="w-full bg-background/50 border border-input hover:border-accent focus:border-accent rounded px-7 py-0.5 text-xs outline-none text-left placeholder:text-center"
              />
            </div>
          </div>

          {/* Right side - Panel Indicators and Account Menu */}
          <div className="flex-none flex items-center gap-2 pl-4">
            <button 
              className="p-1 rounded" 
              title="Toggle Left Panel"
              style={{
                backgroundColor: "transparent",
                color: "hsl(var(--foreground))",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "hsl(var(--accent))";
                e.currentTarget.style.color = "hsl(var(--accent-foreground))";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "hsl(var(--foreground))";
              }}
            >
              <PanelLeftIcon className="w-3 h-3" />
            </button>
            <button 
              className="p-1 rounded" 
              title="Toggle Bottom Panel"
              style={{
                backgroundColor: "transparent",
                color: "hsl(var(--foreground))",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "hsl(var(--accent))";
                e.currentTarget.style.color = "hsl(var(--accent-foreground))";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "hsl(var(--foreground))";
              }}
            >
              <PanelBottomIcon className="w-3 h-3" />
            </button>
            <button 
              className="p-1 rounded" 
              title="Toggle Right Panel"
              style={{
                backgroundColor: "transparent",
                color: "hsl(var(--foreground))",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "hsl(var(--accent))";
                e.currentTarget.style.color = "hsl(var(--accent-foreground))";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "hsl(var(--foreground))";
              }}
            >
              <PanelRightIcon className="w-3 h-3" />
            </button>
            <div className="flex items-center gap-2 border-l border-border pl-4 pr-4">
              <button 
                className="p-1 rounded" 
                title="Notifications"
                style={{
                  backgroundColor: "transparent",
                  color: "hsl(var(--foreground))",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "hsl(var(--accent))";
                  e.currentTarget.style.color = "hsl(var(--accent-foreground))";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "hsl(var(--foreground))";
                }}
              >
                <BellIcon className="w-4 h-4" />
              </button>
              <button 
                className="p-1 rounded" 
                title="Account Settings"
                onClick={() => setIsSettingsOpen(true)}
                style={{
                  backgroundColor: "transparent",
                  color: "hsl(var(--foreground))",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "hsl(var(--accent))";
                  e.currentTarget.style.color = "hsl(var(--accent-foreground))";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "hsl(var(--foreground))";
                }}
              >
                <UserIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="h-10 border-b border-border flex items-center gap-4 px-4 bg-toolbar">
          {/* File Operations Group */}
          <div className="flex items-center gap-2 border-r-2 border-border pr-4">
            <button 
              className="p-2 rounded" 
              title="New"
              style={{
                backgroundColor: "transparent",
                color: "hsl(var(--foreground))",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "hsl(var(--accent))";
                e.currentTarget.style.color = "hsl(var(--accent-foreground))";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "hsl(var(--foreground))";
              }}
            >
              <FilePlusIcon className="w-5 h-5" />
            </button>
            <button 
              className={`p-2 rounded ${isLoading ? 'text-muted-foreground cursor-not-allowed' : ''}`}
              onClick={handleOpenPdf}
              disabled={isLoading}
              title="Open"
              style={{
                backgroundColor: "transparent",
                color: isLoading ? undefined : "hsl(var(--foreground))",
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.backgroundColor = "hsl(var(--accent))";
                  e.currentTarget.style.color = "hsl(var(--accent-foreground))";
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "hsl(var(--foreground))";
                }
              }}
            >
              <FolderOpenIcon className="w-5 h-5" />
            </button>
            <button 
              className="p-2 rounded" 
              title="Save"
              style={{
                backgroundColor: "transparent",
                color: "hsl(var(--foreground))",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "hsl(var(--accent))";
                e.currentTarget.style.color = "hsl(var(--accent-foreground))";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "hsl(var(--foreground))";
              }}
            >
              <SaveIcon className="w-5 h-5" />
            </button>
            <button 
              className="p-2 rounded" 
              title="Print"
              style={{
                backgroundColor: "transparent",
                color: "hsl(var(--foreground))",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "hsl(var(--accent))";
                e.currentTarget.style.color = "hsl(var(--accent-foreground))";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "hsl(var(--foreground))";
              }}
            >
              <PrinterIcon className="w-5 h-5" />
            </button>
            <button 
              className="p-2 rounded" 
              title="Send"
              style={{
                backgroundColor: "transparent",
                color: "hsl(var(--foreground))",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "hsl(var(--accent))";
                e.currentTarget.style.color = "hsl(var(--accent-foreground))";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "hsl(var(--foreground))";
              }}
            >
              <SendIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Edit Operations Group */}
          <div className="flex items-center gap-2 border-r-2 border-border pr-4">
            <button 
              className={`p-2 rounded ${!canUndo ? 'opacity-40' : ''}`}
              onClick={handleUndo}
              disabled={!canUndo}
              title="Undo"
              ref={setUndoButtonRef}
              style={{
                backgroundColor: "transparent",
                color: "hsl(var(--foreground))",
              }}
              onMouseEnter={(e) => {
                if (canUndo) {
                  e.currentTarget.style.backgroundColor = "hsl(var(--accent))";
                  e.currentTarget.style.color = "hsl(var(--accent-foreground))";
                }
              }}
              onMouseLeave={(e) => {
                if (canUndo) {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "hsl(var(--foreground))";
                }
              }}
            >
              <Undo2Icon className="w-5 h-5" />
            </button>
            <button 
              className={`p-2 rounded ${!canRedo ? 'opacity-40' : ''}`}
              onClick={handleRedo}
              disabled={!canRedo}
              title="Redo"
              ref={setRedoButtonRef}
              style={{
                backgroundColor: "transparent",
                color: "hsl(var(--foreground))",
              }}
              onMouseEnter={(e) => {
                if (canRedo) {
                  e.currentTarget.style.backgroundColor = "hsl(var(--accent))";
                  e.currentTarget.style.color = "hsl(var(--accent-foreground))";
                }
              }}
              onMouseLeave={(e) => {
                if (canRedo) {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "hsl(var(--foreground))";
                }
              }}
            >
              <Redo2Icon className="w-5 h-5" />
            </button>
            <button 
              className={`p-2 rounded ${!hasSelectedShapes ? 'opacity-40' : ''}`}
              onClick={handleDuplicate}
              disabled={!hasSelectedShapes}
              title="Duplicate"
              style={{
                backgroundColor: "transparent",
                color: "hsl(var(--foreground))",
              }}
              onMouseEnter={(e) => {
                if (hasSelectedShapes) {
                  e.currentTarget.style.backgroundColor = "hsl(var(--accent))";
                  e.currentTarget.style.color = "hsl(var(--accent-foreground))";
                }
              }}
              onMouseLeave={(e) => {
                if (hasSelectedShapes) {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "hsl(var(--foreground))";
                }
              }}
            >
              <Copy className="w-5 h-5" />
            </button>
            <button 
              className={`p-2 rounded ${!hasSelectedShapes ? 'opacity-40' : ''}`}
              onClick={handleDelete}
              disabled={!hasSelectedShapes}
              title="Delete"
              ref={setDeleteButtonRef}
              style={{
                backgroundColor: "transparent",
                color: "hsl(var(--foreground))",
              }}
              onMouseEnter={(e) => {
                if (hasSelectedShapes) {
                  e.currentTarget.style.backgroundColor = "hsl(var(--accent))";
                  e.currentTarget.style.color = "hsl(var(--accent-foreground))";
                }
              }}
              onMouseLeave={(e) => {
                if (hasSelectedShapes) {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "hsl(var(--foreground))";
                }
              }}
            >
              <Trash2Icon className="w-5 h-5" />
            </button>
          </div>

          {/* Selection Tools Group */}
          <div className="flex items-center gap-2 border-r-2 border-border pr-4">
            <button 
              className={`p-2 rounded`}
              onClick={() => handleToolChange('select')}
              title="Select"
              style={{
                backgroundColor: currentTool === 'select' ? "hsl(var(--primary))" : "transparent",
                color: currentTool === 'select' ? "hsl(var(--primary-foreground))" : "hsl(var(--foreground))",
              }}
              onMouseEnter={(e) => {
                if (currentTool !== 'select') {
                  e.currentTarget.style.backgroundColor = "hsl(var(--accent))";
                  e.currentTarget.style.color = "hsl(var(--accent-foreground))";
                }
              }}
              onMouseLeave={(e) => {
                if (currentTool !== 'select') {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "hsl(var(--foreground))";
                }
              }}
            >
              <MousePointer2Icon className="w-5 h-5" />
            </button>
            <button 
              className={`p-2 rounded`}
              onClick={() => handleToolChange('hand')}
              title="Hand"
              style={{
                backgroundColor: currentTool === 'hand' ? "hsl(var(--primary))" : "transparent",
                color: currentTool === 'hand' ? "hsl(var(--primary-foreground))" : "hsl(var(--foreground))",
              }}
              onMouseEnter={(e) => {
                if (currentTool !== 'hand') {
                  e.currentTarget.style.backgroundColor = "hsl(var(--accent))";
                  e.currentTarget.style.color = "hsl(var(--accent-foreground))";
                }
              }}
              onMouseLeave={(e) => {
                if (currentTool !== 'hand') {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "hsl(var(--foreground))";
                }
              }}
            >
              <HandIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Drawing Tools Group */}
          <div className="flex items-center gap-2 border-r-2 border-border pr-4">
            <button 
              className="p-2 rounded"
              onClick={() => handleToolChange('draw')}
              title="Pen"
              style={{
                backgroundColor: currentTool === 'draw' ? "hsl(var(--primary))" : "transparent",
                color: currentTool === 'draw' ? "hsl(var(--primary-foreground))" : "hsl(var(--foreground))",
              }}
              onMouseEnter={(e) => {
                if (currentTool !== 'draw') {
                  e.currentTarget.style.backgroundColor = "hsl(var(--accent))";
                  e.currentTarget.style.color = "hsl(var(--accent-foreground))";
                }
              }}
              onMouseLeave={(e) => {
                if (currentTool !== 'draw') {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "hsl(var(--foreground))";
                }
              }}
            >
              <PenIcon className="w-5 h-5" />
            </button>
            <button 
              className="p-2 rounded"
              onClick={() => handleToolChange('highlight')}
              title="Highlight"
              style={{
                backgroundColor: currentTool === 'highlight' ? "hsl(var(--primary))" : "transparent",
                color: currentTool === 'highlight' ? "hsl(var(--primary-foreground))" : "hsl(var(--foreground))",
              }}
              onMouseEnter={(e) => {
                if (currentTool !== 'highlight') {
                  e.currentTarget.style.backgroundColor = "hsl(var(--accent))";
                  e.currentTarget.style.color = "hsl(var(--accent-foreground))";
                }
              }}
              onMouseLeave={(e) => {
                if (currentTool !== 'highlight') {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "hsl(var(--foreground))";
                }
              }}
            >
              <HighlighterIcon className="w-5 h-5" />
            </button>
            <button 
              className="p-2 rounded"
              onClick={() => handleToolChange('eraser')}
              title="Eraser"
              style={{
                backgroundColor: currentTool === 'eraser' ? "hsl(var(--primary))" : "transparent",
                color: currentTool === 'eraser' ? "hsl(var(--primary-foreground))" : "hsl(var(--foreground))",
              }}
              onMouseEnter={(e) => {
                if (currentTool !== 'eraser') {
                  e.currentTarget.style.backgroundColor = "hsl(var(--accent))";
                  e.currentTarget.style.color = "hsl(var(--accent-foreground))";
                }
              }}
              onMouseLeave={(e) => {
                if (currentTool !== 'eraser') {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "hsl(var(--foreground))";
                }
              }}
            >
              <EraserIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Text and Note Tools Group */}
          <div className="flex items-center gap-2 border-r-2 border-border pr-4">
            <button 
              className="p-2 rounded"
              onClick={() => handleToolChange('text')}
              title="Text"
              style={{
                backgroundColor: currentTool === 'text' ? "hsl(var(--primary))" : "transparent",
                color: currentTool === 'text' ? "hsl(var(--primary-foreground))" : "hsl(var(--foreground))",
              }}
              onMouseEnter={(e) => {
                if (currentTool !== 'text') {
                  e.currentTarget.style.backgroundColor = "hsl(var(--accent))";
                  e.currentTarget.style.color = "hsl(var(--accent-foreground))";
                }
              }}
              onMouseLeave={(e) => {
                if (currentTool !== 'text') {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "hsl(var(--foreground))";
                }
              }}
            >
              <TextIcon className="w-5 h-5" />
            </button>
            <button 
              className="p-2 rounded"
              onClick={() => handleToolChange('note')}
              title="Note"
              style={{
                backgroundColor: currentTool === 'note' ? "hsl(var(--primary))" : "transparent",
                color: currentTool === 'note' ? "hsl(var(--primary-foreground))" : "hsl(var(--foreground))",
              }}
              onMouseEnter={(e) => {
                if (currentTool !== 'note') {
                  e.currentTarget.style.backgroundColor = "hsl(var(--accent))";
                  e.currentTarget.style.color = "hsl(var(--accent-foreground))";
                }
              }}
              onMouseLeave={(e) => {
                if (currentTool !== 'note') {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "hsl(var(--foreground))";
                }
              }}
            >
              <StickyNoteIcon className="w-5 h-5" />
            </button>
            <button 
              className="p-2 rounded"
              onClick={handleImageButtonClick}
              title="Insert Image"
              style={{
                backgroundColor: "transparent",
                color: "hsl(var(--foreground))",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "hsl(var(--accent))";
                e.currentTarget.style.color = "hsl(var(--accent-foreground))";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "hsl(var(--foreground))";
              }}
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
          <div className="flex items-center gap-2 border-r-2 border-border pr-4">
            {/* Line and Arrow Tools */}
            <button 
              className="p-2 rounded"
              onClick={() => handleToolChange('line')}
              title="Line"
              style={{
                backgroundColor: currentTool === 'line' ? "hsl(var(--primary))" : "transparent",
                color: currentTool === 'line' ? "hsl(var(--primary-foreground))" : "hsl(var(--foreground))",
              }}
              onMouseEnter={(e) => {
                if (currentTool !== 'line') {
                  e.currentTarget.style.backgroundColor = "hsl(var(--accent))";
                  e.currentTarget.style.color = "hsl(var(--accent-foreground))";
                }
              }}
              onMouseLeave={(e) => {
                if (currentTool !== 'line') {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "hsl(var(--foreground))";
                }
              }}
            >
              <Minus className="w-5 h-5" />
            </button>
            <button 
              className="p-2 rounded"
              onClick={() => handleToolChange('arrow')}
              title="Arrow"
              style={{
                backgroundColor: currentTool === 'arrow' ? "hsl(var(--primary))" : "transparent",
                color: currentTool === 'arrow' ? "hsl(var(--primary-foreground))" : "hsl(var(--foreground))",
              }}
              onMouseEnter={(e) => {
                if (currentTool !== 'arrow') {
                  e.currentTarget.style.backgroundColor = "hsl(var(--accent))";
                  e.currentTarget.style.color = "hsl(var(--accent-foreground))";
                }
              }}
              onMouseLeave={(e) => {
                if (currentTool !== 'arrow') {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "hsl(var(--foreground))";
                }
              }}
            >
              <ArrowRightIcon className="w-5 h-5" />
            </button>

            {/* Rectangle and Circle Tools */}
            <button 
              className="p-2 rounded"
              onClick={() => handleGeoShapeChange('rectangle')}
              title="Rectangle"
              style={{
                backgroundColor: currentTool === 'geo-rectangle' ? "hsl(var(--primary))" : "transparent",
                color: currentTool === 'geo-rectangle' ? "hsl(var(--primary-foreground))" : "hsl(var(--foreground))",
              }}
              onMouseEnter={(e) => {
                if (currentTool !== 'geo-rectangle') {
                  e.currentTarget.style.backgroundColor = "hsl(var(--accent))";
                  e.currentTarget.style.color = "hsl(var(--accent-foreground))";
                }
              }}
              onMouseLeave={(e) => {
                if (currentTool !== 'geo-rectangle') {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "hsl(var(--foreground))";
                }
              }}
            >
              <SquareIcon className="w-5 h-5" />
            </button>
            <button 
              className="p-2 rounded"
              onClick={() => handleGeoShapeChange('ellipse')}
              title="Circle"
              style={{
                backgroundColor: currentTool === 'geo-ellipse' ? "hsl(var(--primary))" : "transparent",
                color: currentTool === 'geo-ellipse' ? "hsl(var(--primary-foreground))" : "hsl(var(--foreground))",
              }}
              onMouseEnter={(e) => {
                if (currentTool !== 'geo-ellipse') {
                  e.currentTarget.style.backgroundColor = "hsl(var(--accent))";
                  e.currentTarget.style.color = "hsl(var(--accent-foreground))";
                }
              }}
              onMouseLeave={(e) => {
                if (currentTool !== 'geo-ellipse') {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "hsl(var(--foreground))";
                }
              }}
            >
              <CircleIcon className="w-5 h-5" />
            </button>

            {/* Other Shape Tools Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button 
                  className="p-2 rounded"
                  title={GEO_SHAPES.find(s => currentTool === `geo-${s.id}` && !['rectangle', 'ellipse'].includes(s.id))?.label || 'Star'}
                  onClick={() => {
                    const currentShape = GEO_SHAPES.find(s => currentTool === `geo-${s.id}` && !['rectangle', 'ellipse'].includes(s.id)) || GEO_SHAPES[2];
                    handleGeoShapeChange(currentShape.id);
                  }}
                  style={{
                    backgroundColor: currentTool.startsWith('geo-') && !['geo-rectangle', 'geo-ellipse'].includes(currentTool) ? "hsl(var(--primary))" : "transparent",
                    color: currentTool.startsWith('geo-') && !['geo-rectangle', 'geo-ellipse'].includes(currentTool) ? "hsl(var(--primary-foreground))" : "hsl(var(--foreground))",
                  }}
                  onMouseEnter={(e) => {
                    if (!currentTool.startsWith('geo-') || ['geo-rectangle', 'geo-ellipse'].includes(currentTool)) {
                      e.currentTarget.style.backgroundColor = "hsl(var(--accent))";
                      e.currentTarget.style.color = "hsl(var(--accent-foreground))";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!currentTool.startsWith('geo-') || ['geo-rectangle', 'geo-ellipse'].includes(currentTool)) {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "hsl(var(--foreground))";
                    }
                  }}
                >
                  {(() => {
                    const currentShape = GEO_SHAPES.find(s => currentTool === `geo-${s.id}` && !['rectangle', 'ellipse'].includes(s.id)) || GEO_SHAPES[2];
                    const Icon = currentShape.icon;
                    return <Icon className="w-5 h-5" />;
                  })()}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-popover border-border">
                {GEO_SHAPES.filter(shape => !['rectangle', 'ellipse'].includes(shape.id)).map((shape) => {
                  const Icon = shape.icon;
                  return (
                    <DropdownMenuItem
                      key={shape.id}
                      className="text-popover-foreground hover:bg-accent cursor-pointer flex items-center gap-2"
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
          <div className="flex items-center gap-2 border-r-2 border-border pr-4">
            <button 
              className="p-2 rounded"
              onClick={() => handleToolChange('laser')}
              title="Laser Pointer"
              style={{
                backgroundColor: currentTool === 'laser' ? "hsl(var(--primary))" : "transparent",
                color: currentTool === 'laser' ? "hsl(var(--primary-foreground))" : "hsl(var(--foreground))",
              }}
              onMouseEnter={(e) => {
                if (currentTool !== 'laser') {
                  e.currentTarget.style.backgroundColor = "hsl(var(--accent))";
                  e.currentTarget.style.color = "hsl(var(--accent-foreground))";
                }
              }}
              onMouseLeave={(e) => {
                if (currentTool !== 'laser') {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "hsl(var(--foreground))";
                }
              }}
            >
              <TargetIcon className="w-5 h-5" />
            </button>
            <button 
              className="p-2 rounded"
              onClick={() => handleToolChange('frame')}
              title="Frame"
              style={{
                backgroundColor: currentTool === 'frame' ? "hsl(var(--primary))" : "transparent",
                color: currentTool === 'frame' ? "hsl(var(--primary-foreground))" : "hsl(var(--foreground))",
              }}
              onMouseEnter={(e) => {
                if (currentTool !== 'frame') {
                  e.currentTarget.style.backgroundColor = "hsl(var(--accent))";
                  e.currentTarget.style.color = "hsl(var(--accent-foreground))";
                }
              }}
              onMouseLeave={(e) => {
                if (currentTool !== 'frame') {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "hsl(var(--foreground))";
                }
              }}
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
        <div className="w-64 bg-sidebar border-r border-border hidden lg:block shrink-0">
          {/* Placeholder for thumbnails */}
        </div>

        {/* Main Content with Footer */}
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          {/* Content Container */}
          <div className="flex-1 min-h-0 overflow-auto bg-content">
            {children}
          </div>
          
          {/* Bottom Bar */}
          <div className="h-8 border-t border-border flex items-center justify-between px-4 bg-statusbar shrink-0">
            {/* Left side - View Controls */}
            <div className="flex items-center gap-2">
              <button 
                className="p-1 hover:bg-accent rounded group" 
                title="Split Vertically"
              >
                <SplitSquareVerticalIcon className="w-4 h-4 stroke-[1.25] group-hover:stroke-[1.5] active:stroke-[1.75]" />
              </button>
              <button 
                className="p-1 hover:bg-accent rounded group" 
                title="Split Horizontally"
              >
                <SplitSquareHorizontalIcon className="w-4 h-4 stroke-[1.25] group-hover:stroke-[1.5] active:stroke-[1.75]" />
              </button>
              <button 
                className="p-1 hover:bg-accent rounded group" 
                title="Fit to Page"
                onClick={handleZoomToFit}
              >
                <MaximizeIcon className="w-4 h-4 stroke-[1.25] group-hover:stroke-[1.5] active:stroke-[1.75]" />
              </button>
            </div>

            {/* Center - Navigation */}
            <div className="flex items-center gap-2">
              <button className="p-1 hover:bg-accent rounded group" title="First Page">
                <ChevronsLeftIcon className="w-4 h-4 stroke-[1.25] group-hover:stroke-[1.5] active:stroke-[1.75]" />
              </button>
              <button className="p-1 hover:bg-accent rounded group" title="Previous Page">
                <ChevronLeftIcon className="w-4 h-4 stroke-[1.25] group-hover:stroke-[1.5] active:stroke-[1.75]" />
              </button>
              <div className="group relative flex items-center">
                <div 
                  className="flex items-center rounded px-2 py-0.5 w-[6rem] justify-center"
                  style={{
                    backgroundColor: isEditingPage ? "hsl(var(--accent))" : "hsla(var(--accent) / 0.1)",
                    color: isEditingPage ? "hsl(var(--accent-foreground))" : "hsl(var(--foreground))",
                  }}
                  onMouseEnter={(e) => {
                    if (!isEditingPage) {
                      e.currentTarget.style.backgroundColor = "hsl(var(--accent))";
                      e.currentTarget.style.color = "hsl(var(--accent-foreground))";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isEditingPage) {
                      e.currentTarget.style.backgroundColor = "hsla(var(--accent) / 0.1)";
                      e.currentTarget.style.color = "hsl(var(--foreground))";
                    }
                  }}
                >
                  <input
                    ref={pageInputRef}
                    type="text"
                    className="w-full text-center bg-transparent outline-none"
                    value={`${currentPage} of ${totalPages}`}
                    onChange={handlePageInputChange}
                    onFocus={() => setIsEditingPage(true)}
                    onBlur={handlePageInputBlur}
                  />
                </div>
              </div>
              <button className="p-1 hover:bg-accent rounded group" title="Next Page">
                <ChevronRightIcon className="w-4 h-4 stroke-[1.25] group-hover:stroke-[1.5] active:stroke-[1.75]" />
              </button>
              <button className="p-1 hover:bg-accent rounded group" title="Last Page">
                <ChevronsRightIcon className="w-4 h-4 stroke-[1.25] group-hover:stroke-[1.5] active:stroke-[1.75]" />
              </button>
            </div>

            {/* Right side - Scale and Size */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">1 in : 20 ft</span>
              <button 
                className="p-1 hover:bg-accent rounded group" 
                title="Zoom Out"
                onClick={handleZoomOut}
              >
                <MinusIcon className="w-4 h-4 stroke-[1.25] group-hover:stroke-[1.5] active:stroke-[1.75]" />
              </button>
              <div className="group relative flex items-center">
                <div 
                  className="flex items-center rounded px-2 py-0.5 w-[6rem] justify-center"
                  style={{
                    backgroundColor: isEditingZoom ? "hsl(var(--accent))" : "hsla(var(--accent) / 0.1)",
                    color: isEditingZoom ? "hsl(var(--accent-foreground))" : "hsl(var(--foreground))",
                  }}
                  onMouseEnter={(e) => {
                    if (!isEditingZoom) {
                      e.currentTarget.style.backgroundColor = "hsl(var(--accent))";
                      e.currentTarget.style.color = "hsl(var(--accent-foreground))";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isEditingZoom) {
                      e.currentTarget.style.backgroundColor = "hsla(var(--accent) / 0.1)";
                      e.currentTarget.style.color = "hsl(var(--foreground))";
                    }
                  }}
                >
                  <input
                    type="text"
                    className="w-12 text-center bg-transparent outline-none"
                    value={isEditingZoom ? tempZoomValue : Math.round(zoomLevel)}
                    onChange={handleZoomInputChange}
                    onFocus={() => {
                      setIsEditingZoom(true);
                      setTempZoomValue(Math.round(zoomLevel).toString());
                    }}
                    onBlur={handleZoomInputBlur}
                  />
                  <span className="text-sm">%</span>
                </div>
              </div>
              <button 
                className="p-1 hover:bg-accent rounded group" 
                title="Zoom In"
                onClick={handleZoomIn}
              >
                <PlusIcon className="w-4 h-4 stroke-[1.25] group-hover:stroke-[1.5] active:stroke-[1.75]" />
              </button>
              <span className="text-sm text-muted-foreground">24" x 36"</span>
            </div>
          </div>
        </div>

        {/* Right Toolbar */}
        <div className="w-12 bg-sidebar border-l border-border hidden lg:block shrink-0">
          <div className="flex flex-col h-full">
            <div className="flex flex-col items-center gap-1 p-1">
              <button 
                className="p-1 rounded" 
                title="Settings"
                style={{
                  backgroundColor: "transparent",
                  color: "hsl(var(--foreground))",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "hsl(var(--accent))";
                  e.currentTarget.style.color = "hsl(var(--accent-foreground))";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "hsl(var(--foreground))";
                }}
              >
                <SettingsIcon className="w-5 h-5" />
              </button>
              <button 
                className="p-1 rounded" 
                title="Ruler"
                style={{
                  backgroundColor: "transparent",
                  color: "hsl(var(--foreground))",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "hsl(var(--accent))";
                  e.currentTarget.style.color = "hsl(var(--accent-foreground))";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "hsl(var(--foreground))";
                }}
              >
                <RulerIcon className="w-5 h-5" />
              </button>
              <button 
                className="p-1 rounded" 
                title="Location"
                style={{
                  backgroundColor: "transparent",
                  color: "hsl(var(--foreground))",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "hsl(var(--accent))";
                  e.currentTarget.style.color = "hsl(var(--accent-foreground))";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "hsl(var(--foreground))";
                }}
              >
                <FileTextIcon className="w-5 h-5" />
              </button>
              <button 
                className="p-1 rounded" 
                title="Layout"
                style={{
                  backgroundColor: "transparent",
                  color: "hsl(var(--foreground))",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "hsl(var(--accent))";
                  e.currentTarget.style.color = "hsl(var(--accent-foreground))";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "hsl(var(--foreground))";
                }}
              >
                <LayoutGridIcon className="w-5 h-5" />
              </button>
              <button 
                className="p-1 rounded" 
                title="Search"
                style={{
                  backgroundColor: "transparent",
                  color: "hsl(var(--foreground))",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "hsl(var(--accent))";
                  e.currentTarget.style.color = "hsl(var(--accent-foreground))";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "hsl(var(--foreground))";
                }}
              >
                <SearchIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1"></div>
            <div className="flex flex-col items-center gap-1 p-1 border-t border-border">
              <button 
                className="p-1 opacity-40" 
                title="AI Assistant (Inactive)"
                style={{
                  backgroundColor: "transparent",
                  color: "hsl(var(--foreground))",
                }}
              >
                <SparklesIcon className="w-5 h-5" />
              </button>
              <button 
                className="p-1 opacity-40" 
                title="Support (Inactive)"
                style={{
                  backgroundColor: "transparent",
                  color: "hsl(var(--foreground))",
                }}
              >
                <HelpCircleIcon className="w-5 h-5" />
              </button>
              <button 
                className="p-1 opacity-40" 
                title="Messages (Inactive)"
                style={{
                  backgroundColor: "transparent",
                  color: "hsl(var(--foreground))",
                }}
              >
                <MessageSquareIcon className="w-5 h-5" />
              </button>
              <button 
                className="p-1 opacity-40" 
                title="Debugger (Inactive)"
                style={{
                  backgroundColor: "transparent",
                  color: "hsl(var(--foreground))",
                }}
              >
                <BugIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <SettingsDialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen} />
    </div>
  );
} 