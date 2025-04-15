import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, MapPin, Search, Filter, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

// Updated mock lawyer data with more profiles and case history
const mockLawyers = [
  {
    id: "lawyer-1",
    name: "Priya Ranganathan",
    avatar: "",
    specialty: "Family Law",
    location: "Hyderabad, Telangana",
    experience: "15 years",
    casesHandled: 342,
    casesWon: 289,
    rating: 4.8,
    about: "Expert in family law with special focus on domestic violence and child custody cases. Known for compassionate approach and high success rate.",
    distance: "2.5 miles away",
    languages: ["Telugu", "English", "Hindi"],
    successRate: "84%",
    pastCases: [
      { title: "Child Custody Resolution", status: "Won", year: 2023 },
      { title: "Domestic Violence Protection", status: "Won", year: 2023 },
      { title: "Property Dispute Settlement", status: "Won", year: 2022 }
    ]
  },
  {
    id: "lawyer-2",
    name: "Arun Reddy",
    avatar: "",
    specialty: "Criminal Law",
    location: "Hyderabad, Telangana",
    experience: "12 years",
    casesHandled: 256,
    casesWon: 198,
    rating: 4.7,
    about: "Specialized in criminal defense and domestic violence cases. Former public prosecutor with extensive courtroom experience.",
    distance: "3.2 miles away",
    languages: ["Telugu", "English"],
    successRate: "77%",
    pastCases: [
      { title: "Domestic Violence Defense", status: "Won", year: 2023 },
      { title: "Criminal Protection Order", status: "Won", year: 2023 }
    ]
  },
  {
    id: "lawyer-3",
    name: "Lakshmi Narayana",
    avatar: "",
    specialty: "Property Law",
    location: "Secunderabad, Telangana",
    experience: "20 years",
    casesHandled: 450,
    casesWon: 380,
    rating: 4.9,
    about: "Veteran property law expert with extensive experience in family inheritance disputes and property rights.",
    distance: "4.1 miles away",
    languages: ["Telugu", "English", "Hindi"],
    successRate: "84%",
    pastCases: [
      { title: "Family Property Division", status: "Won", year: 2023 },
      { title: "Land Dispute Resolution", status: "Won", year: 2023 }
    ]
  },
  // Adding 9 more lawyers with Telugu names and varying specialties
  {
    id: "lawyer-4",
    name: "Venkat Rao",
    avatar: "",
    specialty: "Family Law",
    location: "Hyderabad, Telangana",
    experience: "10 years",
    casesHandled: 180,
    casesWon: 142,
    rating: 4.6,
    about: "Focused on family dispute resolution and mediation. Known for achieving amicable settlements.",
    distance: "3.8 miles away",
    languages: ["Telugu", "English"],
    successRate: "79%",
    pastCases: [
      { title: "Family Reconciliation", status: "Won", year: 2023 },
      { title: "Property Division", status: "Settled", year: 2022 }
    ]
  },
  {
    id: "lawyer-5",
    name: "Padma Srinivas",
    avatar: "",
    specialty: "Criminal Law",
    location: "Hyderabad, Telangana",
    experience: "18 years",
    casesHandled: 320,
    casesWon: 275,
    rating: 4.8,
    about: "Experienced criminal lawyer with expertise in domestic violence cases and victim protection.",
    distance: "2.9 miles away",
    languages: ["Telugu", "English", "Hindi"],
    successRate: "86%",
    pastCases: [
      { title: "Protection Order", status: "Won", year: 2023 },
      { title: "Criminal Defense", status: "Won", year: 2023 }
    ]
  },
  {
    id: "lawyer-6",
    name: "Ramesh Kumar",
    avatar: "",
    specialty: "Civil Rights Law",
    location: "Hyderabad, Telangana",
    experience: "14 years",
    casesHandled: 280,
    casesWon: 220,
    rating: 4.5,
    about: "Advocate for civil liberties and human rights, focusing on justice and equality.",
    distance: "4.5 miles away",
    languages: ["Telugu", "English"],
    successRate: "78%",
    pastCases: [
      { title: "Discrimination Case", status: "Won", year: 2022 },
      { title: "Civil Rights Litigation", status: "Settled", year: 2021 }
    ]
  },
  {
    id: "lawyer-7",
    name: "Sridevi Sharma",
    avatar: "",
    specialty: "Corporate Law",
    location: "Secunderabad, Telangana",
    experience: "9 years",
    casesHandled: 150,
    casesWon: 120,
    rating: 4.7,
    about: "Specializes in corporate governance and compliance, assisting businesses with legal frameworks.",
    distance: "5.1 miles away",
    languages: ["Telugu", "English", "Hindi"],
    successRate: "80%",
    pastCases: [
      { title: "Merger Agreement", status: "Completed", year: 2023 },
      { title: "Compliance Audit", status: "Completed", year: 2022 }
    ]
  },
  {
    id: "lawyer-8",
    name: "Gopal Varma",
    avatar: "",
    specialty: "Family Law",
    location: "Hyderabad, Telangana",
    experience: "11 years",
    casesHandled: 200,
    casesWon: 165,
    rating: 4.6,
    about: "Dedicated to family law, providing support in divorce and alimony cases.",
    distance: "3.5 miles away",
    languages: ["Telugu", "English"],
    successRate: "82%",
    pastCases: [
      { title: "Divorce Settlement", status: "Settled", year: 2023 },
      { title: "Alimony Dispute", status: "Won", year: 2022 }
    ]
  },
  {
    id: "lawyer-9",
    name: "Anjali Rao",
    avatar: "",
    specialty: "Criminal Law",
    location: "Hyderabad, Telangana",
    experience: "16 years",
    casesHandled: 300,
    casesWon: 250,
    rating: 4.9,
    about: "Expert criminal defense lawyer, ensuring justice and fair representation.",
    distance: "4.8 miles away",
    languages: ["Telugu", "English", "Hindi"],
    successRate: "83%",
    pastCases: [
      { title: "Criminal Defense", status: "Won", year: 2023 },
      { title: "Appeal Case", status: "Won", year: 2022 }
    ]
  },
  {
    id: "lawyer-10",
    name: "Mahesh Babu",
    avatar: "",
    specialty: "Property Law",
    location: "Secunderabad, Telangana",
    experience: "13 years",
    casesHandled: 260,
    casesWon: 210,
    rating: 4.7,
    about: "Focused on property rights and inheritance issues, providing clear legal solutions.",
    distance: "5.5 miles away",
    languages: ["Telugu", "English"],
    successRate: "81%",
    pastCases: [
      { title: "Inheritance Claim", status: "Won", year: 2023 },
      { title: "Property Litigation", status: "Settled", year: 2022 }
    ]
  },
  {
    id: "lawyer-11",
    name: "Keerthi Reddy",
    avatar: "",
    specialty: "Civil Rights Law",
    location: "Hyderabad, Telangana",
    experience: "17 years",
    casesHandled: 310,
    casesWon: 260,
    rating: 4.8,
    about: "Passionate about defending civil rights and fighting discrimination.",
    distance: "3.9 miles away",
    languages: ["Telugu", "English", "Hindi"],
    successRate: "84%",
    pastCases: [
      { title: "Human Rights Case", status: "Won", year: 2023 },
      { title: "Civil Liberties Defense", status: "Won", year: 2022 }
    ]
  },
  {
    id: "lawyer-12",
    name: "Vikram Singh",
    avatar: "",
    specialty: "Corporate Law",
    location: "Hyderabad, Telangana",
    experience: "19 years",
    casesHandled: 330,
    casesWon: 280,
    rating: 4.9,
    about: "Advises corporations on legal matters, ensuring compliance and strategic growth.",
    distance: "4.2 miles away",
    languages: ["Telugu", "English"],
    successRate: "85%",
    pastCases: [
      { title: "Corporate Restructuring", status: "Completed", year: 2023 },
      { title: "Legal Compliance", status: "Completed", year: 2022 }
    ]
  }
];

