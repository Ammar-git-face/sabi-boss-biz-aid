import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Users, Package, Receipt, Wallet } from "lucide-react";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const stats = [
    { 
      label: "Today's Sales", 
      value: "₦45,000", 
      change: "+12%", 
      trend: "up",
      icon: TrendingUp,
      color: "primary"
    },
    { 
      label: "Total Customers", 
      value: "156", 
      change: "+8", 
      trend: "up",
      icon: Users,
      color: "secondary"
    },
    { 
      label: "Expenses", 
      value: "₦12,500", 
      change: "-5%", 
      trend: "down",
      icon: Receipt,
      color: "accent"
    },
    { 
      label: "Loan Balance", 
      value: "₦50,000", 
      change: "Due in 15 days", 
      trend: "neutral",
      icon: Wallet,
      color: "destructive"
    },
  ];

  const salesData = [
    { day: "Mon", sales: 12000 },
    { day: "Tue", sales: 19000 },
    { day: "Wed", sales: 15000 },
    { day: "Thu", sales: 25000 },
    { day: "Fri", sales: 32000 },
    { day: "Sat", sales: 45000 },
    { day: "Sun", sales: 28000 },
  ];

  const expensesData = [
    { name: "Rent", value: 25000, color: "hsl(var(--primary))" },
    { name: "Transport", value: 8000, color: "hsl(var(--secondary))" },
    { name: "Utilities", value: 6000, color: "hsl(var(--accent))" },
    { name: "Stock", value: 35000, color: "hsl(var(--muted))" },
    { name: "Others", value: 12000, color: "hsl(var(--destructive))" },
  ];

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome Back!</h1>
          <p className="text-muted-foreground">Here's what's happening with your business today</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6 shadow-card hover:shadow-elevated transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-${stat.color}-light`}>
                <stat.icon className={`h-6 w-6 text-${stat.color}`} />
              </div>
              {stat.trend === "up" && (
                <TrendingUp className="h-5 w-5 text-secondary" />
              )}
              {stat.trend === "down" && (
                <TrendingDown className="h-5 w-5 text-destructive" />
              )}
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className={`text-sm mt-1 ${
                stat.trend === "up" ? "text-secondary" : 
                stat.trend === "down" ? "text-destructive" : 
                "text-muted-foreground"
              }`}>
                {stat.change}
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 shadow-card">
          <h3 className="text-xl font-bold mb-4">Weekly Sales</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip 
                formatter={(value) => `₦${value.toLocaleString()}`}
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }}
              />
              <Bar dataKey="sales" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 shadow-card">
          <h3 className="text-xl font-bold mb-4">Expense Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={expensesData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {expensesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => `₦${value.toLocaleString()}`}
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6 shadow-card">
        <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 rounded-xl bg-primary-light hover:bg-primary hover:text-primary-foreground transition-all text-left">
            <Package className="h-6 w-6 mb-2 text-primary" />
            <p className="font-medium">Add Product</p>
          </button>
          <button className="p-4 rounded-xl bg-secondary-light hover:bg-secondary hover:text-secondary-foreground transition-all text-left">
            <TrendingUp className="h-6 w-6 mb-2 text-secondary" />
            <p className="font-medium">Record Sale</p>
          </button>
          <button className="p-4 rounded-xl bg-accent-light hover:bg-accent hover:text-accent-foreground transition-all text-left">
            <Users className="h-6 w-6 mb-2 text-accent" />
            <p className="font-medium">Add Customer</p>
          </button>
          <button className="p-4 rounded-xl bg-muted hover:bg-primary hover:text-primary-foreground transition-all text-left">
            <Receipt className="h-6 w-6 mb-2 text-primary" />
            <p className="font-medium">Log Expense</p>
          </button>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
