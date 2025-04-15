
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { ArrowRight, Scale, Users, Shield, MapPin } from "lucide-react";

const Index = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1 space-y-6 text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-blue-900">
                Legal Support When You Need It Most
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl">
                Connecting victims' families with legal support through skilled interns and experienced lawyers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="bg-blue-700 hover:bg-blue-800">
                  <Link to="/auth/register" className="flex items-center gap-2">
                    Get Started <ArrowRight size={16} />
                  </Link>
                </Button>
                <Button variant="outline" size="lg">
                  <Link to="/directory">Find a Lawyer</Link>
                </Button>
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="w-full max-w-md rounded-lg overflow-hidden shadow-xl bg-white p-1">
                <img 
                  src="/placeholder.svg" 
                  alt="Legal consultation" 
                  className="w-full h-auto rounded" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform streamlines the legal consultation process for everyone involved
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white p-8 rounded-lg shadow-md transition-transform hover:scale-105">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-blue-700 font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-blue-900">Submit Your Case</h3>
              <p className="text-gray-600">
                Provide details about your legal concerns and requirements through our simple submission form.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-8 rounded-lg shadow-md transition-transform hover:scale-105">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-blue-700 font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-blue-900">Get Intern Guidance</h3>
              <p className="text-gray-600">
                Receive initial consultation and guidance from qualified law interns who specialize in your case type.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-8 rounded-lg shadow-md transition-transform hover:scale-105">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-blue-700 font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-blue-900">Connect with Lawyers</h3>
              <p className="text-gray-600">
                Cases are escalated to experienced lawyers based on complexity and location when needed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Why Choose Us</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform offers unique benefits to everyone involved in the legal consultation process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="p-6 border border-gray-100 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <Scale className="text-blue-700" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-blue-900">Expert Advice</h3>
              <p className="text-gray-600">
                Get high-quality legal guidance from trained interns and experienced professionals.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 border border-gray-100 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <Users className="text-blue-700" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-blue-900">Skill Development</h3>
              <p className="text-gray-600">
                Interns gain valuable real-world experience working on actual legal cases.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 border border-gray-100 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <Shield className="text-blue-700" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-blue-900">Secure Platform</h3>
              <p className="text-gray-600">
                Your information is protected with the highest security standards in the industry.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 border border-gray-100 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <MapPin className="text-blue-700" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-blue-900">Location-Based</h3>
              <p className="text-gray-600">
                Find lawyers nearby for in-person consultation when needed for your case.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-xl opacity-90">
                Join thousands of others who have received the legal help they needed.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-blue-800">
                <Link to="/auth/login">Sign In</Link>
              </Button>
              <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
                <Link to="/auth/register" className="flex items-center gap-2">
                  Register Now <ArrowRight size={16} />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">What Our Users Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from the people who have used our platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-700 font-bold">JS</span>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900">Jessica Smith</h4>
                  <p className="text-sm text-gray-500">Victim's Family</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The initial guidance from the intern was incredibly helpful. They helped me understand my legal options and connected me with a great lawyer near my area."
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-700 font-bold">ML</span>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900">Michael Lee</h4>
                  <p className="text-sm text-gray-500">Law Intern</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Working on real cases through this platform has given me invaluable experience. The mentorship from experienced lawyers has been a game-changer for my career."
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-700 font-bold">AP</span>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900">Alicia Parker</h4>
                  <p className="text-sm text-gray-500">Lawyer</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "This platform has connected me with clients who truly need my expertise, while also giving me the opportunity to mentor the next generation of legal professionals."
              </p>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
