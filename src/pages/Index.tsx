import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { PlusCircle, Copy, Send, Heart, Sparkles } from "lucide-react";
import { EmbedField } from "@/components/EmbedField";
import { EmbedPreview } from "@/components/EmbedPreview";

interface Embed {
  title?: string;
  description?: string;
  color?: string;
  author?: {
    name: string;
    icon_url?: string;
  };
  thumbnail?: {
    url: string;
  };
  image?: {
    url: string;
  };
  footer?: {
    text: string;
    icon_url?: string;
  };
  fields: Array<{
    name: string;
    value: string;
    inline: boolean;
  }>;
}

const Index = () => {
  const { toast } = useToast();
  const [webhookUrl, setWebhookUrl] = useState("");
  const [embed, setEmbed] = useState<Embed>({
    fields: [],
  });
  const [showBuilder, setShowBuilder] = useState(false);

  const handleFieldChange = (
    index: number,
    field: { name: string; value: string; inline: boolean }
  ) => {
    const newFields = [...embed.fields];
    newFields[index] = field;
    setEmbed({ ...embed, fields: newFields });
  };

  const handleFieldRemove = (index: number) => {
    setEmbed({
      ...embed,
      fields: embed.fields.filter((_, i) => i !== index),
    });
  };

  const addField = () => {
    setEmbed({
      ...embed,
      fields: [
        ...embed.fields,
        { name: "", value: "", inline: false },
      ],
    });
  };

  const copyJson = () => {
    const json = JSON.stringify({ embeds: [embed] }, null, 2);
    navigator.clipboard.writeText(json);
    toast({
      title: "Copied to clipboard",
      description: "The embed JSON has been copied to your clipboard.",
    });
  };

  const sendWebhook = async () => {
    if (!webhookUrl) {
      toast({
        title: "Error",
        description: "Please enter a webhook URL",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ embeds: [embed] }),
      });

      if (!response.ok) throw new Error("Failed to send webhook");

      toast({
        title: "Success",
        description: "Webhook sent successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send webhook. Please check the URL and try again.",
        variant: "destructive",
      });
    }
  };

  if (!showBuilder) {
    return (
      <div className="container mx-auto min-h-screen space-y-12 py-16 text-center">
        <div className="relative space-y-4">
          <h1 className="hero-title relative text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            <span className="sparkles">Discord Embed Builder</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Create beautiful Discord webhook embeds with our easy-to-use builder. Preview your embeds in real-time and send them directly to your server! ✨
          </p>
          <Button 
            size="lg" 
            onClick={() => setShowBuilder(true)}
            className="mt-8 gap-2 rounded-full bg-gradient-to-r from-pink-400 to-purple-600 px-8 text-white hover:opacity-90"
          >
            <Heart className="h-5 w-5" />
            Start Creating
          </Button>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              icon: "✨",
              title: "Beautiful Design",
              description: "Create stunning embeds that stand out in your Discord server",
            },
            {
              icon: "👀",
              title: "Live Preview",
              description: "See your changes in real-time as you build your perfect embed",
            },
            {
              icon: "🚀",
              title: "Instant Deploy",
              description: "Send your embed directly to Discord with one click",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="glass-card hover-scale space-y-4 p-6"
            >
              <div className="text-4xl">{feature.icon}</div>
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="glass-card mx-auto max-w-3xl p-8">
          <div className="space-y-4">
            <Sparkles className="h-8 w-8 text-pink-400" />
            <h2 className="text-2xl font-bold">Ready to get started?</h2>
            <p className="text-muted-foreground">
              Create beautiful embeds for your Discord server in minutes. No coding required!
            </p>
            <Button
              onClick={() => setShowBuilder(true)}
              variant="secondary"
              className="mt-4"
            >
              Create Your First Embed
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto space-y-8 py-8">
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => setShowBuilder(false)}
          className="mb-8"
        >
          ← Back to Home
        </Button>
        <h1 className="hero-title relative text-4xl font-bold tracking-tight">
          <span className="sparkles">Embed Builder</span>
        </h1>
        <p className="mt-2 text-muted-foreground">
          Create beautiful Discord webhook embeds with a live preview ✨
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="glass-card space-y-4 p-6">
            <div className="space-y-2">
              <Label htmlFor="webhook-url">Webhook URL</Label>
              <Input
                id="webhook-url"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                placeholder="https://discord.com/api/webhooks/..."
                className="font-mono text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={embed.title || ""}
                onChange={(e) =>
                  setEmbed({ ...embed, title: e.target.value || undefined })
                }
                placeholder="Embed title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={embed.description || ""}
                onChange={(e) =>
                  setEmbed({ ...embed, description: e.target.value || undefined })
                }
                placeholder="Embed description"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="color">Color</Label>
              <Input
                id="color"
                type="color"
                value={embed.color || "#000000"}
                onChange={(e) => setEmbed({ ...embed, color: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="author-name">Author Name</Label>
              <Input
                id="author-name"
                value={embed.author?.name || ""}
                onChange={(e) =>
                  setEmbed({
                    ...embed,
                    author: { ...embed.author, name: e.target.value },
                  })
                }
                placeholder="Author name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="author-icon">Author Icon URL</Label>
              <Input
                id="author-icon"
                value={embed.author?.icon_url || ""}
                onChange={(e) =>
                  setEmbed({
                    ...embed,
                    author: { ...embed.author, icon_url: e.target.value || undefined },
                  })
                }
                placeholder="https://example.com/author-icon.png"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="thumbnail">Thumbnail URL</Label>
              <Input
                id="thumbnail"
                value={embed.thumbnail?.url || ""}
                onChange={(e) =>
                  setEmbed({
                    ...embed,
                    thumbnail: e.target.value ? { url: e.target.value } : undefined,
                  })
                }
                placeholder="https://example.com/thumbnail.png"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                value={embed.image?.url || ""}
                onChange={(e) =>
                  setEmbed({
                    ...embed,
                    image: e.target.value ? { url: e.target.value } : undefined,
                  })
                }
                placeholder="https://example.com/image.png"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="footer-text">Footer Text</Label>
              <Input
                id="footer-text"
                value={embed.footer?.text || ""}
                onChange={(e) =>
                  setEmbed({
                    ...embed,
                    footer: { ...embed.footer, text: e.target.value },
                  })
                }
                placeholder="Footer text"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="footer-icon">Footer Icon URL</Label>
              <Input
                id="footer-icon"
                value={embed.footer?.icon_url || ""}
                onChange={(e) =>
                  setEmbed({
                    ...embed,
                    footer: { ...embed.footer, icon_url: e.target.value || undefined },
                  })
                }
                placeholder="https://example.com/footer-icon.png"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Fields</h2>
              <Button 
                onClick={addField} 
                variant="outline" 
                size="sm"
                className="hover:bg-pink-50"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Field
              </Button>
            </div>

            <div className="space-y-4">
              {embed.fields.map((field, index) => (
                <EmbedField
                  key={index}
                  index={index}
                  field={field}
                  onChange={handleFieldChange}
                  onRemove={handleFieldRemove}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <Button 
              className="w-full hover:bg-pink-50" 
              variant="outline"
              onClick={copyJson}
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy JSON
            </Button>
            <Button 
              className="w-full bg-gradient-to-r from-pink-400 to-purple-600 text-white hover:opacity-90" 
              onClick={sendWebhook}
            >
              <Send className="mr-2 h-4 w-4" />
              Send Webhook
            </Button>
          </div>
        </div>

        <div className="sticky top-8 space-y-4">
          <h2 className="text-lg font-semibold">Preview</h2>
          <div className="glass-card overflow-hidden p-6">
            <EmbedPreview embed={embed} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
