
import { LucideIcon } from "lucide-react";

interface ToolCardProps {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
  comingSoon: boolean;
  onSelect: (id: string) => void;
}

export const ToolCard = ({
  id,
  name,
  description,
  icon: Icon,
  color,
  comingSoon,
  onSelect,
}: ToolCardProps) => {
  return (
    <button
      onClick={() => !comingSoon && onSelect(id)}
      className="glass-card hover-scale group relative overflow-hidden p-6 text-left"
      disabled={comingSoon}
    >
      {comingSoon && (
        <div className="absolute right-2 top-2 rounded-full bg-pink-100 px-2 py-1 text-xs font-medium text-pink-600">
          Coming Soon
        </div>
      )}
      <div className={`mb-4 inline-flex rounded-xl bg-gradient-to-r ${color} p-3 text-white`}>
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-xl font-semibold">{name}</h3>
      <p className="mt-2 text-muted-foreground">{description}</p>
    </button>
  );
};
