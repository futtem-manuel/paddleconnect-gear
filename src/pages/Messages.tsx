import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageDialog } from "@/components/messaging/MessageDialog";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface Message {
  id: string;
  sender: {
    name: string;
    avatar?: string;
  };
  lastMessage: string;
  timestamp: string;
  unread: boolean;
}

const Messages = () => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const { t } = useTranslation();
  
  // This would come from your backend in a real app
  const messages: Message[] = [
    {
      id: "1",
      sender: {
        name: "Alice Smith",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
      },
      lastMessage: t('messages.sampleMessage1'),
      timestamp: t('messages.timeAgo', { time: '2 hours' }),
      unread: true,
    },
    {
      id: "2",
      sender: {
        name: "Bob Johnson",
      },
      lastMessage: t('messages.sampleMessage2'),
      timestamp: t('messages.timeAgo', { time: '1 day' }),
      unread: false,
    },
    {
      id: "3",
      sender: {
        name: "Carol White",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
      },
      lastMessage: t('messages.sampleMessage3'),
      timestamp: t('messages.timeAgo', { time: '2 days' }),
      unread: false,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">{t('common.messages')}</h1>
      
      <Card className="max-w-2xl mx-auto">
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="divide-y">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`p-4 hover:bg-muted/50 cursor-pointer transition-colors ${
                  message.unread ? "bg-primary/5" : ""
                }`}
                onClick={() => setSelectedUser(message.sender.name)}
              >
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={message.sender.avatar} />
                    <AvatarFallback>
                      {message.sender.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-semibold truncate">
                        {message.sender.name}
                      </p>
                      <span className="text-sm text-muted-foreground whitespace-nowrap">
                        {message.timestamp}
                      </span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground truncate">
                      {message.lastMessage}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>

      <MessageDialog
        isOpen={!!selectedUser}
        onClose={() => setSelectedUser(null)}
        recipientName={selectedUser || ""}
      />
    </div>
  );
};

export default Messages;