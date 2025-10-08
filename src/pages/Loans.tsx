import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, TrendingUp, PiggyBank, Calendar } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const Loans = () => {
  const loanData = {
    limit: 200000,
    borrowed: 50000,
    interest: 5,
    dueDate: "2025-01-23",
    monthlyPayment: 17500,
  };

  const savingsData = {
    goal: 100000,
    saved: 35000,
    weeklyTarget: 5000,
  };

  const availableCredit = loanData.limit - loanData.borrowed;
  const totalDue = loanData.borrowed + (loanData.borrowed * loanData.interest / 100);

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Loans & Savings</h1>
        <p className="text-muted-foreground">Manage your business finances</p>
      </div>

      {/* Loan Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Business Loan</h2>
        
        <Card className="p-6 shadow-card bg-gradient-primary text-primary-foreground">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm opacity-90">Available Credit</p>
              <p className="text-4xl font-bold">₦{availableCredit.toLocaleString()}</p>
            </div>
            <Wallet className="h-12 w-12 opacity-80" />
          </div>
          <Button variant="secondary" className="w-full">
            Request Loan
          </Button>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-6 shadow-card">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent-light flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Current Loan</p>
                <p className="text-2xl font-bold">₦{loanData.borrowed.toLocaleString()}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Interest Rate:</span>
                <span className="font-medium">{loanData.interest}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Due:</span>
                <span className="font-medium">₦{totalDue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Monthly Payment:</span>
                <span className="font-medium">₦{loanData.monthlyPayment.toLocaleString()}</span>
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-card">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Due Date</p>
                <p className="text-2xl font-bold">{loanData.dueDate}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground mb-2">Payment Progress</p>
              <Progress value={30} className="h-3" />
              <p className="text-xs text-muted-foreground mt-2">15 days remaining</p>
            </div>
          </Card>
        </div>
      </div>

      {/* Savings Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Savings Wallet</h2>
        
        <Card className="p-6 shadow-card bg-gradient-success text-secondary-foreground">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm opacity-90">Total Saved</p>
              <p className="text-4xl font-bold">₦{savingsData.saved.toLocaleString()}</p>
            </div>
            <PiggyBank className="h-12 w-12 opacity-80" />
          </div>
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Goal: ₦{savingsData.goal.toLocaleString()}</span>
              <span>{((savingsData.saved / savingsData.goal) * 100).toFixed(0)}%</span>
            </div>
            <Progress value={(savingsData.saved / savingsData.goal) * 100} className="h-3" />
          </div>
          <Button variant="secondary" className="w-full">
            Add to Savings
          </Button>
        </Card>

        <Card className="p-6 shadow-card">
          <h3 className="font-bold text-lg mb-4">Savings Plan</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
              <span className="font-medium">Weekly Target:</span>
              <span className="font-bold text-primary">₦{savingsData.weeklyTarget.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
              <span className="font-medium">Remaining to Goal:</span>
              <span className="font-bold text-secondary">₦{(savingsData.goal - savingsData.saved).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
              <span className="font-medium">Estimated Time:</span>
              <span className="font-medium">{Math.ceil((savingsData.goal - savingsData.saved) / savingsData.weeklyTarget)} weeks</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Loans;
