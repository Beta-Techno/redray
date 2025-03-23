'use client';

import { Editor } from '@tldraw/tldraw';
import { createContext, useContext, ReactNode, useState } from 'react';

interface EditorContextType {
  editor: Editor | null;
  setEditor: (editor: Editor) => void;
}

const EditorContext = createContext<EditorContextType>({
  editor: null,
  setEditor: () => {},
});

export function EditorProvider({ children }: { children: ReactNode }) {
  const [editor, setEditorState] = useState<Editor | null>(null);

  const setEditor = (newEditor: Editor) => {
    setEditorState(newEditor);
  };

  return (
    <EditorContext.Provider value={{ editor, setEditor }}>
      {children}
    </EditorContext.Provider>
  );
}

export function useEditorContext() {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditorContext must be used within an EditorProvider');
  }
  return context;
} 