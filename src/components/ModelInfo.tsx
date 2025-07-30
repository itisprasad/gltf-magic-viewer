import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ModelInfoProps {
  fileName: string | null;
  fileSize: number | null;
}

export const ModelInfo = ({ fileName, fileSize }: ModelInfoProps) => {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (!fileName) {
    return null;
  }

  return (
    <Card className="p-4">
      <h3 className="text-sm font-semibold mb-3">Model Information</h3>
      
      <div className="space-y-3">
        <div>
          <label className="text-xs text-muted-foreground block mb-1">
            File Name
          </label>
          <p className="text-sm font-mono break-all">{fileName}</p>
        </div>
        
        {fileSize && (
          <div>
            <label className="text-xs text-muted-foreground block mb-1">
              File Size
            </label>
            <Badge variant="secondary">{formatFileSize(fileSize)}</Badge>
          </div>
        )}
        
        <div>
          <label className="text-xs text-muted-foreground block mb-1">
            Format
          </label>
          <Badge variant="outline">
            {fileName.toLowerCase().endsWith('.glb') ? 'GLB' : 'GLTF'}
          </Badge>
        </div>
      </div>
    </Card>
  );
};