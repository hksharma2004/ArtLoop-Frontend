import React from 'react';
import { Label } from '@/components/ui/label';

interface CanvasAreaProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  startDrawing: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  draw: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  stopDrawing: () => void;
}

const CanvasArea: React.FC<CanvasAreaProps> = ({ canvasRef, startDrawing, draw, stopDrawing }) => {
  return (
    <main className="flex-grow h-full flex flex-col items-center justify-center">
      <Label className="mb-2 text-sm font-display tracking-widest text-gray-400">CANVAS</Label>
      <div className="relative w-full h-full max-w-5xl rounded-lg shadow-2xl">
        <canvas
          ref={canvasRef}
          width={1280}
          height={720}
          className="w-full h-full rounded-lg cursor-crosshair bg-white"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        />
      </div>
    </main>
  );
};

export default CanvasArea;