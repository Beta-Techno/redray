import { AssetRecordType, Box, createShapeId } from '@tldraw/tldraw';
import { Pdf, PdfPage } from '@/components/pdf-editor/PdfPicker';

export async function loadPdf(name: string, source: ArrayBuffer): Promise<Pdf> {
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