
import { 
  MessagesSquare, 
  ImageIcon, 
  Bot, 
  Settings, 
  Users, 
  Shield, 
  Sliders 
} from "lucide-react";

export const TOOLS = [
  {
    id: "embed-builder",
    name: "Embed Builder",
    description: "Create beautiful Discord webhook embeds with live preview",
    icon: MessagesSquare,
    color: "from-pink-400 to-purple-600",
    comingSoon: false,
  },
  {
    id: "image-tools",
    name: "Image Tools",
    description: "Optimize and resize images for Discord attachments",
    icon: ImageIcon,
    color: "from-blue-400 to-cyan-600",
    comingSoon: false,
  },
  {
    id: "bot-commands",
    name: "Bot Commands",
    description: "Generate and test Discord bot commands",
    icon: Bot,
    color: "from-green-400 to-emerald-600",
    comingSoon: false,
  },
  {
    id: "server-settings",
    name: "Server Settings",
    description: "Manage and optimize your Discord server settings",
    icon: Settings,
    color: "from-orange-400 to-red-600",
    comingSoon: false,
  },
  {
    id: "role-manager",
    name: "Role Manager",
    description: "Advanced role hierarchy and permission management",
    icon: Users,
    color: "from-violet-400 to-purple-600",
    comingSoon: true,
  },
  {
    id: "auto-mod",
    name: "Auto Moderator",
    description: "AI-powered content moderation and filtering",
    icon: Shield,
    color: "from-indigo-400 to-blue-600",
    comingSoon: true,
  },
  {
    id: "channel-analytics",
    name: "Channel Analytics",
    description: "Advanced insights and activity tracking",
    icon: Sliders,
    color: "from-cyan-400 to-teal-600",
    comingSoon: true,
  },
  {
    id: "backup-tools",
    name: "Backup Tools",
    description: "Server backup and restore utilities",
    icon: Bot,
    color: "from-emerald-400 to-green-600",
    comingSoon: true,
  },
  {
    id: "webhook-manager",
    name: "Webhook Manager",
    description: "Advanced webhook creation and management",
    icon: MessagesSquare,
    color: "from-rose-400 to-pink-600",
    comingSoon: true,
  }
];
