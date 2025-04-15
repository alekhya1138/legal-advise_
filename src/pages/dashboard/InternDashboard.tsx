
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Phone, FileText, CheckCircle, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Mock data for case requests
const mockRequests = [
  {
    id: "req-1",
    title: "Property Inheritance Dispute",
    description: "Need legal advice regarding family property distribution",
    clientName: "Arjun Reddy",
    submittedDate: "2025-04-15",
    status: "pending"
  },
  {
    id: "req-2",
    title: "Domestic Issue Consultation",
    description: "Seeking guidance on marital dispute resolution",
    clientName: "Priya Sharma",
    submittedDate: "2025-04-14",
    status: "pending"
  }
];

// Mock data for assigned cases
const mockAssignedCases = [
  {
    id: "case-1",
    title: "Family Property Division",
    clientName: "Ravi Kumar",
    status: "in-progress",
    startDate: "2025-03-01",
    lastUpdate: "2025-04-15",
    nextAction: "Document Review"
  },
  {
    id: "case-2",
    title: "Marriage Registration",
    clientName: "Lakshmi Devi",
    status: "completed",
    startDate: "2025-02-15",
    completionDate: "2025-03-30",
    outcome: "Successfully registered"
  }
];

const InternDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [requests, setRequests] = useState(mockRequests);
  const [assignedCases, setAssignedCases] = useState(mockAssignedCases);

  const handleAcceptRequest = (requestId: string) => {
    setRequests(prev => prev.filter(req => req.id !== requestId));
    toast({
      title: "Request Accepted",
      description: "You can now communicate with the client",
    });
  };

  const handleRejectRequest = (requestId: string) => {
    setRequests(prev => prev.filter(req => req.id !== requestId));
    toast({
      description: "Request rejected",
    });
  };

  return (
    <DashboardLayout userRole="intern">
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold tracking-tight">Intern Dashboard</h1>

        <Tabs defaultValue="requests" className="space-y-4">
          <TabsList>
            <TabsTrigger value="requests">New Requests ({requests.length})</TabsTrigger>
            <TabsTrigger value="assigned">Assigned Cases</TabsTrigger>
            <TabsTrigger value="previous">Previous Cases</TabsTrigger>
          </TabsList>

          <TabsContent value="requests" className="space-y-4">
            {requests.map(request => (
              <Card key={request.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{request.title}</CardTitle>
                      <CardDescription>From {request.clientName}</CardDescription>
                    </div>
                    <Badge>New Request</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{request.description}</p>
                  <p className="text-sm text-gray-500 mt-2">Submitted on {request.submittedDate}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => handleRejectRequest(request.id)}>
                    <XCircle className="mr-2 h-4 w-4" />
                    Reject
                  </Button>
                  <Button onClick={() => handleAcceptRequest(request.id)}>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Accept
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="assigned" className="space-y-4">
            {assignedCases.filter(c => c.status === 'in-progress').map(caseItem => (
              <Card key={caseItem.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{caseItem.title}</CardTitle>
                      <CardDescription>Client: {caseItem.clientName}</CardDescription>
                    </div>
                    <Badge variant="default">Active</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm">Started: {caseItem.startDate}</p>
                    <p className="text-sm">Last Update: {caseItem.lastUpdate}</p>
                    <p className="text-sm">Next Action: {caseItem.nextAction}</p>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button variant="secondary" onClick={() => navigate(`/chat/${caseItem.id}`)}>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Message Client
                  </Button>
                  <Button variant="outline">
                    <Phone className="mr-2 h-4 w-4" />
                    Call Client
                  </Button>
                  <Button variant="outline">
                    <FileText className="mr-2 h-4 w-4" />
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="previous" className="space-y-4">
            {assignedCases.filter(c => c.status === 'completed').map(caseItem => (
              <Card key={caseItem.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{caseItem.title}</CardTitle>
                      <CardDescription>Client: {caseItem.clientName}</CardDescription>
                    </div>
                    <Badge variant="secondary">Completed</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm">Started: {caseItem.startDate}</p>
                    <p className="text-sm">Completed: {caseItem.completionDate}</p>
                    <p className="text-sm">Outcome: {caseItem.outcome}</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline">
                    <FileText className="mr-2 h-4 w-4" />
                    View Case History
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default InternDashboard;
