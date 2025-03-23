'use client';

import { useState } from 'react';
import 'tldraw/tldraw.css';
import { PdfEditor } from '@/components/pdf-editor/PdfEditor';
import { Pdf, PdfPicker } from '@/components/pdf-editor/PdfPicker';
import { BluebeamShell } from '@/components/layout/BluebeamShell';
import { EditorProvider } from '@/components/editor/EditorContext';
import '@/components/pdf-editor/pdf-editor.css';

type State =
  | {
      phase: 'pick';
    }
  | {
      phase: 'edit';
      pdf: Pdf;
    };

export default function Home() {
  const [state, setState] = useState<State>({ phase: 'pick' });

  return (
    <EditorProvider>
      <BluebeamShell onOpenPdf={(pdf) => setState({ phase: 'edit', pdf })}>
        {state.phase === 'pick' ? (
          <div className="PdfEditor">
            <PdfPicker onOpenPdf={(pdf) => setState({ phase: 'edit', pdf })} />
          </div>
        ) : (
          <div className="PdfEditor">
            <PdfEditor pdf={state.pdf} />
          </div>
        )}
      </BluebeamShell>
    </EditorProvider>
  );
}
