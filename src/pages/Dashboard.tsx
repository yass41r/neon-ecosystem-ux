import { motion } from "framer-motion";
import { 
  ArrowUpRight, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  Zap, 
  Plus,
  Sparkles,
  Bot
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const data = [
  { name: 'Mon', value: 4000 },
  { name: 'Tue', value: 3000 },
  { name: 'Wed', value: 5000 },
  { name: 'Thu', value: 2780 },
  { name: 'Fri', value: 6890 },
  { name: 'Sat', value: 2390 },
  { name: 'Sun', value: 3490 },
];

const stats = [
  { label: "Active Tasks", value: "12", icon: Zap, color: "text-primary", trend: "+2" },
  { label: "Completion", value: "84%", icon: CheckCircle2, color: "text-green-400", trend: "+5%" },
  { label: "Avg. Focus", value: "6.2h", icon: Clock, color: "text-secondary", trend: "-0.4h" },
  { label: "Revenue", value: "$4,250", icon: TrendingUp, color: "text-orange-400", trend: "+12%" },
];

const Dashboard = () => {
  return (
    <div className="space-y-8 pb-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 blur-[80px] pointer-events-none" />
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary uppercase tracking-[0.2em] flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> System Optimal
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter">
            Think <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Beyond.</span>
          </h1>
          <p className="text-muted-foreground mt-2 max-w-lg">Your intelligent ecosystem for a simplified smart life. Future starts here.</p>
        </div>
        <div className="flex gap-3 shrink-0">
          <Button variant="outline" className="glass rounded-xl border-white/10 h-12 px-6">
            Analytics
          </Button>
          <Button className="rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 h-12 px-6 font-bold">
            <Plus className="w-5 h-5 mr-2" /> New Task
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="glass border-white/5 overflow-hidden group hover:border-primary/30 transition-all">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className={`p-2.5 rounded-xl bg-white/5 ${stat.color} group-hover:scale-110 transition-transform`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${stat.trend.startsWith('+') ? 'text-green-400 bg-green-400/10' : 'text-red-400 bg-red-400/10'}`}>
                    {stat.trend}
                  </span>
                </div>
                <div className="mt-4">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">{stat.label}</p>
                  <h3 className="text-3xl font-bold mt-1 tracking-tight">{stat.value}</h3>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 glass border-white/5 shadow-2xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] pointer-events-none" />
          <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 pb-4">
            <div>
              <CardTitle className="text-xl font-bold tracking-tight">Performance Analytics</CardTitle>
              <p className="text-xs text-muted-foreground mt-1">Productivity velocity over the last 7 days</p>
            </div>
            <div className="flex gap-1">
              {['7D', '1M', '3M'].map(t => (
                <Button key={t} variant="ghost" size="sm" className={`h-8 w-10 text-[10px] rounded-lg ${t === '7D' ? 'bg-white/5 text-primary' : 'text-muted-foreground'}`}>{t}</Button>
              ))}
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                  <XAxis 
                    dataKey="name" 
                    stroke="rgba(255,255,255,0.2)" 
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    dy={10}
                  />
                  <YAxis 
                    stroke="rgba(255,255,255,0.2)" 
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    dx={-10}
                    tickFormatter={(value) => `${value/1000}k`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(10, 10, 10, 0.9)', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '16px',
                      backdropFilter: 'blur(12px)',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                    }}
                    itemStyle={{ color: '#fff', fontSize: '12px' }}
                    labelStyle={{ color: 'rgba(255,255,255,0.5)', marginBottom: '4px' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="var(--primary)" 
                    strokeWidth={4}
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                    animationDuration={2000}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="glass border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 blur-[60px] pointer-events-none" />
            <CardHeader>
              <CardTitle className="text-lg font-bold">XENO AI Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10">
                <div className="flex items-center gap-2 mb-2">
                  <Bot className="w-4 h-4 text-primary" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Recommendation</span>
                </div>
                <p className="text-sm leading-relaxed italic">"Your focus peak is between 9:00 AM and 11:30 AM. Scheduling 'Deep Work' sessions during this window could increase output by 22%."</p>
              </div>
              <Button variant="ghost" className="w-full justify-between text-xs font-semibold group rounded-xl hover:bg-white/5">
                Optimize Schedule <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>

          <Card className="glass border-white/5">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-bold">Upcoming</CardTitle>
              <Button variant="ghost" size="sm" className="h-7 w-7 p-0 rounded-full bg-white/5">
                <Plus className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { title: "Project Sync", time: "10:30 AM", type: "Meeting", color: "bg-blue-500" },
                { title: "Budget Review", time: "02:00 PM", type: "Finance", color: "bg-purple-500" },
                { title: "Client Call", time: "Tomorrow", type: "Sales", color: "bg-orange-500" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-all group cursor-pointer border border-transparent hover:border-white/5">
                  <div className={`w-1 h-10 rounded-full ${item.color}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold truncate">{item.title}</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">{item.time} • {item.type}</p>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-muted-foreground/30 group-hover:text-primary transition-colors" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;