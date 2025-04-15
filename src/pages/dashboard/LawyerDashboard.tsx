import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, MessageSquare, UserCircle, ArrowRight, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

// Mock data for demonstration
const mockCases = [
  {
    id: "case-3",
    title: "Child Custody Dispute",
    description: "Escalated from intern. Complex case involving interstate custody rights.",
    status: "escalated",
    date: "2025-04-08",
    client: "Sarah Wilson",
    escalatedBy: "Maria Garcia (Intern)",
    urgency: "high",
  },
  {
    id: "case-4",
    title: "Assault Victim Representation",
    description: "Escalated case requiring legal representation for assault victim.",
    status: "escalated",
    date: "2025-04-01",
    client: "James Rodriguez",
    escalatedBy: "John Smith (Intern)",
    urgency: "high",
  },
];

const LawyerDashboard = () => {
  const navigate = useNavigate();
  const [cases] = useState(mockCases);
  
  return (
    <DashboardLayout userRole="lawyer">
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <h1 className="text-2xl font-semibold tracking-tight">Lawyer Dashboard</h1>
          <Button 
            variant="outline"
            className="border-law-600 text-law-600 hover:bg-law-50"
            onClick={() => navigate("/dashboard/profile")}
          >
            <UserCircle className="mr-2 h-4 w-4" />
            Update Profile
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">Assigned Cases</CardTitle>
              <FileText className="h-4 w-4 text-law-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-gray-500">Active cases under your management</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">Messages</CardTitle>
              <MessageSquare className="h-4 w-4 text-law-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-gray-500">Unread messages from clients and interns</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">Escalated Cases</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{cases.length}</div>
              <p className="text-xs text-gray-500">Cases escalated by interns</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full" onClick={() => navigate("/dashboard/escalated")}>
                Review Cases
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <h2 className="text-xl font-semibold tracking-tight mt-6">Escalated Cases</h2>
        <div className="space-y-4">
          {cases.map((caseItem) => (
            <Card key={caseItem.id} className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">{caseItem.title}</CardTitle>
                  <Badge variant="destructive">
                    High Urgency
                  </Badge>
                </div>
                <CardDescription>Escalated on {caseItem.date}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{caseItem.description}</p>
                <p className="text-sm mt-2">Client: <span className="font-semibold">{caseItem.client}</span></p>
                <p className="text-sm">Escalated by: <span className="font-semibold">{caseItem.escalatedBy}</span></p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" onClick={() => navigate(`/dashboard/cases/${caseItem.id}`)}>
                  View Details
                </Button>
                <div className="space-x-2">
                  <Button variant="secondary" size="sm">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Message Intern
                  </Button>
                  <Button className="bg-law-600 hover:bg-law-700 text-white" size="sm">
                    Accept Case
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
          
          {cases.length === 0 && (
            <Card className="bg-white shadow-sm">
              <CardContent className="text-center py-6">
                <p className="text-gray-500">There are no escalated cases at the moment.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LawyerDashboard;
