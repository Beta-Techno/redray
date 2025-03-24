# Red Ray PDF Editor Implementation Plan

## Overview
Creating a FOSS alternative to Red Ray with focus on construction industry needs.

## UI Implementation Phases

### Phase 1: Basic Layout Structure
- [x] Initial Next.js setup
- [ ] Install and configure shadcn/ui
- [ ] Implement main layout grid
- [ ] Create dark theme matching Red Ray

### Phase 2: Core Components
1. **Top Bar**
   - Application menu (Revu, File, Edit, etc.)
   - Document title & page info
   - Quick access tools

2. **Left Panel**
   - Thumbnails view with tabs
   - Collapsible panel
   - Page preview functionality

3. **Right Toolbar**
   - Vertical tool organization
   - Tool groups
   - Icon-based interface

4. **Bottom Bar**
   - Page navigation
   - Zoom controls
   - Status information
   - Scale display

### Phase 3: Tool Implementation
- Measurement tools
- Markup tools
- Navigation tools
- Selection tools
- Custom tool sets

## Technical Specifications

### Color Scheme
```css
--background-primary: #2B2B2B;    /* Main background */
--background-secondary: #333333;   /* Sidebars */
--text-primary: #FFFFFF;          /* Main text */
--text-secondary: #CCCCCC;        /* Secondary text */
--accent-blue: #0078D4;           /* Selection/accent */
```

### Component Structure
```
src/
├── components/
│   ├── layout/
│   │   ├── TopBar/
│   │   ├── LeftPanel/
│   │   ├── RightToolbar/
│   │   └── BottomBar/
│   ├── tools/
│   │   ├── MeasurementTools/
│   │   ├── MarkupTools/
│   │   └── NavigationTools/
│   └── viewer/
│       └── PdfViewer/
└── styles/
    ├── theme.css
    └── components.css
```

### Dependencies
- shadcn/ui for consistent components
- TailwindCSS for styling
- tldraw for canvas operations
- pdf-lib for PDF manipulation

## Implementation Steps

1. **Setup (Current)**
   - [x] Basic Next.js project
   - [x] PDF viewer integration
   - [ ] shadcn/ui installation
   - [ ] TailwindCSS configuration

2. **Layout Implementation**
   - [ ] Create main grid layout
   - [ ] Implement panel system
   - [ ] Add toolbar structure
   - [ ] Style navigation elements

3. **Tool Integration**
   - [ ] Basic tool selection
   - [ ] Tool state management
   - [ ] Tool UI components
   - [ ] Tool functionality

4. **Styling & Polish**
   - [ ] Implement dark theme
   - [ ] Add hover states
   - [ ] Create transitions
   - [ ] Polish interactions

## Testing Checklist
- [ ] Layout responsiveness
- [ ] Tool functionality
- [ ] PDF rendering performance
- [ ] User interaction patterns
- [ ] Cross-browser compatibility

## Next Steps
1. Install and configure shadcn/ui
2. Create basic layout grid
3. Implement top bar
4. Add left panel structure 