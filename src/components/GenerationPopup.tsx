import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RefreshCw, Sparkles, X, Download } from 'lucide-react'; 


const StylePresetCard = ({ title, onClick, isActive }) => (
  <div
    onClick={onClick}

    className={`p-4 border rounded-xl cursor-pointer transition-all duration-200 flex items-center justify-center text-center h-18 ${isActive ? 'bg-white/20 border-white/40 ring-2 ring-white' : 'bg-zinc-800/50 border-zinc-700 hover:bg-zinc-700/60 hover:border-zinc-500'}`}
  >
    <span className="text-sm font-medium text-white">{title}</span>
  </div>
);


interface StylePreset {
  id: string;
  label: string;

  icon?: React.ComponentType<{ className?: string }>;
}

interface GenerationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  prompt: string;
  setPrompt: (value: string) => void;
  selectedStyle: string;
  setSelectedStyle: (value: string) => void;
  stylePresets: StylePreset[]; 
  generateImage: () => void;
  isGenerating: boolean;
  credits: number;
  generatedImage: string | null;
}

export const GenerationPopup: React.FC<GenerationPopupProps> = ({
  isOpen, onClose, prompt, setPrompt, selectedStyle, setSelectedStyle, stylePresets,
  generateImage, isGenerating, credits, generatedImage
}) => {
  const handleDownload = async () => {
    if (!generatedImage) return;

    try {
      const response = await fetch(generatedImage);
      const blob = await response.blob();
      
      const blobUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `generated-artwork-${Date.now()}.png`;
      link.style.display = 'none';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.log('Fetch method failed, trying canvas method...');
      
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          canvas.width = img.naturalWidth || img.width;
          canvas.height = img.naturalHeight || img.height;
          
          ctx.drawImage(img, 0, 0);
          
          canvas.toBlob((blob) => {
            if (blob) {
              const blobUrl = window.URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = blobUrl;
              link.download = `generated-artwork-${Date.now()}.png`;
              link.style.display = 'none';
              
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              
              window.URL.revokeObjectURL(blobUrl);
            }
          }, 'image/png');
        } catch (canvasError) {
          console.error('Canvas method also failed:', canvasError);
          window.open(generatedImage, '_blank');
          alert('Download failed. The image has opened in a new tab. Please right-click and select "Save image as..." to download.');
        }
      };
      
      img.onerror = () => {
        console.error('Image loading failed');
        window.open(generatedImage, '_blank');
        alert('Download failed. The image has opened in a new tab. Please right-click and select "Save image as..." to download.');
      };
      
      img.src = generatedImage;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-800 border border-zinc-700 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <header className="flex justify-between items-center p-6 border-b border-zinc-800 flex-shrink-0">
          <h2 className="text-2xl font-serif font-semibold text-white">Prompt & Generate</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition-all">
            <X className="w-6 h-6" />
          </Button>
        </header>

        <div className="p-6 overflow-y-auto flex-grow">
          {isGenerating ? (
            <div className="flex flex-col items-center justify-center gap-4 py-8 h-full">
              <RefreshCw className="w-12 h-12 animate-spin text-white" />
              <p className="text-sm text-zinc-400 text-center mt-2">The final image may not always reflect every detail perfectly.</p>
            </div>
          ) : generatedImage ? (
            <div className="flex flex-col items-center gap-4">
              <div className="relative w-full p-4 bg-zinc-950/50 rounded-lg">
                <img src={generatedImage} alt="Generated artwork" className="w-full h-full object-contain rounded-md" />
              </div>
            </div>
          ) : (
            <div className="space-y-6 text-white">
              <div>
                <Label className="text-lg font-medium mb-2 block">Describe your vision...</Label>
                <Textarea
                  placeholder="e.g., A majestic lion in a neon-drenched jungle"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={3}
                  className="w-full bg-zinc-900/60 border border-zinc-700 text-white placeholder-zinc-500 rounded-xl shadow-inner focus:ring-2 focus:ring-white/20 focus:outline-none transition-all"
                />
              </div>
              <div>
                <Label className="text-lg font-medium mb-3 block">Style Presets</Label>

                <div className="grid grid-cols-3 gap-3">
                  {stylePresets.map((style) => (
                    <StylePresetCard
                      key={style.id}

                      title={style.label}
                      onClick={() => setSelectedStyle(style.id)}
                      isActive={selectedStyle === style.id}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <footer className="p-4 border-t border-zinc-800 bg-black/50 flex-shrink-0">
          {generatedImage && !isGenerating ? (
            <Button onClick={handleDownload} className="w-full text-lg font-medium py-4 rounded-xl bg-gradient-to-tr from-white to-zinc-100 text-black hover:from-zinc-100 hover:to-white hover:brightness-110 transition-all duration-300 flex items-center justify-center gap-2" size="lg">
              <Download className="w-5 h-5" />
              Download Image
            </Button>
          ) : (
            <Button onClick={generateImage} disabled={isGenerating || credits <= 0} className="w-full text-lg font-medium py-4 rounded-xl bg-gradient-to-tr from-white to-zinc-100 text-black hover:from-zinc-100 hover:to-white hover:brightness-110 disabled:opacity-50 transition-all duration-300 flex items-center justify-center gap-2" size="lg">
              {isGenerating ? (
                <><RefreshCw className="w-6 h-6 mr-3 animate-spin" />Hold on let us cook...</>
              ) : (
                <><Sparkles className="w-5 h-5 mr-3" />Generate Image ({credits} Credits)</>
              )}
            </Button>
          )}
        </footer>
      </div>
    </div>
  );
};