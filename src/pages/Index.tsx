import { useState } from "react";
import { ModelViewer } from "@/components/ModelViewer";
import { FileUpload } from "@/components/FileUpload";
import { ViewerControls } from "@/components/ViewerControls";
import { ModelInfo } from "@/components/ModelInfo";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface LoadedModel {
  url: string;
  file: File;
}

const Index = () => {
  const [loadedModel, setLoadedModel] = useState<LoadedModel | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [wireframe, setWireframe] = useState(false);
  const [environmentPreset, setEnvironmentPreset] = useState<any>("sunset");

  const handleFileUpload = async (file: File) => {
    setIsLoading(true);
    try {
      // Create URL for the uploaded file
      const url = URL.createObjectURL(file);
      setLoadedModel({ url, file });
      toast.success("Model loaded successfully!");
    } catch (error) {
      toast.error("Failed to load model");
      console.error("Error loading model:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearModel = () => {
    if (loadedModel) {
      URL.revokeObjectURL(loadedModel.url);
      setLoadedModel(null);
      toast("Model cleared");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-toolbar-bg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                3D Model Viewer
              </h1>
              <p className="text-sm text-muted-foreground">
                Upload and view .glb/.gltf 3D models with interactive controls
              </p>
            </div>
            
            {loadedModel && (
              <Button
                variant="outline"
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = loadedModel.url;
                  link.download = loadedModel.file.name;
                  link.click();
                }}
              >
                Download Model
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-12rem)]">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6 overflow-y-auto">
            {/* File Upload */}
            {!loadedModel && (
              <FileUpload
                onFileUpload={handleFileUpload}
                isLoading={isLoading}
              />
            )}
            
            {/* Model Info */}
            {loadedModel && (
              <ModelInfo
                fileName={loadedModel.file.name}
                fileSize={loadedModel.file.size}
              />
            )}
            
            {/* Viewer Controls */}
            <ViewerControls
              wireframe={wireframe}
              onWireframeToggle={setWireframe}
              environmentPreset={environmentPreset}
              onEnvironmentChange={setEnvironmentPreset}
              onClearModel={handleClearModel}
              hasModel={!!loadedModel}
            />
          </div>

          {/* 3D Viewer */}
          <div className="lg:col-span-3">
            <ModelViewer
              modelUrl={loadedModel?.url || null}
              wireframe={wireframe}
              environmentPreset={environmentPreset}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-toolbar-bg mt-auto">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div>
              Built with React Three Fiber & Three.js
            </div>
            <div className="flex space-x-4">
              <span>Supports .glb & .gltf formats</span>
              <span>•</span>
              <span>WebGL accelerated</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;