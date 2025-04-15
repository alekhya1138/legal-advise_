
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const caseTypes = [
  { value: "family", label: "Family Dispute" },
  { value: "domestic-violence", label: "Domestic Violence" },
  { value: "property", label: "Property Dispute" },
  { value: "custody", label: "Child Custody" },
  { value: "divorce", label: "Divorce" },
  { value: "assault", label: "Assault" },
  { value: "other", label: "Other" },
];

const urgencyLevels = [
  { value: "low", label: "Low - Can wait (within weeks)" },
  { value: "medium", label: "Medium - Needs attention soon (within days)" },
  { value: "high", label: "High - Urgent (immediate attention)" },
];

const CaseSubmission = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    caseType: "",
    description: "",
    urgency: "",
    location: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Here you would normally submit to your API
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Case submitted successfully",
        description: "An intern will be assigned to your case shortly",
      });
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <DashboardLayout userRole="victim">
      <div className="max-w-3xl mx-auto animate-fade-in">
        <h1 className="text-2xl font-semibold text-law-800 mb-6">Submit a New Case</h1>
        
        <Card className="bg-white shadow-md">
          <CardHeader className="bg-law-50 border-b">
            <CardTitle>Case Information</CardTitle>
            <CardDescription>
              Please provide details about your case to help us assign the right intern to assist you.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-2">
                <Label htmlFor="title">Case Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="E.g., Family Property Inheritance Dispute"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="caseType">Case Type</Label>
                <Select
                  value={formData.caseType}
                  onValueChange={(value) => handleSelectChange("caseType", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select case type" />
                  </SelectTrigger>
                  <SelectContent>
                    {caseTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Case Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Please describe your situation in detail..."
                  value={formData.description}
                  onChange={handleChange}
                  rows={6}
                  required
                  className="resize-none"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="urgency">Urgency Level</Label>
                  <Select
                    value={formData.urgency}
                    onValueChange={(value) => handleSelectChange("urgency", value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select urgency" />
                    </SelectTrigger>
                    <SelectContent>
                      {urgencyLevels.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Your Location</Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="City, State"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50 border-t flex justify-between py-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/dashboard")}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-law-600 hover:bg-law-700 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Case"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CaseSubmission;
