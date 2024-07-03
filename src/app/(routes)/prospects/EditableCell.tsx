// app/(routes)/prospects/EditableCell.tsx
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Edit2 } from "lucide-react";

type EditableCellProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function EditableCell({ value, onChange }: EditableCellProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  const handleBlur = () => {
    setIsEditing(false);
    onChange(editValue);
  };

  if (isEditing) {
    return (
      <Input
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onBlur={handleBlur}
        autoFocus
      />
    );
  }

  return (
    <div className="flex items-center justify-between">
      <span>{value}</span>
      <Edit2
        className="h-4 w-4 cursor-pointer text-gray-400 hover:text-gray-600"
        onClick={() => setIsEditing(true)}
      />
    </div>
  );
}