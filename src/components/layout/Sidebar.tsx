import { Link, useLocation } from "react-router";
import { 
  LayoutDashboard, 
  CheckSquare, 
  FileText, 
  Bot, 
  Wallet, 
  BarChart3, 
  Calendar, 
  Settings,
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

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 glass border-r border-white/5 flex flex-col hidden md:flex">
      <div className="p-6 flex items-center gap-3">
        <div className="p-2 rounded-xl bg-primary/20 neon-border">
          <Hexagon className="w-6 h-6 text-primary" />
        </div>
        <span className="text-xl font-bold tracking-tighter text-foreground">
          XENO
        </span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                isActive 
                  ? "bg-primary/10 text-primary border border-primary/20" 
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 transition-colors",
                isActive ? "text-primary" : "group-hover:text-primary/70"
              )} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto">
        <div className="p-4 glass rounded-2xl border border-white/5 space-y-3">
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Storage</p>
          <div className="w-full bg-white/5 rounded-full h-1.5">
            <div className="bg-primary h-1.5 rounded-full w-3/4" />
          </div>
          <p className="text-xs text-muted-foreground">7.2 GB / 10 GB used</p>
        </div>
        
        <Link
          to="/settings"
          className="flex items-center gap-3 px-4 py-3 mt-4 rounded-xl text-muted-foreground hover:bg-white/5 hover:text-foreground transition-all"
        >
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;