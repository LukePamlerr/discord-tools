
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { 
  Upload, 
  Download, 
  Crop, 
  Image as ImageIcon, 
  Maximize2,
  FileType,
  RefreshCcw,
  Info
} from "lucide-react";

interface ImageDimensions {
  width: number;
  height: number;
}

export const ImageTools = () => {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState<ImageDimensions>({ width: 0, height: 0 });
  const [newDimensions, setNewDimensions] = useState<ImageDimensions>({ width: 0, height: 0 });
  const [quality, setQuality] = useState(85);
  const [format, setFormat] = useState<"jpeg" | "png" | "webp">("webp");
  const [processing, setProcessing] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file",
          variant: "destructive",
        });
        return;
      }

      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);

      // Get image dimensions
      const img = new Image();
      img.onload = () => {
        setDimensions({ width: img.width, height: img.height });
        setNewDimensions({ width: img.width, height: img.height });
      };
      img.src = url;
    }
  };

  const calculateAspectRatioFit = useCallback((width: number, height: number, maxWidth: number, maxHeight: number) => {
    const ratio = Math.min(maxWidth / width, maxHeight / height);
    return {
      width: Math.round(width * ratio),
      height: Math.round(height * ratio),
    };
  }, []);

  const handleResize = async () => {
    if (!selectedFile || !previewUrl) return;

    setProcessing(true);
    try {
      // Create canvas for resizing
      const canvas = document.createElement("canvas");
      canvas.width = newDimensions.width;
      canvas.height = newDimensions.height;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        throw new Error("Could not get canvas context");
      }

      // Draw image onto canvas with new dimensions
      const img = new Image();
      img.src = previewUrl;
      await new Promise((resolve) => {
        img.onload = resolve;
      });

      ctx.drawImage(img, 0, 0, newDimensions.width, newDimensions.height);

      // Convert to desired format with quality setting
      const mimeType = `image/${format}`;
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob);
          },
          mimeType,
          quality / 100
        );
      });

      // Create download link
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `optimized.${format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Success",
        description: "Image processed and downloaded successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  const handleDiscordOptimize = () => {
    if (!dimensions.width || !dimensions.height) return;

    const maxWidth = 1920;
    const maxHeight = 1080;
    const maxFileSize = 8 * 1024 * 1024; // 8MB

    const newSize = calculateAspectRatioFit(
      dimensions.width,
      dimensions.height,
      maxWidth,
      maxHeight
    );

    setNewDimensions(newSize);
    setFormat("webp");
    setQuality(85);

    toast({
      title: "Discord Optimization",
      description: "Settings adjusted for optimal Discord compatibility",
    });
  };

  return (
    <div className="container mx-auto space-y-8 py-8">
      <div className="text-center">
        <h1 className="hero-title relative text-4xl font-bold tracking-tight">
          <span className="sparkles">Image Tools</span>
        </h1>
        <p className="mt-2 text-muted-foreground">
          Optimize your images for Discord with advanced tools ✨
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="glass-card space-y-4 p-6">
            <div className="space-y-4">
              <Label className="space-y-2">
                <div className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Upload Image
                </div>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="cursor-pointer"
                />
              </Label>

              {selectedFile && (
                <>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      onClick={handleDiscordOptimize}
                      className="w-full"
                    >
                      <ImageIcon className="mr-2 h-4 w-4" />
                      Optimize for Discord
                    </Button>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="width">Width (px)</Label>
                      <Input
                        id="width"
                        type="number"
                        value={newDimensions.width}
                        onChange={(e) =>
                          setNewDimensions({
                            ...newDimensions,
                            width: parseInt(e.target.value) || 0,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="height">Height (px)</Label>
                      <Input
                        id="height"
                        type="number"
                        value={newDimensions.height}
                        onChange={(e) =>
                          setNewDimensions({
                            ...newDimensions,
                            height: parseInt(e.target.value) || 0,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="format">Format</Label>
                    <select
                      id="format"
                      value={format}
                      onChange={(e) => setFormat(e.target.value as "jpeg" | "png" | "webp")}
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                    >
                      <option value="webp">WebP (recommended)</option>
                      <option value="jpeg">JPEG</option>
                      <option value="png">PNG</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quality">Quality ({quality}%)</Label>
                    <Input
                      id="quality"
                      type="range"
                      min="1"
                      max="100"
                      value={quality}
                      onChange={(e) => setQuality(parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <Button
                    className="w-full bg-gradient-to-r from-blue-400 to-cyan-600 text-white hover:opacity-90"
                    onClick={handleResize}
                    disabled={processing}
                  >
                    {processing ? (
                      <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Download className="mr-2 h-4 w-4" />
                    )}
                    Process & Download
                  </Button>

                  <div className="rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm text-blue-900">
                    <div className="flex items-center gap-2">
                      <Info className="h-4 w-4" />
                      <strong>Original Size:</strong>
                      {dimensions.width} x {dimensions.height}px
                    </div>
                    <div className="mt-1 text-xs text-blue-700">
                      Discord max file size: 8MB (25MB for nitro)
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="sticky top-8 space-y-4">
          <h2 className="text-lg font-semibold">Preview</h2>
          <div className="glass-card aspect-video overflow-hidden p-6">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Preview"
                className="h-full w-full rounded-lg object-contain"
              />
            ) : (
              <div className="flex h-full items-center justify-center rounded-lg border-2 border-dashed">
                <div className="text-center text-muted-foreground">
                  <ImageIcon className="mx-auto h-8 w-8 opacity-50" />
                  <p className="mt-2">Upload an image to preview</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
