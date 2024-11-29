import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
}

interface MessageDialogProps {
  isOpen: boolean;
  onClose: () => void;
  recipientName: string;
  recipientAvatar?: string;
}

export const MessageDialog = ({
  isOpen,
  onClose,
  recipientName,
  recipientAvatar,
}: MessageDialogProps) => {
  const [newMessage, setNewMessage] = useState("");
  // In a real app, these would come from your backend
  const [messages] = useState<Message[]>([
    {
      id: "1",
      senderId: "current-user",
      text: "Hey, would you like to play a match this weekend?",
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: "2",
      senderId: "other-user",
      text: "Sure! How about Saturday afternoon?",
      timestamp: new Date(Date.now() - 1800000),
    },
  ]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // In a real app, this would make an API call to send the message
    toast.success("Message sent successfully");
    setNewMessage("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] h-[600px] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={recipientAvatar} />
              <AvatarFallback>{recipientName.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            {recipientName}
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.senderId === "current-user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.senderId === "current-user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p>{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="flex gap-2 mt-4">
          <Input
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button onClick={handleSendMessage} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};