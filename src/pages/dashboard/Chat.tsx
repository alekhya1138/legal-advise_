
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChevronLeft, Send, Phone, User, Clock, Check, CheckCheck } from "lucide-react";

// Mock profiles data - simplified version from the ProfileView
const mockProfiles = {
  "intern-1": {
    id: "intern-1",
    name: "John Smith",
    role: "intern",
    avatar: "JS",
  },
  "intern-2": {
    id: "intern-2",
    name: "Maria Garcia",
    role: "intern",
    avatar: "MG",
  },
  "lawyer-1": {
    id: "lawyer-1",
    name: "Robert Davis",
    role: "lawyer",
    avatar: "RD",
  },
  "lawyer-2": {
    id: "lawyer-2",
    name: "Patricia Chen",
    role: "lawyer",
    avatar: "PC",
  }
};

// Mock chat messages
const mockChats = {
  "intern-1": [
    {
      id: 1,
      sender: "user",
      text: "Hello, I need some advice regarding my property inheritance case.",
      timestamp: "2025-04-14T10:30:00",
      status: "read"
    },
    {
      id: 2,
      sender: "intern-1",
      text: "Hello! I'd be happy to help you with your property inheritance case. Could you provide more details about your situation?",
      timestamp: "2025-04-14T10:32:00",
      status: "read"
    },
    {
      id: 3,
      sender: "user",
      text: "My father passed away last month and left a property that's now being disputed among siblings.",
      timestamp: "2025-04-14T10:34:00",
      status: "read"
    },
    {
      id: 4,
      sender: "intern-1",
      text: "I'm sorry for your loss. Did your father leave a will specifying how the property should be divided?",
      timestamp: "2025-04-14T10:36:00",
      status: "read"
    },
    {
      id: 5,
      sender: "user",
      text: "Yes, there is a will, but one of my siblings is contesting it.",
      timestamp: "2025-04-14T10:38:00",
      status: "read"
    },
    {
      id: 6,
      sender: "intern-1",
      text: "I understand. Contested wills can be complex. I'd like to get some more specific details to better assist you. Could you tell me what grounds they're contesting it on?",
      timestamp: "2025-04-14T10:40:00",
      status: "read"
    }
  ],
  "lawyer-1": [
    {
      id: 1,
      sender: "user",
      text: "Hello Mr. Davis, my case was escalated to you regarding the interstate custody issue.",
      timestamp: "2025-04-13T14:20:00",
      status: "read"
    },
    {
      id: 2,
      sender: "lawyer-1",
      text: "Hello, yes I've reviewed the details of your case. Interstate custody cases involve complexities due to different state laws. I'd like to schedule a call to discuss this further.",
      timestamp: "2025-04-13T14:25:00",
      status: "read"
    },
    {
      id: 3,
      sender: "user",
      text: "That would be great. When are you available?",
      timestamp: "2025-04-13T14:28:00",
      status: "read"
    },
    {
      id: 4,
      sender: "lawyer-1",
      text: "I can speak tomorrow at 10 AM or 2 PM. Which works better for you?",
      timestamp: "2025-04-13T14:30:00",
      status: "read"
    },
    {
      id: 5,
      sender: "user",
      text: "10 AM works for me.",
      timestamp: "2025-04-13T14:32:00",
      status: "read"
    },
    {
      id: 6,
      sender: "lawyer-1",
      text: "Perfect. I'll call you at 10 AM tomorrow. Please have any relevant documents ready for us to discuss.",
      timestamp: "2025-04-13T14:35:00",
      status: "read"
    }
  ]
};

const formatTime = (timestamp: string) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const formatDate = (timestamp: string) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString();
};

const MessageStatus = ({ status }: { status: string }) => {
  if (status === "sent") {
    return <Check className="h-3.5 w-3.5 text-gray-400" />;
  } else if (status === "delivered") {
    return <Check className="h-3.5 w-3.5 text-gray-400" />;
  } else if (status === "read") {
    return <CheckCheck className="h-3.5 w-3.5 text-blue-500" />;
  }
  return null;
};

