import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import {
  Shield,
  Users,
  MessageSquare,
  Bell,
  Bot,
  AlertTriangle,
  Check,
  RefreshCcw,
  Sliders,
  BadgeCheck,
  UserPlus,
  MessagesSquare,
  ShieldAlert,
  Copy
} from "lucide-react";

interface ServerSetting {
  id: string;
  name: string;
  description: string;
  type: "switch" | "select" | "input" | "textarea";
  options?: string[];
  value: any;
  category: "moderation" | "chat" | "roles" | "notifications" | "advanced" | "integrations";
  icon: any;
}

export const ServerSettings = () => {
  const { toast } = useToast();
  const [processing, setProcessing] = useState(false);

  const [settings, setSettings] = useState<ServerSetting[]>([
    {
      id: "slow_mode",
      name: "Slow Mode",
      description: "Set channel message cooldown",
      type: "select",
      options: ["Off", "5s", "10s", "30s", "1m", "5m", "10m"],
      value: "Off",
      category: "chat",
      icon: MessageSquare,
    },
    {
      id: "verification_level",
      name: "Verification Level",
      description: "Server member verification requirements",
      type: "select",
      options: ["None", "Low", "Medium", "High", "Highest"],
      value: "Medium",
      category: "moderation",
      icon: Shield,
    },
    {
      id: "content_filter",
      name: "Content Filter",
      description: "Scan and filter inappropriate content",
      type: "select",
      options: ["Don't scan", "Scan from new members", "Scan everyone"],
      value: "Scan from new members",
      category: "moderation",
      icon: ShieldAlert,
    },
    {
      id: "welcome_message",
      name: "Welcome Message",
      description: "Customize server welcome message",
      type: "textarea",
      value: "Welcome to our server! 👋",
      category: "chat",
      icon: MessagesSquare,
    },
    {
      id: "auto_mod",
      name: "Auto Moderation",
      description: "Automatically moderate common issues",
      type: "switch",
      value: true,
      category: "moderation",
      icon: Bot,
    },
    {
      id: "member_screening",
      name: "Member Screening",
      description: "Require new members to accept rules",
      type: "switch",
      value: true,
      category: "moderation",
      icon: UserPlus,
    },
    {
      id: "role_notifications",
      name: "Role Notifications",
      description: "Send notifications for role changes",
      type: "switch",
      value: false,
      category: "notifications",
      icon: Bell,
    },
    {
      id: "default_notifications",
      name: "Default Notifications",
      description: "Default notification settings for new channels",
      type: "select",
      options: ["All Messages", "Only @mentions"],
      value: "Only @mentions",
      category: "notifications",
      icon: Bell,
    },
    {
      id: "rate_limiting",
      name: "Rate Limiting",
      description: "Configure message rate limits per user",
      type: "select",
      options: ["Off", "Low (10/min)", "Medium (5/min)", "High (2/min)", "Custom"],
      value: "Medium (5/min)",
      category: "advanced",
      icon: AlertTriangle,
    },
    {
      id: "analytics_enabled",
      name: "Server Analytics",
      description: "Track server activity and member engagement",
      type: "switch",
      value: false,
      category: "integrations",
      icon: Sliders,
    },
    {
      id: "join_requirements",
      name: "Join Requirements",
      description: "Set minimum account age and verification",
      type: "select",
      options: ["None", "Email Verified", "Phone Verified", "2FA Required"],
      value: "Email Verified",
      category: "moderation",
      icon: BadgeCheck,
    },
    {
      id: "auto_responses",
      name: "Auto Responses",
      description: "Configure automatic replies to common phrases",
      type: "textarea",
      value: "!help -> Shows server commands\n!rules -> Displays server rules",
      category: "chat",
      icon: MessagesSquare,
    },
    {
      id: "raid_protection",
      name: "Anti-Raid Mode",
      description: "Advanced protection against server raids",
      type: "select",
      options: ["Disabled", "Basic", "Moderate", "Aggressive"],
      value: "Moderate",
      category: "moderation",
      icon: ShieldAlert,
    }
  ]);

  const handleSettingChange = (id: string, value: any) => {
    setSettings(settings.map(s => s.id === id ? { ...s, value } : s));
  };

  const handleExport = () => {
    const config = settings.reduce((acc, { id, value }) => ({
      ...acc,
      [id]: value
    }), {});

    const json = JSON.stringify(config, null, 2);
    navigator.clipboard.writeText(json);

    toast({
      title: "Settings Exported",
      description: "Server settings configuration copied to clipboard",
    });
  };

  const handleApply = async () => {
    setProcessing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setProcessing(false);

    toast({
      title: "Settings Updated",
      description: "Server settings have been updated successfully",
    });
  };

  const categories = {
    moderation: {
      title: "Moderation",
      description: "Control server safety and member behavior",
      icon: Shield,
      color: "from-red-400 to-orange-600",
    },
    chat: {
      title: "Chat & Messages",
      description: "Configure messaging and communication settings",
      icon: MessageSquare,
      color: "from-blue-400 to-cyan-600",
    },
    roles: {
      title: "Roles & Permissions",
      description: "Manage member roles and permissions",
      icon: Users,
      color: "from-purple-400 to-pink-600",
    },
    notifications: {
      title: "Notifications",
      description: "Configure server notification settings",
      icon: Bell,
      color: "from-green-400 to-emerald-600",
    },
    advanced: {
      title: "Advanced Settings",
      description: "Fine-tune advanced server configurations",
      icon: Sliders,
      color: "from-yellow-400 to-amber-600",
    },
    integrations: {
      title: "Integrations",
      description: "Manage server integrations and analytics",
      icon: Bot,
      color: "from-indigo-400 to-violet-600",
    },
  };

  return (
    <div className="container mx-auto space-y-8 py-8">
      <div className="text-center">
        <h1 className="hero-title relative text-4xl font-bold tracking-tight">
          <span className="sparkles">Server Settings</span>
        </h1>
        <p className="mt-2 text-muted-foreground">
          Configure and optimize your Discord server settings ✨
        </p>
      </div>

      <div className="flex justify-end gap-4">
        <Button
          variant="outline"
          onClick={handleExport}
          className="gap-2"
        >
          <Copy className="h-4 w-4" />
          Export Settings
        </Button>
        <Button
          onClick={handleApply}
          disabled={processing}
          className="gap-2 bg-gradient-to-r from-orange-400 to-red-600 text-white hover:opacity-90"
        >
          {processing ? (
            <RefreshCcw className="h-4 w-4 animate-spin" />
          ) : (
            <Check className="h-4 w-4" />
          )}
          Apply Changes
        </Button>
      </div>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {Object.entries(categories).map(([key, category]) => (
          <Card key={key} className="glass-card">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className={`rounded-xl bg-gradient-to-r ${category.color} p-2 text-white`}>
                  <category.icon className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle>{category.title}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {settings
                .filter(setting => setting.category === key)
                .map(setting => (
                  <div key={setting.id} className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <setting.icon className="h-4 w-4" />
                      {setting.name}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {setting.description}
                    </p>
                    {setting.type === "switch" ? (
                      <Switch
                        checked={setting.value}
                        onCheckedChange={(checked) =>
                          handleSettingChange(setting.id, checked)
                        }
                      />
                    ) : setting.type === "select" ? (
                      <Select
                        value={setting.value}
                        onValueChange={(value) =>
                          handleSettingChange(setting.id, value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {setting.options?.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : setting.type === "textarea" ? (
                      <Textarea
                        value={setting.value}
                        onChange={(e) =>
                          handleSettingChange(setting.id, e.target.value)
                        }
                        rows={3}
                      />
                    ) : (
                      <Input
                        value={setting.value}
                        onChange={(e) =>
                          handleSettingChange(setting.id, e.target.value)
                        }
                      />
                    )}
                  </div>
                ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
