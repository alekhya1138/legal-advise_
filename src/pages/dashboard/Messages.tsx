import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, MessageSquare, MapPin, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock data for victims
const mockVictims = [
  {
    id: "victim-1",
    name: "Ramesh Kumar",
    avatar: "",
    caseType: "Property Dispute",
    location: "Hyderabad",
    about: "Seeking legal assistance for property inheritance matter",
    lastActive: "2 hours ago"
  },
  {
    id: "victim-2",
    name: "Lakshmi Devi",
    avatar: "",
    caseType: "Domestic Issue",
    location: "Vijayawada",
    about: "Need consultation regarding domestic matters",
    lastActive: "Just now"
  },
  {
    id: "victim-3",
    name: "Suresh Reddy",
    avatar: "",
    caseType: "Civil Case",
    location: "Guntur",
    about: "Looking for legal advice on civil dispute",
    lastActive: "1 day ago"
  }
];

// Mock intern data
const mockInterns = [
  {
    id: "intern-1",
    name: "Rajesh Kumar",
    avatar: "",
    expertise: ["Family Law", "Property Law"],
    experience: "2 years",
    location: "Delhi",
    about: "Law intern specializing in family and property disputes. Currently working with Legal Aid Society.",
    rating: 4.8,
    lastActive: "2 hours ago"
  },
  {
    id: "intern-2",
    name: "Priya Sharma",
    avatar: "",
    expertise: ["Criminal Law", "Domestic Violence"],
    experience: "3 years",
    location: "Mumbai",
    about: "Passionate about helping victims of domestic violence. Experience with NGOs working for women's rights.",
    rating: 4.7,
    lastActive: "Just now"
  },
  {
    id: "intern-3",
    name: "Arjun Reddy",
    avatar: "",
    expertise: ["Family Law", "Civil Rights"],
    experience: "1 year",
    location: "Hyderabad",
    about: "Focusing on civil rights cases. Working towards making legal help accessible to everyone.",
    rating: 4.5,
    lastActive: "1 day ago"
  },
  {
    id: "intern-4",
    name: "Meera Patel",
    avatar: "",
    expertise: ["Property Law", "Inheritance"],
    experience: "2 years",
    location: "Bangalore",
    about: "Specializing in inheritance and property law. Helping families resolve property disputes amicably.",
    rating: 4.9,
    lastActive: "3 hours ago"
  },
  {
    id: "intern-5",
    name: "Vikram Singh",
    avatar: "",
    expertise: ["Criminal Law", "Juvenile Justice"],
    experience: "4 years",
    location: "Chennai",
    about: "Working with juvenile offenders and their rehabilitation. Experience with juvenile justice system.",
    rating: 4.6,
    lastActive: "5 hours ago"
  },
  {
    id: "intern-6",
    name: "Ananya Desai",
    avatar: "",
    expertise: ["Family Law", "Divorce Cases"],
    experience: "2 years",
    location: "Pune",
    about: "Helping families navigate through divorce procedures. Focus on child custody and alimony cases.",
    rating: 4.7,
    lastActive: "Yesterday"
  },
  {
    id: "intern-7",
    name: "Ravi Verma",
    avatar: "",
    expertise: ["Corporate Law", "Startups"],
    experience: "3 years",
    location: "Kolkata",
    about: "Assisting startups with legal compliance and documentation. Experience with corporate law firms.",
    rating: 4.8,
    lastActive: "Just now"
  },
  {
    id: "intern-8",
    name: "Neha Gupta",
    avatar: "",
    expertise: ["Human Rights", "Refugee Law"],
    experience: "2 years",
    location: "Delhi",
    about: "Passionate about human rights. Experience working with refugees and displaced communities.",
    rating: 4.9,
    lastActive: "4 hours ago"
  },
  {
    id: "intern-9",
    name: "Karthik Rao",
    avatar: "",
    expertise: ["Environmental Law", "Public Interest"],
    experience: "2 years",
    location: "Hyderabad",
    about: "Working on environmental protection cases. Experience with public interest litigation.",
    rating: 4.5,
    lastActive: "2 days ago"
  }
];

