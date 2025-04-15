
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Phone, User, Calendar, FileText, ChevronLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for demonstration
const mockCaseDetails = {
  "case-1": {
    id: "case-1",
    title: "Family Property Dispute",
    description: "Seeking advice on property inheritance rights after father's passing. Need to understand legal options for resolving disputes with siblings over property division.",
    status: "in-progress",
    date: "2025-04-10",
    client: "David Johnson",
    assignedTo: {
      id: "intern-1",
      name: "John Smith",
      role: "intern",
      expertise: ["Family Law", "Property Law"],
      experience: "2 years as law intern",
      education: "JD Candidate, Harvard Law School",
    },
    updates: [
      { date: "2025-04-10", text: "Case submitted and assigned to intern" },
      { date: "2025-04-12", text: "Initial consultation completed" },
      { date: "2025-04-14", text: "Legal options document shared" }
    ]
  },
  "case-2": {
    id: "case-2",
    title: "Domestic Violence Protection",
    description: "Need guidance on restraining order and legal protection options. Urgent assistance required for safety concerns.",
    status: "pending",
    date: "2025-04-05",
    client: "Emily Wilson",
    assignedTo: null,
    updates: [
      { date: "2025-04-05", text: "Case submitted, awaiting assignment" }
    ]
  },
  "case-3": {
    id: "case-3",
    title: "Child Custody Dispute",
    description: "Escalated from intern. Complex case involving interstate custody rights. Need expert guidance on navigating multiple state jurisdictions.",
    status: "escalated",
    date: "2025-04-08",
    client: "Sarah Wilson",
    assignedTo: {
      id: "lawyer-1",
      name: "Robert Davis",
      role: "lawyer",
      expertise: ["Family Law", "Child Custody"],
      experience: "15 years practicing Family Law",
      education: "JD, Stanford Law School",
    },
    escalatedBy: {
      id: "intern-2",
      name: "Maria Garcia",
      role: "intern"
    },
    updates: [
      { date: "2025-04-08", text: "Case submitted and assigned to intern" },
      { date: "2025-04-09", text: "Initial consultation completed" },
      { date: "2025-04-10", text: "Case escalated to lawyer due to complexity" },
      { date: "2025-04-11", text: "Lawyer accepted case" }
    ]
  },
  "case-4": {
    id: "case-4",
    title: "Assault Victim Representation",
    description: "Escalated case requiring legal representation for assault victim. Need guidance on pressing charges and civil suit options.",
    status: "escalated",
    date: "2025-04-01",
    client: "James Rodriguez",
    assignedTo: {
      id: "lawyer-2",
      name: "Patricia Chen",
      role: "lawyer",
      expertise: ["Criminal Law", "Victim Representation"],
      experience: "12 years practicing Criminal Law",
      education: "JD, Columbia Law School",
    },
    escalatedBy: {
      id: "intern-1",
      name: "John Smith",
      role: "intern"
    },
    updates: [
      { date: "2025-04-01", text: "Case submitted and assigned to intern" },
      { date: "2025-04-02", text: "Initial consultation completed" },
      { date: "2025-04-03", text: "Case escalated to lawyer due to severity" },
      { date: "2025-04-04", text: "Lawyer accepted case" }
    ]
  }
};

const CaseDetails = () => {
  const { caseId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [caseDetails, setCaseDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch case details
    setTimeout(() => {
      if (caseId && mockCaseDetails[caseId as keyof typeof mockCaseDetails]) {
        setCaseDetails(mockCaseDetails[caseId as keyof typeof mockCaseDetails]);
      }
      setLoading(false);
    }, 1000);
  }, [caseId]);

  const handleContactAssignee = () => {
    if (caseDetails?.assignedTo) {
      navigate(`/chat/${caseDetails.assignedTo.id}`);
    }
  };

  const handleCallAssignee = () => {
    toast({
      title: "Initiating call",
      description: `Calling ${caseDetails?.assignedTo?.name}...`,
    });
    // In a real app, this would trigger a call functionality
  };

  const handleViewProfile = () => {
    if (caseDetails?.assignedTo) {
      navigate(`/profile/${caseDetails.assignedTo.id}`);
    }
  };

  if (loading) {
    return (
      <DashboardLayout userRole="victim">
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">Loading case details...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!caseDetails) {
    return (
      <DashboardLayout userRole="victim">
        <div className="flex flex-col items-center justify-center h-full">
          <h2 className="text-xl font-semibold text-gray-800">Case Not Found</h2>
          <p className="text-gray-500 mt-2">The case you're looking for doesn't exist or you don't have access.</p>
          <Button className="mt-4" onClick={() => navigate("/dashboard")}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Return to Dashboard
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "in-progress":
        return <Badge>In Progress</Badge>;
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "escalated":
        return <Badge variant="destructive">Escalated</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <DashboardLayout userRole="victim">
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <h1 className="text-2xl font-semibold tracking-tight">Case Details</h1>
          {getStatusBadge(caseDetails.status)}
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl">{caseDetails.title}</CardTitle>
                <CardDescription>
                  Submitted on {caseDetails.date} by {caseDetails.client}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-800">Case Description</h3>
              <p className="mt-1 text-gray-700">{caseDetails.description}</p>
            </div>

            {caseDetails.assignedTo && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-2">
                  {caseDetails.assignedTo.role === "intern" ? "Assigned Intern" : "Assigned Lawyer"}
                </h3>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-700 font-bold">
                      {caseDetails.assignedTo.name.split(' ').map((n: string) => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold">{caseDetails.assignedTo.name}</p>
                    <p className="text-sm text-gray-600">
                      {caseDetails.assignedTo.expertise && caseDetails.assignedTo.expertise.join(", ")}
                    </p>
                  </div>
                </div>
                <div className="flex mt-4 space-x-2">
                  <Button size="sm" onClick={handleContactAssignee}>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Message
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleCallAssignee}>
                    <Phone className="mr-2 h-4 w-4" />
                    Call
                  </Button>
                  <Button size="sm" variant="secondary" onClick={handleViewProfile}>
                    <User className="mr-2 h-4 w-4" />
                    View Profile
                  </Button>
                </div>
              </div>
            )}

            {caseDetails.escalatedBy && (
              <div className="bg-red-50 p-4 rounded-lg">
                <h3 className="font-medium text-red-800 mb-2">Case Escalated</h3>
                <p className="text-sm text-gray-700">
                  This case was escalated by {caseDetails.escalatedBy.name} due to complexity or urgency.
                </p>
              </div>
            )}

            <div>
              <h3 className="font-medium text-gray-800 mb-2">Case Timeline</h3>
              <div className="space-y-3">
                {caseDetails.updates.map((update: any, index: number) => (
                  <div key={index} className="flex items-start">
                    <Calendar className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">{update.date}</p>
                      <p className="text-sm text-gray-600">{update.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-6">
            <div className="w-full flex justify-between">
              <Button variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Download Case Summary
              </Button>
              {caseDetails.status === "pending" ? (
                <Button className="bg-blue-600 hover:bg-blue-700">Check Assignment Status</Button>
              ) : (
                <Button className="bg-blue-600 hover:bg-blue-700">Request Update</Button>
              )}
            </div>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CaseDetails;
