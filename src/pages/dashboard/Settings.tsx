import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Save, LogOut, User, FileText, MessageSquare, Phone } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

// Mock data for user profile
const userProfile = {
  name: "Family Member",
  email: "user@example.com",
  phone: "+1 (555) 123-4567",
  location: "Hyderabad, Telangana",
  address: "123 Main Street, Hyderabad, Telangana 500001"
};

// Update the mock cases data to include more details
const userCases = [
  {
    id: "case-1",
    title: "Family Property Dispute",
    status: "in-progress",
    assignedIntern: "John Smith",
    assignedLawyer: null,
    description: "Seeking advice on property inheritance rights after father's passing",
    submittedDate: "2025-04-10",
    lastUpdated: "2025-04-14",
    nextHearing: "2025-05-01"
  },
  {
    id: "case-2",
    title: "Domestic Violence Protection",
    status: "pending",
    assignedIntern: null,
    assignedLawyer: null,
    description: "Need guidance on restraining order and legal protection options",
    submittedDate: "2025-04-05",
    lastUpdated: "2025-04-05",
    urgency: "High"
  }
];

const Settings = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: userProfile.name,
    email: userProfile.email,
    phone: userProfile.phone,
    location: userProfile.location,
    address: userProfile.address
  });
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    // In a real app, this would save to a database
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully",
    });
  };

  const handleLogout = () => {
    // In a real app, this would handle logout functionality
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/");
  };

  const viewCaseDetails = (caseId: string) => {
    navigate(`/dashboard/cases/${caseId}`);
  };

  return (
    <DashboardLayout userRole="victim">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        </div>

        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="location">Location</TabsTrigger>
            <TabsTrigger value="cases">My Cases</TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="space-y-4 animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your personal information and contact details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    name="phone" 
                    type="tel" 
                    value={formData.phone} 
                    onChange={handleChange} 
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setShowLogoutConfirm(true)}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log Out
                </Button>
                <Button onClick={handleSaveProfile}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="location" className="space-y-4 animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle>Location Information</CardTitle>
                <CardDescription>
                  Update your current location and address details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="location">City & State</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      id="location" 
                      name="location" 
                      value={formData.location} 
                      onChange={handleChange}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Full Address</Label>
                  <Textarea 
                    id="address" 
                    name="address" 
                    value={formData.address} 
                    onChange={handleChange}
                    rows={3} 
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveProfile} className="w-full">
                  <Save className="mr-2 h-4 w-4" />
                  Update Location
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="cases" className="space-y-4 animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle>My Legal Cases</CardTitle>
                <CardDescription>
                  Review your ongoing and past cases
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {userCases.length > 0 ? (
                  <div className="space-y-4">
                    {userCases.map((caseItem) => (
                      <div key={caseItem.id} className="border rounded-lg p-4 hover:bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">{caseItem.title}</h3>
                            <Badge variant={caseItem.status === 'in-progress' ? 'default' : 'secondary'}>
                              {caseItem.status === 'in-progress' ? 'In Progress' : 'Pending'}
                            </Badge>
                          </div>
                          <Button variant="outline" size="sm" onClick={() => viewCaseDetails(caseItem.id)}>
                            <FileText className="mr-2 h-4 w-4" />
                            View Details
                          </Button>
                        </div>
                        <div className="mt-4 space-y-2 text-sm text-gray-600">
                          <p><span className="font-semibold">Submitted:</span> {caseItem.submittedDate}</p>
                          <p><span className="font-semibold">Last Updated:</span> {caseItem.lastUpdated}</p>
                          {caseItem.nextHearing && (
                            <p><span className="font-semibold">Next Hearing:</span> {caseItem.nextHearing}</p>
                          )}
                          {caseItem.urgency && (
                            <p><span className="font-semibold">Urgency:</span> {caseItem.urgency}</p>
                          )}
                          <p className="mt-2">{caseItem.description}</p>
                        </div>
                        <div className="mt-4 pt-4 border-t">
                          <div className="space-y-2">
                            {caseItem.assignedIntern && (
                              <p className="flex items-center">
                                <User className="h-4 w-4 mr-2 text-gray-500" />
                                Assigned Intern: {caseItem.assignedIntern}
                              </p>
                            )}
                            {caseItem.assignedLawyer && (
                              <p className="flex items-center">
                                <User className="h-4 w-4 mr-2 text-gray-500" />
                                Assigned Lawyer: {caseItem.assignedLawyer}
                              </p>
                            )}
                          </div>
                          <div className="mt-4 flex gap-2">
                            <Button variant="secondary" size="sm">
                              <MessageSquare className="mr-2 h-4 w-4" />
                              Message
                            </Button>
                            <Button variant="outline" size="sm">
                              <Phone className="mr-2 h-4 w-4" />
                              Call
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">You don't have any active cases.</p>
                    <Button className="mt-4" onClick={() => navigate("/dashboard")}>
                      Submit a New Case
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Dialog open={showLogoutConfirm} onOpenChange={setShowLogoutConfirm}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Logout</DialogTitle>
              <DialogDescription>
                Are you sure you want to log out of your account?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowLogoutConfirm(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Log Out
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