// Specialty options
const specialties = [
  { value: "all", label: "All Specialties" },
  { value: "family", label: "Family Law" },
  { value: "criminal", label: "Criminal Law" },
  { value: "property", label: "Property Law" },
  { value: "corporate", label: "Corporate Law" },
  { value: "civil", label: "Civil Rights" },
];

const LawyerDirectory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [specialty, setSpecialty] = useState("all");
  const [lawyers] = useState(mockLawyers);
  const navigate = useNavigate();

  const handleViewProfile = (lawyerId: string) => {
    navigate(`/profile/${lawyerId}`);
  };

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto animate-fade-in">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-law-800 mb-2">Find a Lawyer Near You</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Connect with experienced lawyers in your area who specialize in various legal matters. All lawyers are vetted and experienced in handling sensitive cases.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-1 md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  placeholder="Search by name or keyword..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={specialty} onValueChange={setSpecialty}>
                <SelectTrigger>
                  <SelectValue placeholder="All Specialties" />
                </SelectTrigger>
                <SelectContent>
                  {specialties.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" className="flex-shrink-0">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {lawyers.map((lawyer) => (
            <Card key={lawyer.id} className="bg-white shadow-sm hover:shadow-md transition-shadow animate-scale-in">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={lawyer.avatar} alt={lawyer.name} />
                      <AvatarFallback className="bg-law-100 text-law-700 text-xl">
                        {lawyer.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="mt-3 text-center">
                      <div className="flex items-center justify-center">
                        <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                        <span className="ml-1 font-medium">{lawyer.rating}</span>
                      </div>
                      <div className="mt-1 text-sm text-gray-500">{lawyer.casesHandled} cases</div>
                      <div className="mt-1 text-sm font-medium text-green-600">{lawyer.successRate} success</div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <h3 className="text-xl font-semibold text-law-800">{lawyer.name}</h3>
                      <Badge className="self-start md:self-auto mt-1 md:mt-0">
                        {lawyer.specialty}
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <MapPin className="h-4 w-4 mr-1" />
                      {lawyer.location} ({lawyer.distance})
                    </div>
                    <p className="text-gray-600 mb-4">{lawyer.about}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="outline" className="text-gray-600">
                        {lawyer.experience} experience
                      </Badge>
                      {lawyer.languages.map((lang) => (
                        <Badge key={lang} variant="outline" className="text-gray-600">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-900">Recent Cases</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {lawyer.pastCases.slice(0, 2).map((caseItem, index) => (
                          <div key={index} className="text-sm">
                            <span className="font-medium">{caseItem.title}</span>
                            <span className="text-green-600 ml-2">({caseItem.status})</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 px-6 py-4 flex flex-col xs:flex-row gap-3 justify-end">
                <Button variant="outline" onClick={() => handleViewProfile(lawyer.id)}>
                  View Full Profile
                </Button>
                <Button className="bg-law-600 hover:bg-law-700 text-white">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Contact
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default LawyerDirectory;
