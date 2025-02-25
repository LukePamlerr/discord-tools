
import { useState } from "react";
import { EmbedBuilder } from "@/components/EmbedBuilder";
import { ImageTools } from "@/components/ImageTools";
import { ServerSettings } from "@/components/ServerSettings";
import { WelcomeScreen } from "@/components/WelcomeScreen";

const Index = () => {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  if (!selectedTool) {
    return <WelcomeScreen onSelectTool={setSelectedTool} />;
  }

  switch (selectedTool) {
    case "embed-builder":
      return <EmbedBuilder onBack={() => setSelectedTool(null)} />;
    case "image-tools":
      return <ImageTools />;
    case "server-settings":
      return <ServerSettings />;
    case "bot-commands":
      return <div>Bot Commands Tool Coming Soon!</div>;
    case "role-manager":
      return <div>Role Manager Tool Coming Soon!</div>;
    case "auto-mod":
      return <div>Auto Moderator Tool Coming Soon!</div>;
    case "channel-analytics":
      return <div>Channel Analytics Tool Coming Soon!</div>;
    case "backup-tools":
      return <div>Backup Tools Coming Soon!</div>;
    case "webhook-manager":
      return <div>Webhook Manager Coming Soon!</div>;
    default:
      return null;
  }
};

export default Index;
