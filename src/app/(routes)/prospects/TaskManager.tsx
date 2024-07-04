// app/(routes)/prospects/TaskManager.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePicker } from "@/components/ui/datepicker";

type Task = {
  id: string;
  content: string;
  completed: boolean;
  deadline: Date;
};

export default function TaskManager({ prospectId }: { prospectId: string }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [deadline, setDeadline] = useState<Date | null>(null);

  const addTask = () => {
    if (newTask && deadline) {
      setTasks([
        ...tasks,
        {
          id: Date.now().toString(),
          content: newTask,
          completed: false,
          deadline,
        },
      ]);
      setNewTask("");
      setDeadline(null);
    }
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="h-fit overflow-y-auto">
      <div className="flex space-x-2 mb-4 h-fit">
        <Input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New task..."
          required
        />
        <DatePicker
          selected={deadline}
          onChange={(date) => setDeadline(date)}
          placeholderText="Select a deadline"
        />
        <Button onClick={addTask}>Add Task</Button>
      </div>
      <ul className="h-full">
        {tasks.map((task) => (
          <li key={task.id} className="flex items-center space-x-4 mb-2">
            <Checkbox
              checked={task.completed}
              onCheckedChange={() => toggleTask(task.id)}
            />
            <span className={`flex-1 ${task.completed ? "line-through" : ""}`}>
              {task.content}
            </span>
            <span>{task.deadline.toLocaleDateString()}</span>
            <Button variant="destructive" onClick={() => deleteTask(task.id)}>
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