// Mock lawyer data
const mockLawyers = [
  {
    id: "lawyer-1",
    name: "Adv. Venkatesh Naidu",
    avatar: "",
    specialty: "Family Law",
    location: "Hyderabad",
    experience: "15 years",
    casesHandled: 230,
    rating: 4.8,
    about: "Specializing in family law with focus on divorce, custody, and domestic violence cases.",
    distance: "2.5 km away",
  },
  {
    id: "lawyer-2",
    name: "Adv. Lakshmi Devi",
    avatar: "",
    specialty: "Criminal Law",
    location: "Vijayawada",
    experience: "12 years",
    casesHandled: 175,
    rating: 4.6,
    about: "Criminal defense attorney with special interest in helping victims of assault and domestic violence.",
    distance: "3.2 km away",
  },
  {
    id: "lawyer-3",
    name: "Adv. Suresh Babu",
    avatar: "",
    specialty: "Property Law",
    location: "Guntur",
    experience: "18 years",
    casesHandled: 310,
    rating: 4.9,
    about: "Expert in property disputes, inheritance matters, and real estate conflicts.",
    distance: "5.7 km away",
  },
  {
    id: "lawyer-4",
    name: "Adv. Ramya Krishna",
    avatar: "",
    specialty: "Family Law",
    location: "Tirupati",
    experience: "10 years",
    casesHandled: 150,
    rating: 4.7,
    about: "Specializing in divorce cases, child custody, and maintenance issues.",
    distance: "4.1 km away",
  },
  {
    id: "lawyer-5",
    name: "Adv. Prasad Reddy",
    avatar: "",
    specialty: "Criminal Law",
    location: "Vizag",
    experience: "14 years",
    casesHandled: 220,
    rating: 4.5,
    about: "Experienced in handling criminal cases with focus on victim representation.",
    distance: "6.3 km away",
  },
  {
    id: "lawyer-6",
    name: "Adv. Saroja Devi",
    avatar: "",
    specialty: "Family Law",
    location: "Warangal",
    experience: "16 years",
    casesHandled: 280,
    rating: 4.8,
    about: "Specializing in family law with particular expertise in domestic violence cases.",
    distance: "3.5 km away",
  },
  {
    id: "lawyer-7",
    name: "Adv. Gopala Krishna",
    avatar: "",
    specialty: "Property Law",
    location: "Nellore",
    experience: "20 years",
    casesHandled: 330,
    rating: 4.9,
    about: "Expert in property disputes and land acquisition matters.",
    distance: "7.2 km away",
  },
  {
    id: "lawyer-8",
    name: "Adv. Sunita Rani",
    avatar: "",
    specialty: "Family Law",
    location: "Kakinada",
    experience: "11 years",
    casesHandled: 170,
    rating: 4.6,
    about: "Focusing on family disputes, divorce, and custody battles.",
    distance: "5.1 km away",
  },
  {
    id: "lawyer-9",
    name: "Adv. Ravi Teja",
    avatar: "",
    specialty: "Criminal Law",
    location: "Rajahmundry",
    experience: "13 years",
    casesHandled: 190,
    rating: 4.7,
    about: "Criminal defense lawyer specializing in cases involving domestic disputes.",
    distance: "4.8 km away",
  },
  {
    id: "lawyer-10",
    name: "Adv. Sujatha Reddy",
    avatar: "",
    specialty: "Family Law",
    location: "Kurnool",
    experience: "15 years",
    casesHandled: 240,
    rating: 4.8,
    about: "Expert in family law matters including divorce, custody, and maintenance.",
    distance: "3.9 km away",
  },
  {
    id: "lawyer-11",
    name: "Adv. Krishna Murthy",
    avatar: "",
    specialty: "Property Law",
    location: "Anantapur",
    experience: "17 years",
    casesHandled: 260,
    rating: 4.7,
    about: "Specializing in property disputes, inheritance, and real estate matters.",
    distance: "6.5 km away",
  },
  {
    id: "lawyer-12",
    name: "Adv. Padma Lakshmi",
    avatar: "",
    specialty: "Family Law",
    location: "Kadapa",
    experience: "14 years",
    casesHandled: 210,
    rating: 4.8,
    about: "Family law expert with focus on women's rights and child custody.",
    distance: "4.3 km away",
  }
];

