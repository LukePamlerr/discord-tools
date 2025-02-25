
import { Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ToolCard } from "./ToolCard";
import { TOOLS } from "@/constants/tools";

interface WelcomeScreenProps {
  onSelectTool: (id: string) => void;
}

export const WelcomeScreen = ({ onSelectTool }: WelcomeScreenProps) => {
  return (
    <div className="container mx-auto min-h-screen space-y-12 py-16 text-center">
      <div className="relative space-y-4">
        <h1 className="hero-title relative text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
          <span className="sparkles">Discord Tools</span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          A collection of beautiful and useful tools to enhance your Discord server. Choose a tool to get started! ✨
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {TOOLS.map((tool) => (
          <ToolCard key={tool.id} {...tool} onSelect={onSelectTool} />
        ))}
      </div>

      <div className="glass-card mx-auto max-w-3xl p-8">
        <div className="space-y-4">
          <Sparkles className="h-8 w-8 text-pink-400" />
          <h2 className="text-2xl font-bold">More tools coming soon!</h2>
          <p className="text-muted-foreground">
            We're working hard to bring you more useful tools for your Discord server.
            Stay tuned for updates! ✨
          </p>
          <Button
            variant="secondary"
            className="mt-4"
            onClick={() => onSelectTool("embed-builder")}
          >
            <Heart className="mr-2 h-4 w-4" />
            Try Embed Builder
          </Button>
        </div>
      </div>
    </div>
  );
};
