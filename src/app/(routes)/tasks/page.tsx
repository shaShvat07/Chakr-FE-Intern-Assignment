// app/(routes)/prospects/TaskManager.tsx
"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePicker } from "@/components/ui/datepicker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { initialProspects } from "@/lib/data";

type Task = {
  id: string;
  content: string;
  completed: boolean;
  deadline: Date;
  assignedTo: string | null;
};

type Prospect = {
  id: string;
  firstName: string;
  lastName: string;
};

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [deadline, setDeadline] = useState<Date | null>(null);
  const [assignedTo, setAssignedTo] = useState<string | null>(null);
  const [prospects, setProspects] = useState<Prospect[]>([]);

  useEffect(() => {
    // Fetch prospects from initialProspects
    const fetchedProspects = initialProspects.map(({ id, firstName, lastName }) => ({
      id,
      firstName,
      lastName,
    }));
    setProspects(fetchedProspects);
  }, []);

  const addTask = () => {
    if (newTask && deadline) {
      setTasks([
        ...tasks,
        {
          id: Date.now().toString(),
          content: newTask,
          completed: false,
          deadline,
          assignedTo,
        },
      ]);
      setNewTask("");
      setDeadline(null);
      setAssignedTo(null);
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
    <div className="h-full flex flex-col mt-6">
      <div className="flex space-x-2 mb-4">
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
        <Select onValueChange={(value) => setAssignedTo(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Assign to..." />
          </SelectTrigger>
          <SelectContent>
            {prospects.map((prospect) => (
              <SelectItem key={prospect.id} value={prospect.id}>
                {`${prospect.firstName} ${prospect.lastName}`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={addTask}>Add Task</Button>
      </div>
      <div className="flex-1 overflow-y-auto">
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className="flex items-center space-x-4 mb-2 bg-secondary p-2 rounded">
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => toggleTask(task.id)}
              />
              <span className={`flex-1 ${task.completed ? "line-through" : ""}`}>
                {task.content}
              </span>
              <span className="text-sm text-muted-foreground">{task.deadline.toLocaleDateString()}</span>
              {task.assignedTo && (
                <span className="text-sm text-muted-foreground">
                  Assigned to: {prospects.find(p => p.id === task.assignedTo)?.firstName}
                </span>
              )}
              <Button variant="destructive" onClick={() => deleteTask(task.id)}>
                Delete
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}