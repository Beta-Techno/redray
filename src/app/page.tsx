'use client';

import { useState } from 'react';
import 'tldraw/tldraw.css';
import { PdfEditor } from '@/components/pdf-editor/PdfEditor';
import { Pdf, PdfPicker } from '@/components/pdf-editor/PdfPicker';
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

  switch (state.phase) {
    case 'pick':
      return (
        <div className="PdfEditor">
          <PdfPicker onOpenPdf={(pdf) => setState({ phase: 'edit', pdf })} />
        </div>
      );
    case 'edit':
      return (
        <div className="PdfEditor">
          <PdfEditor pdf={state.pdf} />
        </div>
      );
  }
}
