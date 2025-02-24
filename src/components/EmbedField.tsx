
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface EmbedFieldProps {
  index: number;
  field: {
    name: string;
    value: string;
    inline: boolean;
  };
  onChange: (index: number, field: { name: string; value: string; inline: boolean }) => void;
  onRemove: (index: number) => void;
}

export const EmbedField = ({ index, field, onChange, onRemove }: EmbedFieldProps) => {
  return (
    <div className="field-animation relative space-y-2 rounded-lg border p-4">
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2"
        onClick={() => onRemove(index)}
      >
        <X className="h-4 w-4" />
      </Button>
      <div className="space-y-2">
        <Label htmlFor={`field-name-${index}`}>Field Name</Label>
        <Input
          id={`field-name-${index}`}
          value={field.name}
          onChange={(e) => onChange(index, { ...field, name: e.target.value })}
          placeholder="Field name"
          className="max-w-md"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`field-value-${index}`}>Field Value</Label>
        <Input
          id={`field-value-${index}`}
          value={field.value}
          onChange={(e) => onChange(index, { ...field, value: e.target.value })}
          placeholder="Field value"
          className="max-w-md"
        />
      </div>
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={field.inline}
          onChange={(e) => onChange(index, { ...field, inline: e.target.checked })}
          className="rounded border-gray-300"
        />
        <span className="text-sm">Inline field</span>
      </label>
    </div>
  );
};
