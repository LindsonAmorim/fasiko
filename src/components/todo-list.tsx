import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { GripVertical, X } from "lucide-react";

type Task = {
  id: string;
  text: string;
  completed: boolean;
};

const defaultTasks: Task[] = [
  { id: "1", text: "", completed: true },
  { id: "2", text: "", completed: false },
  { id: "3", text: "", completed: false },
];

function FocusPrioritiesModal({
    tasks,
    setTasks
}: {
    tasks: Task[];
    setTasks: (tasks: Task[]) => void;
}) {
  const handleTaskChange = (id: string, newText: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, text: newText } : task
    );
    const lastTask = updatedTasks[updatedTasks.length - 1];
    if (lastTask.id === id && newText.trim() !== "") {
      updatedTasks.push({
        id: crypto.randomUUID(),
        text: "",
        completed: false,
      });
    }
    setTasks(updatedTasks);
  };

  const handleToggleComplete = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleReset = () => {
    setTasks([
      { id: crypto.randomUUID(), text: "", completed: false },
      { id: crypto.randomUUID(), text: "", completed: false },
      { id: crypto.randomUUID(), text: "", completed: false },
    ]);
  };

  const handleClose = () => {
    const cleanedTasks = tasks.filter((t) => t.text.trim() !== "");
    while (cleanedTasks.length < 3) {
      cleanedTasks.push({
        id: crypto.randomUUID(),
        text: "",
        completed: false,
      });
    }
    setTasks(cleanedTasks);
  };

  return (
    <DialogContent
      onInteractOutside={handleClose}
      showCloseButton={false}
      className="bg-background/80 backdrop-blur-lg border-none w-full max-w-2xl p-0 flex flex-col sm:rounded-2xl h-full sm:h-auto sm:max-h-[90vh] shadow-2xl"
    >
      <div className="flex justify-between items-center p-6 pb-2 relative shrink-0">
        <DialogClose asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full hover:bg-white/10 hover:text-white transition-all duration-300"
            onClick={handleClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </DialogClose>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
          <h2 className="text-xl font-bold tracking-tight">Focus Priorities</h2>
          <p className="text-sm text-muted-foreground">
            Set your priorities for the day
          </p>
        </div>
        <Button
          onClick={handleReset}
          variant="outline"
          className="border-red-500/50 text-red-400 hover:bg-red-500/20 hover:text-red-400 rounded-full transition-all duration-300"
        >
          Reset
        </Button>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto p-6 pt-4">
        {tasks.map((task, index) => (
          <div
            key={task.id}
            className="flex items-center gap-4 p-3 pr-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 shadow-md"
          >
            <span className="text-2xl font-bold text-muted-foreground/50 w-6 text-center">{index + 1}</span>
            <Checkbox
              id={`task-${task.id}`}
              checked={task.completed}
              onCheckedChange={() => handleToggleComplete(task.id)}
              className="size-6 rounded-md border-white/20 data-[state=checked]:bg-emerald-500 data-[state=checked]:text-white transition-all duration-300"
            />
            <Input
              type="text"
              value={task.text}
              onChange={(e) => handleTaskChange(task.id, e.target.value)}
              placeholder="Type your priority here..."
              className={`bg-transparent border-0 h-auto p-0 text-base focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/50 transition-all duration-300 ${
                task.completed ? "line-through text-muted-foreground" : "text-white"
              }`}
              style={{ boxShadow: "none" }}
            />
            <GripVertical className="h-6 w-6 text-muted-foreground/30 cursor-grab hover:text-white transition-all duration-300" />
          </div>
        ))}
      </div>
    </DialogContent>
  );
}

export function FocusPriorities() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const activeTask =
    tasks.find((t) => !t.completed && t.text.trim() !== "")?.text ||
    "All priorities complete! ✨";

  useEffect(() => {
    setIsMounted(true);
    try {
      const storedTasks = localStorage.getItem("focusflow-tasks");
      if (storedTasks) {
        const parsed = JSON.parse(storedTasks);
        if (parsed.length > 0) {
          setTasks(parsed);
          return;
        }
      }
      setTasks(defaultTasks);
    } catch (error) {
      console.error("Failed to parse tasks from localStorage", error);
      setTasks(defaultTasks);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("focusflow-tasks", JSON.stringify(tasks));
    }
  }, [tasks, isMounted]);

  if (!isMounted)
    return <div className="h-9 w-64 bg-muted/20 animate-pulse rounded-md" />;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className="flex items-center gap-2 group cursor-pointer"
          role="button"
        >
          <h2 className="text-2xl font-bold text-center text-foreground/80 hover:text-foreground transition-colors duration-300">
            {activeTask}
          </h2>
        </div>
      </DialogTrigger>
      <FocusPrioritiesModal tasks={tasks} setTasks={setTasks} />
    </Dialog>
  );
}
