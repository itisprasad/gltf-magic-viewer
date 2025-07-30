import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

interface ViewerControlsProps {
  wireframe: boolean;
  onWireframeToggle: (enabled: boolean) => void;
  environmentPreset: string;
  onEnvironmentChange: (preset: string) => void;
  onClearModel: () => void;
  hasModel: boolean;
}

const environments = [
  { value: "sunset", label: "Sunset" },
  { value: "dawn", label: "Dawn" },
  { value: "night", label: "Night" },
  { value: "warehouse", label: "Warehouse" },
  { value: "forest", label: "Forest" },
  { value: "apartment", label: "Apartment" },
  { value: "studio", label: "Studio" },
  { value: "city", label: "City" },
  { value: "park", label: "Park" },
  { value: "lobby", label: "Lobby" }
];

export const ViewerControls = ({
  wireframe,
  onWireframeToggle,
  environmentPreset,
  onEnvironmentChange,
  onClearModel,
  hasModel
}: ViewerControlsProps) => {
  return (
    <Card className="p-4 space-y-4">
      <div>
        <h3 className="text-sm font-semibold mb-3">Viewer Controls</h3>
        
        {/* Wireframe Toggle */}
        <div className="flex items-center justify-between">
          <label htmlFor="wireframe" className="text-sm">
            Wireframe Mode
          </label>
          <Switch
            id="wireframe"
            checked={wireframe}
            onCheckedChange={onWireframeToggle}
            disabled={!hasModel}
          />
        </div>
      </div>
      
      <Separator />
      
      {/* Environment */}
      <div>
        <label className="text-sm font-medium mb-2 block">
          Environment
        </label>
        <Select value={environmentPreset} onValueChange={onEnvironmentChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select environment" />
          </SelectTrigger>
          <SelectContent>
            {environments.map((env) => (
              <SelectItem key={env.value} value={env.value}>
                {env.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <Separator />
      
      {/* Actions */}
      <div className="space-y-2">
        <Button
          variant="destructive"
          size="sm"
          onClick={onClearModel}
          disabled={!hasModel}
          className="w-full"
        >
          Clear Model
        </Button>
      </div>
      
      {/* Instructions */}
      <div className="text-xs text-muted-foreground space-y-1">
        <p><strong>Controls:</strong></p>
        <p>• Left click + drag: Rotate</p>
        <p>• Right click + drag: Pan</p>
        <p>• Scroll: Zoom in/out</p>
      </div>
    </Card>
  );
};