import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, MessageSquare, Trophy, UserPlus } from "lucide-react";

const Notifications = () => {
  const { t } = useTranslation();

  const notifications = [
    {
      id: 1,
      icon: <MessageSquare className="h-4 w-4" />,
      title: t('notifications.newMessage'),
      message: t('notifications.messageContent'),
      time: "2h",
      read: false,
    },
    {
      id: 2,
      icon: <Trophy className="h-4 w-4" />,
      title: t('notifications.matchVerified'),
      message: t('notifications.matchVerifiedContent'),
      time: "1d",
      read: true,
    },
    {
      id: 3,
      icon: <UserPlus className="h-4 w-4" />,
      title: t('notifications.newConnection'),
      message: t('notifications.connectionContent'),
      time: "2d",
      read: true,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center gap-2 mb-6">
        <Bell className="h-5 w-5" />
        <h1 className="text-2xl font-bold">{t('common.notifications')}</h1>
      </div>
      
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
                  <div className="p-2 rounded-full bg-muted">
                    {notification.icon}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-semibold">
                        {notification.title}
                      </p>
                      <span className="text-sm text-muted-foreground whitespace-nowrap">
                        {notification.time}
                      </span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">
                      {notification.message}
                    </p>
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