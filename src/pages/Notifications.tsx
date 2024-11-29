import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Notification {
  id: string;
  type: 'verification' | 'game_invite' | 'game_reminder';
  user: {
    name: string;
    avatar?: string;
  };
  message: string;
  timestamp: string;
  matchId?: string;
  read: boolean;
}

const Notifications = () => {
  const navigate = useNavigate();
  
  // This would come from your backend in a real app
  const notifications: Notification[] = [
    {
      id: "1",
      type: "verification",
      user: {
        name: "Alice Smith",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
      },
      message: "Requesting verification for your match on February 20th",
      timestamp: "2 hours ago",
      matchId: "match123",
      read: false,
    },
    {
      id: "2",
      type: "game_invite",
      user: {
        name: "Bob Johnson",
      },
      message: "Invited you to play a match this Saturday at 2 PM",
      timestamp: "1 day ago",
      read: true,
    },
    {
      id: "3",
      type: "game_reminder",
      user: {
        name: "Carol White",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
      },
      message: "Reminder: Your match starts in 2 hours at City Padel Club",
      timestamp: "2 days ago",
      read: true,
    },
  ];

  const handleVerificationAction = (matchId: string, action: 'verify' | 'contest') => {
    navigate(`/verify-match/${matchId}?action=${action}`);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>
      
      <Card className="max-w-2xl mx-auto">
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="divide-y">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 hover:bg-muted/50 transition-colors ${
                  !notification.read ? "bg-primary/5" : ""
                }`}
              >
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={notification.user.avatar} />
                    <AvatarFallback>
                      {notification.user.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <p className="font-semibold">
                        {notification.user.name}
                      </p>
                      <span className="text-sm text-muted-foreground whitespace-nowrap">
                        {notification.timestamp}
                      </span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2">
                      {notification.message}
                    </p>

                    {notification.type === 'verification' && notification.matchId && (
                      <div className="flex gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1"
                          onClick={() => handleVerificationAction(notification.matchId!, 'verify')}
                        >
                          <Check className="h-4 w-4" />
                          Verify
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1"
                          onClick={() => handleVerificationAction(notification.matchId!, 'contest')}
                        >
                          <X className="h-4 w-4" />
                          Contest
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
};

export default Notifications;