import { useState, useEffect } from "react";
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  CreditCard, 
  ArrowUpRight, 
  Plus,
  ArrowDownRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { toast } from "sonner";

interface Transaction {
  id: string;
  amount: number;
  category: string;
  date: string;
  type: 'income' | 'expense';
}

const Finance = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem("xeno-finance");
    return saved ? JSON.parse(saved) : [
      { id: '1', amount: 4500, category: 'Salary', date: '2024-03-01', type: 'income' },
      { id: '2', amount: 1200, category: 'Rent', date: '2024-03-02', type: 'expense' },
      { id: '3', amount: 450, category: 'Groceries', date: '2024-03-04', type: 'expense' },
      { id: '4', amount: 200, category: 'Utilities', date: '2024-03-05', type: 'expense' },
    ];
  });

  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    localStorage.setItem("xeno-finance", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (type: 'income' | 'expense') => {
    if (!amount || !category) return;
    const newTx: Transaction = {
      id: crypto.randomUUID(),
      amount: parseFloat(amount),
      category,
      date: new Date().toISOString().split('T')[0],
      type
    };
    setTransactions([newTx, ...transactions]);
    setAmount("");
    setCategory("");
    toast.success(`${type === 'income' ? 'Income' : 'Expense'} recorded`);
  };

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpense;

  const chartData = [
    { name: 'Income', value: totalIncome },
    { name: 'Expense', value: totalExpense },
  ];

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Finance</h1>
          <p className="text-muted-foreground mt-1">Track your ecosystem economy.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="glass rounded-xl border-white/10">
            <CreditCard className="w-4 h-4 mr-2" /> Connect Bank
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
            <Wallet className="w-20 h-20 text-primary" />
          </div>
          <CardContent className="p-6 pt-10">
            <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Total Balance</p>
            <h2 className="text-4xl font-bold mt-2 tracking-tight">${balance.toLocaleString()}</h2>
            <div className="mt-6 flex items-center gap-2 text-xs text-green-400 bg-green-400/10 w-fit px-2 py-1 rounded-full">
              <TrendingUp className="w-3 h-3" /> +12.5% this month
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-white/5">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div className="p-3 rounded-xl bg-green-500/10 text-green-400">
                <TrendingUp className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-green-400">Income</p>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold">${totalIncome.toLocaleString()}</h3>
              <p className="text-xs text-muted-foreground mt-1">Total revenue recorded</p>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-white/5">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div className="p-3 rounded-xl bg-red-500/10 text-red-400">
                <TrendingDown className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-red-400">Expense</p>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold">${totalExpense.toLocaleString()}</h3>
              <p className="text-xs text-muted-foreground mt-1">Total spending recorded</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 glass border-white/5">
          <CardHeader>
            <CardTitle className="text-lg">Add Transaction</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase">Amount</label>
              <Input 
                type="number" 
                placeholder="0.00" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="glass border-white/10"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase">Category</label>
              <Input 
                placeholder="e.g. Software, Coffee, Rent" 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="glass border-white/10"
              />
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <Button onClick={() => addTransaction('expense')} variant="destructive" className="rounded-xl">
                Expense
              </Button>
              <Button onClick={() => addTransaction('income')} className="rounded-xl bg-green-600 hover:bg-green-700">
                Income
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-1 glass border-white/5">
          <CardHeader>
            <CardTitle className="text-lg">Cash Flow</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis 
                    dataKey="name" 
                    stroke="rgba(255,255,255,0.3)" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <YAxis 
                    stroke="rgba(255,255,255,0.3)" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <Tooltip 
                    cursor={{fill: 'rgba(255,255,255,0.05)'}}
                    contentStyle={{ 
                      backgroundColor: 'rgba(23, 23, 23, 0.8)', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      backdropFilter: 'blur(10px)'
                    }}
                  />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? 'var(--primary)' : 'oklch(0.6 0.2 25)'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-1 glass border-white/5 overflow-hidden">
          <CardHeader>
            <CardTitle className="text-lg">History</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-white/5">
              {transactions.slice(0, 5).map((tx) => (
                <div key={tx.id} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${tx.type === 'income' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                      {tx.type === 'income' ? <ArrowDownRight className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{tx.category}</p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{tx.date}</p>
                    </div>
                  </div>
                  <p className={`text-sm font-bold ${tx.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
                    {tx.type === 'income' ? '+' : '-'}${tx.amount.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Finance;