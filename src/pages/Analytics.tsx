import { motion } from "framer-motion";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Target, Cpu, Activity } from "lucide-react";

const productivityData = [
  { name: 'Mon', score: 85 },
  { name: 'Tue', score: 92 },
  { name: 'Wed', score: 78 },
  { name: 'Thu', score: 95 },
  { name: 'Fri', score: 88 },
  { name: 'Sat', score: 65 },
  { name: 'Sun', score: 70 },
];

const categoryData = [
  { name: 'Deep Work', value: 45, color: 'var(--primary)' },
  { name: 'Meetings', value: 20, color: 'var(--secondary)' },
  { name: 'Admin', value: 15, color: '#f97316' },
  { name: 'Research', value: 20, color: '#10b981' },
];

const Analytics = () => {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground mt-1">Deep insights powered by XENO Intelligence.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Efficiency Score", value: "92/100", icon: Activity, color: "text-primary" },
          { label: "Deep Work Hours", value: "32.5h", icon: Target, color: "text-secondary" },
          { label: "AI Interventions", value: "148", icon: Cpu, color: "text-blue-400" },
          { label: "System Health", value: "Optimal", icon: Shield, color: "text-green-400" },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="glass border-white/5">
              <CardContent className="p-6 flex items-center gap-4">
                <div className={`p-3 rounded-xl bg-white/5 ${item.color}`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">{item.label}</p>
                  <h3 className="text-xl font-bold mt-0.5">{item.value}</h3>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass border-white/5">
          <CardHeader>
            <CardTitle className="text-lg">Weekly Performance Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={productivityData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(23, 23, 23, 0.8)', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      backdropFilter: 'blur(10px)'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke="var(--primary)" 
                    strokeWidth={4} 
                    dot={{ fill: 'var(--primary)', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 8, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-white/5">
          <CardHeader>
            <CardTitle className="text-lg">Time Allocation</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <div className="h-[300px] w-full max-w-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(23, 23, 23, 0.8)', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap justify-center gap-4 mt-2">
                {categoryData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;