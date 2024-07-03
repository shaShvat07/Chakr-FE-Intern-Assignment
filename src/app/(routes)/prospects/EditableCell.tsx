// app/(routes)/prospects/EditableCell.tsx
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Edit2, Check } from "lucide-react";

type EditableCellProps = {
  value: string;
  onChange: (newValue: string) => void;
};

export default function EditableCell({ value, onChange }: EditableCellProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  const handleSave = () => {
    onChange(editValue);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="flex items-center">
        <Input
          // value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          className="mr-2"
        />
        <Button onClick={handleSave} size="sm">
          <Check className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between group">
      <span>{value}</span>
      <Button
        onClick={() => setIsEditing(true)}
        size="sm"
        variant="ghost"
        className="opacity-0 group-hover:opacity-100"
      >
        <Edit2 className="h-4 w-4" />
      </Button>
    </div>
  );
}