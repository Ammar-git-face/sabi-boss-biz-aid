import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface Product {
  id: number;
  name: string;
  quantity: number;
  price: number;
  cost: number;
}

const Inventory = () => {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "Rice (50kg)", quantity: 15, price: 35000, cost: 28000 },
    { id: 2, name: "Cooking Oil (5L)", quantity: 30, price: 8500, cost: 7000 },
    { id: 3, name: "Tomato Paste", quantity: 45, price: 450, cost: 350 },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({ name: "", quantity: 0, price: 0, cost: 0 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? { ...editingProduct, ...formData } : p));
    } else {
      setProducts([...products, { id: Date.now(), ...formData }]);
    }
    setIsOpen(false);
    setFormData({ name: "", quantity: 0, price: 0, cost: 0 });
    setEditingProduct(null);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData(product);
    setIsOpen(true);
  };

  const handleDelete = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Inventory</h1>
          <p className="text-muted-foreground">Manage your products and stock</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary shadow-soft">
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Product Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Rice (50kg)"
                  required
                />
              </div>
              <div>
                <Label>Quantity</Label>
                <Input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
                  placeholder="0"
                  required
                />
              </div>
              <div>
                <Label>Selling Price (₦)</Label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
                  placeholder="0"
                  required
                />
              </div>
              <div>
                <Label>Cost Price (₦)</Label>
                <Input
                  type="number"
                  value={formData.cost}
                  onChange={(e) => setFormData({ ...formData, cost: parseInt(e.target.value) })}
                  placeholder="0"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-gradient-primary">
                {editingProduct ? "Update Product" : "Add Product"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="p-6 shadow-card hover:shadow-elevated transition-all">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-lg">{product.name}</h3>
                <p className="text-sm text-muted-foreground">Quantity: {product.quantity}</p>
              </div>
              <div className="flex space-x-2">
                <Button size="icon" variant="ghost" onClick={() => handleEdit(product)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" onClick={() => handleDelete(product.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Selling Price:</span>
                <span className="font-semibold">₦{product.price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Cost Price:</span>
                <span className="font-semibold">₦{product.cost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pt-2 border-t">
                <span className="text-muted-foreground">Profit per unit:</span>
                <span className="font-semibold text-secondary">₦{(product.price - product.cost).toLocaleString()}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Inventory;
