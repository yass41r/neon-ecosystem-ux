import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, Command, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "assistant" | "user";
  content: string;
}

const AIAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hello! I am XENO, your productivity intelligence. How can I help you optimize your workflow today?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg = input;
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      let response = "I've analyzed your request. Based on your current task load (12 active items), I recommend prioritizing the 'Design XENO UI' task as it has the highest impact on your project timeline.";
      
      if (userMsg.toLowerCase().includes("finance")) {
        response = "Your current monthly spending is at $3,200. You are 15% under budget for this month. Would you like a detailed breakdown?";
      } else if (userMsg.toLowerCase().includes("hello") || userMsg.toLowerCase().includes("hi")) {
        response = "Welcome back! All systems are operational. You have 3 meetings scheduled for today.";
      }
      
      setMessages(prev => [...prev, { role: "assistant", content: response }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="h-[calc(100vh-10rem)] flex flex-col max-w-5xl mx-auto glass rounded-3xl border border-white/5 overflow-hidden">
      <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/5">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/20 neon-border">
            <Bot className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-bold text-sm tracking-tight">XENO Intelligence</h2>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Online</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" className="text-xs text-muted-foreground h-8 px-3 rounded-lg">
            <Command className="w-3 h-3 mr-2" /> Model: X-Alpha 4
          </Button>
          <Button variant="ghost" size="sm" className="text-xs text-muted-foreground h-8 px-3 rounded-lg">
            <Zap className="w-3 h-3 mr-2 text-yellow-500" /> Upgrade
          </Button>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex gap-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                msg.role === 'assistant' ? 'bg-primary/20 text-primary' : 'bg-white/10 text-muted-foreground'
              }`}>
                {msg.role === 'assistant' ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
              </div>
              <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'assistant' 
                  ? 'glass border-white/5 text-foreground' 
                  : 'bg-primary text-primary-foreground font-medium'
              }`}>
                {msg.content}
              </div>
            </div>
          </motion.div>
        ))}
        
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="flex gap-3 items-center">
              <div className="w-8 h-8 rounded-xl bg-primary/20 text-primary flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce delay-100" />
                <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce delay-200" />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <div className="p-6 pt-0">
        <div className="p-4 bg-white/5 rounded-2xl border border-white/5 mb-4 hidden md:flex gap-4">
          <div className="flex-1 text-[10px] text-muted-foreground uppercase tracking-widest font-semibold flex items-center gap-2">
            <Sparkles className="w-3 h-3 text-primary" /> Suggestions:
          </div>
          {["Optimize schedule", "Analyze expenses", "Project status"].map(tag => (
            <button 
              key={tag}
              onClick={() => setInput(tag)}
              className="text-[10px] bg-white/5 hover:bg-white/10 px-2 py-1 rounded-md transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
        <form onSubmit={handleSend} className="relative">
          <Input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask XENO anything..." 
            className="glass h-14 rounded-2xl border-white/10 pl-6 pr-14 focus-visible:ring-primary focus-visible:border-primary/50"
          />
          <Button 
            type="submit" 
            disabled={!input.trim() || isTyping}
            className="absolute right-2 top-2 h-10 w-10 p-0 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AIAssistant;