// Mock message history with interns
const mockMessageHistory = {
  "intern-1": [
    {
      id: 1,
      sender: "user",
      text: "Hello, I need help with a property inheritance issue.",
      timestamp: "2025-04-10T14:30:00"
    },
    {
      id: 2,
      sender: "intern-1",
      text: "Hello! I'd be happy to help. Could you provide more details about your situation?",
      timestamp: "2025-04-10T14:32:00"
    },
    {
      id: 3,
      sender: "user",
      text: "My father passed away recently and there's a dispute about his property among siblings.",
      timestamp: "2025-04-10T14:34:00"
    }
  ],
  "intern-5": [
    {
      id: 1,
      sender: "user",
      text: "Hi, I need advice regarding a juvenile case involving my nephew.",
      timestamp: "2025-04-09T10:15:00"
    },
    {
      id: 2,
      sender: "intern-5",
      text: "Hello. I specialize in juvenile justice. Can you share what happened?",
      timestamp: "2025-04-09T10:18:00"
    }
  ],
  "victim-1": [
    {
      id: 1,
      sender: "victim-1",
      text: "Hello, I need help with a property inheritance issue.",
      timestamp: "2025-04-10T14:30:00"
    },
    {
      id: 2,
      sender: "intern-1",
      text: "Hello! I'd be happy to help. Could you provide more details about your situation?",
      timestamp: "2025-04-10T14:32:00"
    },
    {
      id: 3,
      sender: "victim-1",
      text: "My father passed away recently and there's a dispute about his property among siblings.",
      timestamp: "2025-04-10T14:34:00"
    }
  ],
  "victim-2": [
    {
      id: 1,
      sender: "victim-2",
      text: "Hi, I need advice regarding a juvenile case involving my nephew.",
      timestamp: "2025-04-09T10:15:00"
    },
    {
      id: 2,
      sender: "intern-5",
      text: "Hello. I specialize in juvenile justice. Can you share what happened?",
      timestamp: "2025-04-09T10:18:00"
    }
  ],
  "lawyer-1": [
    {
      id: 1,
      sender: "victim-2",
      text: "Hi, I need advice regarding a juvenile case involving my nephew.",
      timestamp: "2025-04-09T10:15:00"
    },
    {
      id: 2,
      sender: "lawyer-1",
      text: "Hello. I specialize in juvenile justice. Can you share what happened?",
      timestamp: "2025-04-09T10:18:00"
    }
  ]
};

