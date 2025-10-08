import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Store, Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "Adebayo Ogunleye",
    businessName: "Ade's General Store",
    email: "adebayo@email.com",
    phone: "08012345678",
    address: "123 Market Street, Lagos",
  });

  const handleSave = () => {
    // Save profile logic
    console.log("Profile saved:", profile);
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold">Profile Settings</h1>
        <p className="text-muted-foreground">Manage your business information</p>
      </div>

      <Card className="p-6 shadow-card">
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full bg-gradient-primary flex items-center justify-center mb-4">
            <span className="text-4xl font-bold text-primary-foreground">
              {profile.name.charAt(0)}
            </span>
          </div>
          <Button variant="outline">Change Photo</Button>
        </div>

        <div className="space-y-4">
          <div>
            <Label className="flex items-center space-x-2 mb-2">
              <User className="h-4 w-4" />
              <span>Full Name</span>
            </Label>
            <Input
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
          </div>

          <div>
            <Label className="flex items-center space-x-2 mb-2">
              <Store className="h-4 w-4" />
              <span>Business Name</span>
            </Label>
            <Input
              value={profile.businessName}
              onChange={(e) => setProfile({ ...profile, businessName: e.target.value })}
            />
          </div>

          <div>
            <Label className="flex items-center space-x-2 mb-2">
              <Mail className="h-4 w-4" />
              <span>Email Address</span>
            </Label>
            <Input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            />
          </div>

          <div>
            <Label className="flex items-center space-x-2 mb-2">
              <Phone className="h-4 w-4" />
              <span>Phone Number</span>
            </Label>
            <Input
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            />
          </div>

          <div>
            <Label className="flex items-center space-x-2 mb-2">
              <MapPin className="h-4 w-4" />
              <span>Business Address</span>
            </Label>
            <Input
              value={profile.address}
              onChange={(e) => setProfile({ ...profile, address: e.target.value })}
            />
          </div>
        </div>

        <Button className="w-full mt-6 bg-gradient-primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Card>

      <Card className="p-6 shadow-card">
        <h3 className="font-bold text-lg mb-4">Change Password</h3>
        <div className="space-y-4">
          <div>
            <Label>Current Password</Label>
            <Input type="password" placeholder="Enter current password" />
          </div>
          <div>
            <Label>New Password</Label>
            <Input type="password" placeholder="Enter new password" />
          </div>
          <div>
            <Label>Confirm Password</Label>
            <Input type="password" placeholder="Confirm new password" />
          </div>
          <Button className="w-full bg-accent">Update Password</Button>
        </div>
      </Card>
    </div>
  );
};

export default Profile;
