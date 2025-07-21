import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateImageAPI } from '@/services/api';

import Header from '@/components/HeaderWorkspace';
import Toolbar from '@/components/Toolbar';
import CanvasArea from '@/components/CanvasArea';
import { GenerationPopup } from '@/components/GenerationPopup';
import { Button } from '@/components/ui/button';

import { Zap, Sparkles, Paintbrush, Palette, Pencil, Wand2 } from 'lucide-react';

interface WorkspaceProps {
  user: { name: string; prefs: { remainingGenerations?: number } } | null;
  onSignOut?: () => void;
}

const qualityPresets = {
  fast: { steps: 15, guidance: 6.0 },
  standard: { steps: 25, guidance: 7.5 },
  high: { steps: 40, guidance: 9.0 },
};

const Workspace: React.FC<WorkspaceProps> = ({ user, onSignOut }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushSize, setBrushSize] = useState(5);
  const [currentTool, setCurrentTool] = useState('brush');
  const [brushColor, setBrushColor] = useState('#000000');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('realistic');
  const [quality, setQuality] = useState('standard');
  const [steps, setSteps] = useState(qualityPresets.standard.steps);
  const [guidance, setGuidance] = useState(qualityPresets.standard.guidance);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [credits, setCredits] = useState(user?.prefs?.remainingGenerations ?? 0);
  const navigate = useNavigate();

  const stylePresets = [
    { id: 'realistic', label: 'Realistic', icon: Zap },
    { id: 'anime', label: 'Anime', icon: Sparkles },
    { id: 'cartoon', label: 'Cartoon', icon: Paintbrush },
    { id: 'oil-paint', label: 'Oil Paint', icon: Palette },
    { id: 'sketch', label: 'Sketch', icon: Pencil },
    { id: 'cyberpunk', label: 'Cyberpunk', icon: Wand2 },
  ];

  useEffect(() => {
    const newSettings = qualityPresets[quality as keyof typeof qualityPresets];
    if (newSettings) {
      setSteps(newSettings.steps);
      setGuidance(newSettings.guidance);
    }
  }, [quality]);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    setCredits(user?.prefs?.remainingGenerations ?? 0);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, [user, navigate]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  };

  const resetGenerationState = () => {
    setGeneratedImage(null);
    setPrompt('');
    clearCanvas();
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    if (generatedImage) {
      resetGenerationState();
    }
  };

  const getScaledCoordinates = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { x, y } = getScaledCoordinates(e);
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      setIsDrawing(true);
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const { x, y } = getScaledCoordinates(e);
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.globalCompositeOperation = currentTool === 'eraser' ? 'destination-out' : 'source-over';
      ctx.strokeStyle = currentTool === 'eraser' ? 'rgba(0,0,0,1)' : brushColor;
      ctx.lineWidth = brushSize;
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) ctx.closePath();
    setIsDrawing(false);
  };

  const getCanvasDataURL = () => canvasRef.current?.toDataURL('image/png') || '';

  const generateImage = async () => {
    if (!prompt.trim()) {
      alert('Please enter a prompt!');
      return;
    }
    if (credits <= 0) {
      alert('You have no more generation credits. Thank you for using ArtLoop!');
      return;
    }

    setIsGenerating(true);
    setGeneratedImage(null);
    try {
      const sketchData = getCanvasDataURL();
      const payload = { sketch_data: sketchData, prompt, style_preset: selectedStyle, quality, steps, guidance };
      const response = await generateImageAPI(payload);
      if (response && response.image) {
        setGeneratedImage(response.image);
        setCredits(response.remainingGenerations);
      } else {
        throw new Error('Invalid response from server.');
      }
    } catch (error: unknown) {
      console.error('Generation failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      alert(`Generation failed: ${errorMessage}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = 'generated-artwork.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const stepsValue = useMemo(() => [steps], [steps]);
  const guidanceValue = useMemo(() => [guidance], [guidance]);

  return (
    <div className="h-screen bg-black text-white flex flex-col p-4 overflow-hidden">
      <Header credits={credits} user={user} onSignOut={onSignOut} />

      <div className="flex-grow flex flex-row items-center justify-center w-full relative py-2 gap-4">
        <Toolbar
          currentTool={currentTool}
          setCurrentTool={setCurrentTool}
          brushColor={brushColor}
          setBrushColor={setBrushColor}
          brushSize={brushSize}
          setBrushSize={setBrushSize}
          clearCanvas={clearCanvas}
        />
        <CanvasArea
          canvasRef={canvasRef}
          startDrawing={startDrawing}
          draw={draw}
          stopDrawing={stopDrawing}
        />
      </div>

      <div className="absolute bottom-8 right-8 z-20">
        <Button size="lg" onClick={() => setIsPopupOpen(true)} className="px-8 py-6 font-serif bg-white text-black rounded-xl text-xl font-bold hover:bg-gray-300 transition-all duration-200 shadow-lg">
          Prompt & generate
        </Button>
      </div>

      <GenerationPopup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        prompt={prompt}
        setPrompt={setPrompt}
        selectedStyle={selectedStyle}
        setSelectedStyle={setSelectedStyle}
        stylePresets={stylePresets}
        quality={quality}
        setQuality={setQuality}
        steps={stepsValue}
        setSteps={(value) => setSteps(value[0])}
        guidance={guidanceValue}
        setGuidance={(value) => setGuidance(value[0])}
        generateImage={generateImage}
        isGenerating={isGenerating}
        credits={credits}
        generatedImage={generatedImage}
        handleDownload={handleDownload}
      />
    </div>
  );
};

export default Workspace;