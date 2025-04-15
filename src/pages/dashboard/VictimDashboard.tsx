
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, MessageSquare, Users, ArrowRight, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

// Mock data for demonstration
const mockCases = [
  {
    id: "case-1",
    title: "Family Property Dispute",
    description: "Seeking advice on property inheritance rights after father's passing.",
    status: "in-progress",
    date: "2025-04-10",
    assignedTo: "John Smith (Intern)",
  },
  {
    id: "case-2",
    title: "Domestic Violence Protection",
    description: "Need guidance on restraining order and legal protection options.",
    status: "pending",
    date: "2025-04-05",
    assignedTo: "Pending assignment",
  },
];

const VictimDashboard = () => {
  const navigate = useNavigate();
  const [cases] = useState(mockCases);

  return (
    <DashboardLayout userRole="victim">
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <h1 className="text-2xl font-semibold tracking-tight">Family Member Dashboard</h1>
          <Button 
            className="bg-law-600 hover:bg-law-700 text-white"
            onClick={() => navigate("/dashboard/new-case")}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Submit New Case
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">Active Cases</CardTitle>
              <FileText className="h-4 w-4 text-law-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{cases.length}</div>
              <p className="text-xs text-gray-500">Cases in progress</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">Messages</CardTitle>
              <MessageSquare className="h-4 w-4 text-law-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-gray-500">Unread messages</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">Lawyer Directory</CardTitle>
              <Users className="h-4 w-4 text-law-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">25+</div>
              <p className="text-xs text-gray-500">Available lawyers in your area</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full" onClick={() => navigate("/directory")}>
                View Lawyers
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <h2 className="text-xl font-semibold tracking-tight mt-6">My Cases</h2>
        <div className="space-y-4">
          {cases.map((caseItem) => (
            <Card key={caseItem.id} className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">{caseItem.title}</CardTitle>
                  <Badge variant={caseItem.status === "in-progress" ? "default" : "secondary"}>
                    {caseItem.status === "in-progress" ? "In Progress" : "Pending"}
                  </Badge>
                </div>
                <CardDescription>Submitted on {caseItem.date}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{caseItem.description}</p>
                <p className="text-sm font-semibold mt-2">Assigned to: {caseItem.assignedTo}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" onClick={() => navigate(`/dashboard/cases/${caseItem.id}`)}>
                  View Details
                </Button>
                <Button variant="secondary" size="sm">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Message
                </Button>
              </CardFooter>
            </Card>
          ))}
          
          {cases.length === 0 && (
            <Card className="bg-white shadow-sm">
              <CardContent className="text-center py-6">
                <p className="text-gray-500">You don't have any active cases yet.</p>
                <Button 
                  className="mt-4 bg-law-600 hover:bg-law-700 text-white"
                  onClick={() => navigate("/dashboard/new-case")}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Submit New Case
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default VictimDashboard;
