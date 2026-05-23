import { useState, useEffect } from "react";
import { Plus, Trash2, CheckCircle, Circle, Tag, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface Task {
  id: string;
  text: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
}

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem("xeno-tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    localStorage.setItem("xeno-tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    const newTask: Task = {
      id: crypto.randomUUID(),
      text: inputValue,
      completed: false,
      priority: "medium"
    };

    setTasks([newTask, ...tasks]);
    setInputValue("");
    toast.success("Task added to ecosystem");
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
    toast.error("Task removed");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
        <p className="text-muted-foreground mt-1">Manage your intelligent workflow.</p>
      </header>

      <form onSubmit={addTask} className="relative group">
        <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-focus-within:opacity-50 transition-opacity pointer-events-none" />
        <div className="relative flex gap-2">
          <Input 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add a new task (e.g. Prepare deck for investors)"
            className="glass h-14 rounded-2xl border-white/10 px-6 focus-visible:ring-primary focus-visible:border-primary/50"
          />
          <Button type="submit" className="h-14 px-8 rounded-2xl bg-primary hover:bg-primary/90">
            <Plus className="w-5 h-5" />
          </Button>
        </div>
      </form>

      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm text-muted-foreground px-2">
          <p>{tasks.filter(t => !t.completed).length} items remaining</p>
          <div className="flex gap-4">
            <button className="hover:text-foreground">All</button>
            <button className="hover:text-foreground">Active</button>
            <button className="hover:text-foreground">Completed</button>
          </div>
        </div>

        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {tasks.map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                layout
              >
                <Card className={`glass border-white/5 group hover:border-primary/30 transition-all duration-300 ${task.completed ? 'opacity-60' : ''}`}>
                  <CardContent className="p-4 flex items-center gap-4">
                    <button 
                      onClick={() => toggleTask(task.id)}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {task.completed ? (
                        <CheckCircle className="w-6 h-6 text-primary" />
                      ) : (
                        <Circle className="w-6 h-6" />
                      )}
                    </button>
                    
                    <div className="flex-1 min-w-0">
                      <p className={`text-base font-medium transition-all ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                        {task.text}
                      </p>
                      <div className="flex gap-3 mt-1">
                        <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">
                          <Tag className="w-3 h-3" /> Inbox
                        </span>
                        <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">
                          <CalendarIcon className="w-3 h-3" /> Today
                        </span>
                      </div>
                    </div>

                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => deleteTask(task.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>

          {tasks.length === 0 && (
            <div className="py-20 text-center glass rounded-3xl border-dashed border-white/10">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">Everything clear! No pending tasks.</p>
              <Button variant="link" onClick={() => setInputValue("Try adding something...")}>
                Create your first task
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tasks;