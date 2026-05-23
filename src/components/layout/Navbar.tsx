import { Bell, Search, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router";
import { 
  LayoutDashboard, 
  CheckSquare, 
  FileText, 
  Bot, 
  Wallet, 
  BarChart3, 
  Hexagon
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: CheckSquare, label: "Tasks", path: "/tasks" },
  { icon: FileText, label: "Notes", path: "/notes" },
  { icon: Bot, label: "AI Assistant", path: "/ai" },
  { icon: Wallet, label: "Finance", path: "/finance" },
  { icon: BarChart3, label: "Analytics", path: "/analytics" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <header className="h-16 glass border-b border-white/5 px-4 md:px-6 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4 flex-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden text-muted-foreground"
            onClick={() => setIsOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </Button>
          
          <div className="relative max-w-md w-full hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search everything..." 
              className="w-full bg-white/5 border border-white/5 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground rounded-xl">
            <Bell className="w-5 h-5" />
          </Button>
          <div className="w-px h-6 bg-white/10 mx-2" />
          <div className="flex items-center gap-3 pl-2">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">Alex Rivera</p>
              <p className="text-[10px] text-primary font-bold uppercase tracking-wider">Pro Plan</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary p-[1px]">
              <div className="w-full h-full rounded-xl bg-background flex items-center justify-center overflow-hidden">
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100" alt="User" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden"
            />
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-72 bg-background border-r border-white/10 z-[70] p-6 flex flex-col md:hidden"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <Hexagon className="w-6 h-6 text-primary" />
                  <span className="text-xl font-bold tracking-tighter">XENO</span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="w-6 h-6" />
                </Button>
              </div>

              <nav className="flex-1 space-y-2">
                {menuItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                        isActive 
                          ? "bg-primary/10 text-primary border border-primary/20" 
                          : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                      )}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
              
              <div className="pt-6 border-t border-white/5 mt-auto">
                <p className="text-xs text-center text-muted-foreground font-medium uppercase tracking-[0.2em]">
                  Future Starts Here
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;