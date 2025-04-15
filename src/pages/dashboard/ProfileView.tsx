
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Phone, ChevronLeft, Star, MapPin, Briefcase, GraduationCap } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Mock profiles data
const mockProfiles = {
  "intern-1": {
    id: "intern-1",
    name: "John Smith",
    role: "intern",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    location: "Boston, MA",
    expertise: ["Family Law", "Property Law", "Inheritance"],
    experience: "2 years as law intern",
    education: "JD Candidate, Harvard Law School",
    bio: "I'm a dedicated law intern specializing in family law and property disputes. Currently in my final year at Harvard Law School, I've been helping families navigate legal challenges for the past 2 years.",
    languages: ["English", "Spanish"],
    availability: "Mon-Fri, 9AM-5PM",
    rating: 4.8,
    reviewCount: 24
  },
  "intern-2": {
    id: "intern-2",
    name: "Maria Garcia",
    role: "intern",
    email: "maria.garcia@example.com",
    phone: "+1 (555) 234-5678",
    location: "Los Angeles, CA",
    expertise: ["Family Law", "Child Custody", "Domestic Violence"],
    experience: "3 years as law intern",
    education: "JD Candidate, UCLA School of Law",
    bio: "Passionate about helping families navigate legal challenges, especially in sensitive cases involving children. My background in psychology helps me approach cases with both legal knowledge and empathy.",
    languages: ["English", "Spanish", "Portuguese"],
    availability: "Mon-Thu, 10AM-6PM",
    rating: 4.9,
    reviewCount: 37
  },
  "lawyer-1": {
    id: "lawyer-1",
    name: "Robert Davis",
    role: "lawyer",
    email: "robert.davis@example.com",
    phone: "+1 (555) 345-6789",
    location: "Chicago, IL",
    expertise: ["Family Law", "Child Custody", "Divorce", "Mediation"],
    experience: "15 years practicing Family Law",
    education: "JD, Stanford Law School",
    bio: "Seasoned family law attorney with 15 years of experience helping families navigate complex legal situations. Specialized in interstate custody cases and high-conflict divorces. Certified mediator.",
    languages: ["English", "French"],
    availability: "Mon-Fri, 8AM-6PM",
    rating: 4.7,
    reviewCount: 156,
    barAssociation: "Illinois State Bar Association",
    certifications: ["Certified Family Law Specialist", "Certified Mediator"]
  },
  "lawyer-2": {
    id: "lawyer-2",
    name: "Patricia Chen",
    role: "lawyer",
    email: "patricia.chen@example.com",
    phone: "+1 (555) 456-7890",
    location: "New York, NY",
    expertise: ["Criminal Law", "Victim Representation", "Domestic Violence"],
    experience: "12 years practicing Criminal Law",
    education: "JD, Columbia Law School",
    bio: "Dedicated criminal defense attorney with particular focus on helping victims of domestic violence and assault. Former prosecutor with unique insight into both sides of the criminal justice system.",
    languages: ["English", "Mandarin", "Cantonese"],
    availability: "Mon-Sat, 9AM-7PM",
    rating: 4.9,
    reviewCount: 128,
    barAssociation: "New York State Bar Association",
    certifications: ["Certified Criminal Law Specialist", "Victims' Rights Advocate"]
  }
};

const ProfileView = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch profile data
    setTimeout(() => {
      if (userId && mockProfiles[userId as keyof typeof mockProfiles]) {
        setProfile(mockProfiles[userId as keyof typeof mockProfiles]);
      }
      setLoading(false);
    }, 1000);
  }, [userId]);

  const handleContact = () => {
    if (profile) {
      navigate(`/chat/${profile.id}`);
    }
  };

  const handleCall = () => {
    // In a real app, this would trigger a call functionality
    alert(`Calling ${profile?.name}...`);
  };

  if (loading) {
    return (
      <DashboardLayout userRole="victim">
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">Loading profile...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!profile) {
    return (
      <DashboardLayout userRole="victim">
        <div className="flex flex-col items-center justify-center h-full">
          <h2 className="text-xl font-semibold text-gray-800">Profile Not Found</h2>
          <p className="text-gray-500 mt-2">The profile you're looking for doesn't exist or you don't have access.</p>
          <Button className="mt-4" onClick={() => navigate("/dashboard")}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Return to Dashboard
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userRole="victim">
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <h1 className="text-2xl font-semibold tracking-tight">Profile</h1>
        </div>

        <Card className="border-none shadow-md">
          <CardHeader className="pb-2">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="text-xl bg-blue-100 text-blue-700">
                    {profile.name.split(' ').map((n: string) => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-xl">{profile.name}</CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                    {profile.location}
                  </CardDescription>
                  <div className="flex items-center mt-1">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-sm font-medium">{profile.rating}</span>
                    <span className="text-sm text-gray-500 ml-1">({profile.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-3">
                <Button onClick={handleContact}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Message
                </Button>
                <Button variant="outline" onClick={handleCall}>
                  <Phone className="mr-2 h-4 w-4" />
                  Call
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div>
              <h3 className="text-lg font-medium mb-2">About</h3>
              <p className="text-gray-700">{profile.bio}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.expertise.map((item: string) => (
                    <Badge key={item} variant="secondary" className="px-3 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.languages.map((language: string) => (
                    <Badge key={language} variant="outline" className="px-3 py-1">
                      {language}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-start">
                  <Briefcase className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900">Experience</h4>
                    <p className="text-gray-700">{profile.experience}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <GraduationCap className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900">Education</h4>
                    <p className="text-gray-700">{profile.education}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {profile.role === "lawyer" && (
                  <>
                    <div>
                      <h4 className="font-medium text-gray-900">Bar Association</h4>
                      <p className="text-gray-700">{profile.barAssociation}</p>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900">Certifications</h4>
                      <ul className="list-disc list-inside text-gray-700">
                        {profile.certifications.map((cert: string) => (
                          <li key={cert}>{cert}</li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}

                <div>
                  <h4 className="font-medium text-gray-900">Availability</h4>
                  <p className="text-gray-700">{profile.availability}</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-6">
            <div className="w-full flex flex-col sm:flex-row sm:justify-between gap-3">
              <div>
                <p className="text-sm text-gray-500">
                  Contact Information: {profile.email} | {profile.phone}
                </p>
              </div>
              <Button variant="link" className="text-blue-600" onClick={() => alert("Viewing reviews")}>
                View all {profile.reviewCount} reviews
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ProfileView;
