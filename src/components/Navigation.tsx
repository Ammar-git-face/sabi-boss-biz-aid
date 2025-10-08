import { NavLink } from "react-router-dom";
import { Home, Package, ShoppingCart, Receipt, Users, Wallet, Lightbulb, User, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export const Navigation = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDark]);

  const navItems = [
    { to: "/", icon: Home, label: "Dashboard" },
    { to: "/inventory", icon: Package, label: "Inventory" },
    { to: "/sales", icon: ShoppingCart, label: "Sales" },
    { to: "/expenses", icon: Receipt, label: "Expenses" },
    { to: "/customers", icon: Users, label: "Customers" },
    { to: "/loans", icon: Wallet, label: "Loans" },
    { to: "/tips", icon: Lightbulb, label: "Tips" },
    { to: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block bg-card border-b shadow-soft sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-foreground">S</span>
              </div>
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                SabiBoss
              </span>
            </div>
            
            <div className="flex items-center space-x-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end
                  className={({ isActive }) =>
                    `flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-soft"
                        : "text-muted-foreground hover:bg-muted"
                    }`
                  }
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              ))}
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsDark(!isDark)}
                className="ml-2"
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden bg-card border-b shadow-soft sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 h-16">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <span className="text-2xl font-bold text-primary-foreground">S</span>
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              SabiBoss
            </span>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsDark(!isDark)}
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t shadow-elevated z-50">
        <div className="grid grid-cols-4 gap-1 px-2 py-2">
          {navItems.slice(0, 4).map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end
              className={({ isActive }) =>
                `flex flex-col items-center justify-center py-2 rounded-lg transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground"
                }`
              }
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs mt-1">{item.label}</span>
            </NavLink>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-1 px-2 pb-2">
          {navItems.slice(4).map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end
              className={({ isActive }) =>
                `flex flex-col items-center justify-center py-2 rounded-lg transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground"
                }`
              }
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs mt-1">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
};
