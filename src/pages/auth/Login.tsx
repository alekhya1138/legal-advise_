
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthCard from "@/components/auth/AuthCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("victim");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Store login state and role
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userRole", role);
    
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Login successful",
        description: "Welcome back to Legal Consult",
      });
      
      // Redirect based on role
      if (role === "victim") {
        navigate("/dashboard");
      } else if (role === "intern") {
        navigate("/dashboard/intern");
      } else if (role === "lawyer") {
        navigate("/dashboard/lawyer");
      }
    }, 1500);
  };

  return (
    <AuthCard
      title="Welcome Back"
      description="Sign in to your Legal Consult account"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="focus:border-law-600 focus:ring-law-600"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              to="/auth/forgot-password"
              className="text-sm text-law-600 hover:text-law-800 transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="focus:border-law-600 focus:ring-law-600"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="role">Sign in as</Label>
          <Select value={role} onValueChange={setRole}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="victim">Family Member</SelectItem>
              <SelectItem value="intern">Law Intern</SelectItem>
              <SelectItem value="lawyer">Lawyer</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          type="submit"
          className="w-full bg-law-600 hover:bg-law-700 text-white"
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/auth/register"
              className="text-law-600 hover:text-law-800 font-medium transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </AuthCard>
  );
};

export default Login;