const Messages = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("victims");
  
  // Simulated current user role - in a real app, this would come from auth context
  const currentUserRole = "intern"; // This would be dynamic based on actual user role
  
  // Filter victims based on search term
  const filteredVictims = mockVictims.filter(
    victim => 
      victim.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      victim.caseType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      victim.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter interns based on search term
  const filteredInterns = mockInterns.filter(
    intern => 
      intern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      intern.expertise.some(exp => exp.toLowerCase().includes(searchTerm.toLowerCase())) ||
      intern.location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Filter lawyers based on search term
  const filteredLawyers = mockLawyers.filter(
    lawyer => 
      lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lawyer.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lawyer.location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Get contacts with message history - filtered by role
  const contactsWithMessages = Object.keys(mockMessageHistory)
    .filter(id => {
      if (currentUserRole === "intern") {
        return id.startsWith("victim-");
      }
      return true; // Victims can see all messages
    });
  
  const handleChat = (userId: string) => {
    navigate(`/chat/${userId}`);
  };
  
  const handleViewProfile = (id: string) => {
    navigate(`/profile/${id}`);
  };

  // Determine which tabs to show based on role
  const getTabs = () => {
    if (currentUserRole === "intern") {
      return (
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="victims">Victims</TabsTrigger>
          <TabsTrigger value="recent">Recent Messages</TabsTrigger>
        </TabsList>
      );
    }
    return (
      <TabsList className="grid w-full grid-cols-3 mb-6">
        <TabsTrigger value="interns">Interns</TabsTrigger>
        <TabsTrigger value="recent">Recent Messages</TabsTrigger>
        <TabsTrigger value="lawyers">Nearby Lawyers</TabsTrigger>
      </TabsList>
    );
  };

  return (
    <DashboardLayout userRole={currentUserRole}>
      <div className="space-y-6 animate-fade-in">
        <h1 className="text-2xl font-semibold tracking-tight">Messages & Consultations</h1>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder={`Search ${selectedTab}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Tabs defaultValue="victims" onValueChange={setSelectedTab}>
          {getTabs()}
          
          <TabsContent value="victims" className="space-y-4">
            {filteredVictims.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-500">No victims found matching your search criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredVictims.map((victim) => (
                  <Card key={victim.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Avatar>
                            <AvatarFallback className="bg-red-100 text-red-700">
                              {victim.name.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-base">{victim.name}</CardTitle>
                            <CardDescription className="text-xs">
                              {victim.caseType} • {victim.location}
                            </CardDescription>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-gray-600 line-clamp-2">{victim.about}</p>
                      <p className="text-xs text-gray-400 mt-2">Last active: {victim.lastActive}</p>
                    </CardContent>
                    <CardFooter className="pt-2 flex justify-between">
                      <Button variant="outline" size="sm" onClick={() => handleViewProfile(victim.id)}>
                        View Profile
                      </Button>
                      <Button size="sm" onClick={() => handleChat(victim.id)}>
                        <MessageSquare className="mr-1 h-4 w-4" />
                        Message
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          {currentUserRole !== "intern" && (
            <>
              <TabsContent value="interns" className="space-y-4">
                {filteredInterns.length === 0 ? (
                  <div className="text-center py-10">
                    <p className="text-gray-500">No interns found matching your search criteria.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredInterns.map((intern) => (
                      <Card key={intern.id} className="hover:shadow-md transition-shadow">
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Avatar>
                                <AvatarFallback className="bg-blue-100 text-blue-700">
                                  {intern.name.split(" ").map((n) => n[0]).join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <CardTitle className="text-base">{intern.name}</CardTitle>
                                <CardDescription className="text-xs">
                                  {intern.experience} • {intern.location}
                                </CardDescription>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <Star className="h-3.5 w-3.5 text-yellow-400 mr-1" />
                              <span className="text-sm font-medium">{intern.rating}</span>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="flex flex-wrap gap-1 mb-2">
                            {intern.expertise.map((exp) => (
                              <Badge key={exp} variant="secondary" className="text-xs">
                                {exp}
                              </Badge>
                            ))}
                          </div>
                          <p className="text-sm text-gray-600 line-clamp-2">{intern.about}</p>
                          <p className="text-xs text-gray-400 mt-2">Last active: {intern.lastActive}</p>
                        </CardContent>
                        <CardFooter className="pt-2 flex justify-between">
                          <Button variant="outline" size="sm" onClick={() => handleViewProfile(intern.id)}>
                            View Profile
                          </Button>
                          <Button size="sm" onClick={() => handleChat(intern.id)}>
                            <MessageSquare className="mr-1 h-4 w-4" />
                            Message
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="lawyers" className="space-y-4">
                {filteredLawyers.length === 0 ? (
                  <div className="text-center py-10">
                    <p className="text-gray-500">No lawyers found matching your search criteria.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredLawyers.map((lawyer) => (
                      <Card key={lawyer.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-shrink-0 flex flex-col items-center">
                              <Avatar className="h-16 w-16">
                                <AvatarFallback className="bg-law-100 text-law-700 text-lg">
                                  {lawyer.name.split(" ").map((n) => n[0]).join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="mt-2 flex items-center">
                                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                                <span className="text-sm font-medium">{lawyer.rating}</span>
                              </div>
                              <div className="mt-1 text-xs text-gray-500">{lawyer.casesHandled} cases</div>
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                                <h3 className="text-lg font-semibold text-law-800">{lawyer.name}</h3>
                                <Badge className="self-start md:self-auto mt-1 md:mt-0 w-fit">
                                  {lawyer.specialty}
                                </Badge>
                              </div>
                              <div className="flex items-center text-sm text-gray-500 mb-2">
                                <MapPin className="h-4 w-4 mr-1" />
                                {lawyer.location} ({lawyer.distance})
                              </div>
                              <p className="text-sm text-gray-600 mb-3">{lawyer.about}</p>
                              <Badge variant="outline" className="text-xs text-gray-600">
                                {lawyer.experience} experience
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="bg-gray-50 px-4 py-3 flex flex-col xs:flex-row gap-2 justify-end">
                          <Button variant="outline" size="sm" onClick={() => handleViewProfile(lawyer.id)}>
                            View Profile
                          </Button>
                          <Button size="sm" onClick={() => navigate(`/chat/${lawyer.id}`)}>
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Contact
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            </>
          )}
          
          <TabsContent value="recent">
            {contactsWithMessages.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-500">No recent message history found.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {contactsWithMessages.map((contactId) => {
                  let contact;
                  if (contactId.startsWith("intern-")) {
                    contact = mockInterns.find(i => i.id === contactId);
                  } else if (contactId.startsWith("lawyer-")) {
                    contact = mockLawyers.find(l => l.id === contactId);
                  } else if (contactId.startsWith("victim-")) {
                    contact = mockVictims.find(v => v.id === contactId);
                  }
                
                  const messages = mockMessageHistory[contactId as keyof typeof mockMessageHistory];
                  const latestMessage = messages ? messages[messages.length - 1] : null;
                
                  if (!contact || !latestMessage) return null;
                
                  return (
                    <Card key={contactId} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarFallback className="bg-blue-100 text-blue-700">
                              {contact.name.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-base">{contact.name}</CardTitle>
                            <CardDescription className="text-xs">
                              {
                                (contact.expertise && contact.expertise.join(", ")) ||
                                (contact.specialty) ||
                                (contact.caseType)
                              }
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="border-l-2 border-gray-200 pl-3 py-1 my-1">
                          <p className="text-sm text-gray-700 font-medium">
                            {latestMessage.sender === "user" ? "You" : contact.name}:
                          </p>
                          <p className="text-sm text-gray-600">{latestMessage.text}</p>
                          <p className="text-xs text-gray-400 mt-1">
                            {new Date(latestMessage.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-2">
                        <Button 
                          className="w-full" 
                          onClick={() => handleChat(contactId)}
                        >
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Continue Conversation
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Messages;
