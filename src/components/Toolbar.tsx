import React from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Brush, Pencil, Eraser, Trash2, Undo } from 'lucide-react';

interface ToolbarProps {
  currentTool: string;
  setCurrentTool: (tool: string) => void;
  brushColor: string;
  setBrushColor: (color: string) => void;
  brushSize: number;
  setBrushSize: (size: number) => void;
  clearCanvas: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  currentTool,
  setCurrentTool,
  brushColor,
  setBrushColor,
  brushSize,
  setBrushSize,
  clearCanvas,
}) => {
  const tools = [
    { name: 'brush', icon: Brush },
    { name: 'pencil', icon: Pencil },
    { name: 'eraser', icon: Eraser },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full flex-shrink-0">
      <div className="flex flex-col items-center space-y-2 p-2 bg-black border border-gray-800 rounded-xl">
        {tools.map((tool) => (
          <Button
            key={tool.name}
            variant="outline"
            onClick={() => setCurrentTool(tool.name)}
            className={`p-3 bg-gray-800 text-gray-100 border border-gray-600 transition-all duration-200 ease-in-out ${
              currentTool === tool.name ? 'ring-2 ring-white scale-105' : 'hover:ring-1 hover:ring-gray-500'
            }`}
          >
            <tool.icon />
          </Button>
        ))}
        <div className="h-px w-8 bg-gray-700 my-2"></div>
        <div className="relative p-3 bg-gray-800 rounded-md border border-gray-600">
          <img src="src/assets/color-palette.png" className="w-6 h-6 pointer-events-none" alt="Color Palette" />
          <input
            type="color"
            value={brushColor}
            onChange={(e) => setBrushColor(e.target.value)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
        <div className="flex flex-col items-center space-y-2 text-gray-300 py-2">
          <Slider
            orientation="vertical"
            value={[brushSize]}
            onValueChange={(val) => setBrushSize(val[0])}
            max={50}
            min={1}
            step={1}
            className="h-32 w-6 relative flex items-center justify-center
              [&>span:first-child]:w-1 
              [&>span:first-child]:h-full 
              [&>span:first-child]:bg-white
              [&>span:first-child]:rounded-full 
              [&>span:last-child]:h-6 
              [&>span:last-child]:w-6 
              [&>span:last-child]:bg-white 
              [&>span:last-child]:rounded-full 
              [&>span:last-child]:border-2 
              [&>span:last-child]:border-white 
              [&>span:last-child]:shadow-md 
              [&>span:last-child]:transition 
              [&>span:last-child]:duration-200 
              [&>span:last-child]:hover:scale-110"
          />
          <span className="text-sm w-6 text-center">{brushSize}</span>
        </div>
        <div className="h-px w-8 bg-gray-700 my-2"></div>
        <Button
          variant="outline"
          onClick={clearCanvas}
          className="p-3 bg-gray-800 text-gray-100 border border-gray-600 transition-all duration-200 ease-in-out hover:ring-1 hover:ring-gray-500"
        >
          <Trash2 />
        </Button>
        <Button
          variant="outline"
          className="p-3 bg-gray-800 text-gray-100 border border-gray-600 transition-all duration-200 ease-in-out hover:ring-1 hover:ring-gray-500"
        >
          <Undo />
        </Button>
      </div>
      <Label className="mt-2 text-xs font-mono tracking-widest text-gray-400">TOOLS</Label>
    </div>
  );
};

export default Toolbar;
