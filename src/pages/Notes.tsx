import { useState, useEffect } from "react";
import { Plus, Search, FileText, MoreVertical, Trash2, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
  color: string;
}

const colors = [
  "border-blue-500/30 bg-blue-500/5",
  "border-purple-500/30 bg-purple-500/5",
  "border-pink-500/30 bg-pink-500/5",
  "border-orange-500/30 bg-orange-500/5",
];

const Notes = () => {
  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem("xeno-notes");
    return saved ? JSON.parse(saved) : [
      { id: '1', title: 'Product Vision', content: 'Build the ultimate AI ecosystem for the modern professional...', date: 'Mar 12, 2024', color: colors[0] },
      { id: '2', title: 'Marketing Strategy', content: 'Focus on glassmorphism and high-fidelity visuals...', date: 'Mar 10, 2024', color: colors[1] },
    ];
  });

  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem("xeno-notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      title: "Untitled Note",
      content: "",
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      color: colors[Math.floor(Math.random() * colors.length)]
    };
    setNotes([newNote, ...notes]);
    toast.success("New note created");
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(n => n.id !== id));
    toast.error("Note deleted");
  };

  const filteredNotes = notes.filter(n => 
    n.title.toLowerCase().includes(search.toLowerCase()) || 
    n.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notes</h1>
          <p className="text-muted-foreground mt-1">Capture your thoughts instantly.</p>
        </div>
        <Button onClick={addNote} className="rounded-xl bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" /> New Note
        </Button>
      </header>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input 
          placeholder="Search notes..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="glass border-white/10 pl-10 h-11 rounded-xl"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredNotes.map((note) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              layout
            >
              <Card className={`glass border border-white/5 hover:border-white/20 transition-all group h-[220px] flex flex-col relative overflow-hidden`}>
                <div className={`absolute top-0 left-0 w-1 h-full ${note.color.split(' ')[0].replace('border-', 'bg-')}`} />
                <CardHeader className="p-5 pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors truncate pr-4">
                      {note.title}
                    </CardTitle>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => deleteNote(note.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-5 pt-0 flex-1 overflow-hidden">
                  <p className="text-sm text-muted-foreground line-clamp-4 leading-relaxed">
                    {note.content || "Start typing your brilliant ideas..."}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-[10px] text-muted-foreground font-semibold uppercase tracking-widest">
                    <FileText className="w-3 h-3" /> {note.date}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Notes;