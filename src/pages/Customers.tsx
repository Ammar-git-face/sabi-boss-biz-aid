import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Users, Phone, Mail } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface Customer {
  id: number;
  name: string;
  phone: string;
  email: string;
  totalPurchases: number;
  lastVisit: string;
}

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([
    { id: 1, name: "Adeola Johnson", phone: "0801234567", email: "adeola@email.com", totalPurchases: 125000, lastVisit: "2025-01-08" },
    { id: 2, name: "Chidi Okonkwo", phone: "0809876543", email: "chidi@email.com", totalPurchases: 95000, lastVisit: "2025-01-07" },
    { id: 3, name: "Fatima Bello", phone: "0807654321", email: "fatima@email.com", totalPurchases: 78000, lastVisit: "2025-01-06" },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCustomers([...customers, { 
      id: Date.now(), 
      ...formData, 
      totalPurchases: 0,
      lastVisit: new Date().toISOString().split('T')[0]
    }]);
    setIsOpen(false);
    setFormData({ name: "", phone: "", email: "" });
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Customers</h1>
          <p className="text-muted-foreground">Manage your customer database</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary shadow-soft">
              <Plus className="h-4 w-4 mr-2" />
              Add Customer
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Customer</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Full Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., John Doe"
                  required
                />
              </div>
              <div>
                <Label>Phone Number</Label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="08012345678"
                  required
                />
              </div>
              <div>
                <Label>Email Address</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="customer@email.com"
                />
              </div>
              <Button type="submit" className="w-full bg-gradient-primary">
                Add Customer
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="p-6 shadow-card bg-secondary-light">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-xl bg-secondary flex items-center justify-center">
            <Users className="h-8 w-8 text-secondary-foreground" />
          </div>
          <div>
            <h3 className="text-lg text-muted-foreground">Total Customers</h3>
            <p className="text-4xl font-bold">{customers.length}</p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {customers.map((customer) => (
          <Card key={customer.id} className="p-6 shadow-card hover:shadow-elevated transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center">
                <span className="text-xl font-bold text-primary">
                  {customer.name.charAt(0)}
                </span>
              </div>
            </div>
            <h3 className="font-bold text-lg mb-2">{customer.name}</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center text-muted-foreground">
                <Phone className="h-4 w-4 mr-2" />
                {customer.phone}
              </div>
              <div className="flex items-center text-muted-foreground">
                <Mail className="h-4 w-4 mr-2" />
                {customer.email}
              </div>
            </div>
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between mb-1">
                <span className="text-sm text-muted-foreground">Total Purchases:</span>
                <span className="font-semibold">₦{customer.totalPurchases.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Last Visit:</span>
                <span className="text-sm">{customer.lastVisit}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Customers;