const Chat = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [recipient, setRecipient] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [messageText, setMessageText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate API call to fetch chat data
    setTimeout(() => {
      if (userId && mockProfiles[userId as keyof typeof mockProfiles]) {
        setRecipient(mockProfiles[userId as keyof typeof mockProfiles]);
        
        if (mockChats[userId as keyof typeof mockChats]) {
          setMessages(mockChats[userId as keyof typeof mockChats]);
        } else {
          setMessages([]);
        }
      }
      setLoading(false);
    }, 1000);
  }, [userId]);

  useEffect(() => {
    // Scroll to bottom whenever messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (messageText.trim() === "") return;

    const newMessage = {
      id: messages.length + 1,
      sender: "user",
      text: messageText,
      timestamp: new Date().toISOString(),
      status: "sent"
    };

    setMessages([...messages, newMessage]);
    setMessageText("");

    // Simulate a reply after 2 seconds
    setTimeout(() => {
      const replyMessage = {
        id: messages.length + 2,
        sender: userId,
        text: "Thank you for your message. I'll review this and get back to you soon.",
        timestamp: new Date().toISOString(),
        status: "read"
      };
      setMessages(prev => [...prev, replyMessage]);
    }, 2000);
  };

  const handleCallUser = () => {
    // In a real app, this would trigger a call functionality
    alert(`Calling ${recipient?.name}...`);
  };

  const handleViewProfile = () => {
    if (recipient) {
      navigate(`/profile/${recipient.id}`);
    }
  };

  if (loading) {
    return (
      <DashboardLayout userRole="victim">
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">Loading conversation...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!recipient) {
    return (
      <DashboardLayout userRole="victim">
        <div className="flex flex-col items-center justify-center h-full">
          <h2 className="text-xl font-semibold text-gray-800">Conversation Not Found</h2>
          <p className="text-gray-500 mt-2">The conversation you're looking for doesn't exist or you don't have access.</p>
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
      <div className="h-full flex flex-col animate-fade-in">
        <div className="flex items-center space-x-2 mb-4">
          <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <h1 className="text-2xl font-semibold tracking-tight">Chat</h1>
        </div>

        <Card className="flex-1 flex flex-col h-[calc(100vh-200px)]">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarFallback className="bg-blue-100 text-blue-700">
                    {recipient.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base">{recipient.name}</CardTitle>
                  <p className="text-xs text-gray-500 capitalize">{recipient.role}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon" onClick={handleCallUser}>
                  <Phone className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" onClick={handleViewProfile}>
                  <User className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto p-4">
            <div className="space-y-4">
              {messages.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-gray-500">No messages yet. Start the conversation!</p>
                </div>
              ) : (
                <>
                  {messages.map((message, index) => {
                    const isUser = message.sender === "user";
                    const showDate = index === 0 || 
                      formatDate(messages[index-1].timestamp) !== formatDate(message.timestamp);
                    
                    return (
                      <div key={message.id} className="space-y-1">
                        {showDate && (
                          <div className="flex justify-center my-4">
                            <div className="bg-gray-100 px-3 py-1 rounded-full text-xs text-gray-500">
                              {formatDate(message.timestamp)}
                            </div>
                          </div>
                        )}
                        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[80%] ${isUser ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'} rounded-lg px-4 py-2`}>
                            <p>{message.text}</p>
                          </div>
                        </div>
                        <div className={`flex items-center text-xs text-gray-500 ${isUser ? 'justify-end' : 'justify-start'} px-1`}>
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{formatTime(message.timestamp)}</span>
                          {isUser && (
                            <span className="ml-1">
                              <MessageStatus status={message.status} />
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>
          </CardContent>
          <CardFooter className="border-t p-4">
            <div className="flex w-full space-x-2">
              <Input
                placeholder="Type your message..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button 
                onClick={handleSendMessage} 
                disabled={messageText.trim() === ""}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Chat;
