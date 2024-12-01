import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useState } from "react";
import RulesContent from "@/components/rules/RulesContent";
import RulesHeader from "@/components/rules/RulesHeader";
import { useTranslation } from "react-i18next";

const Rules = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <Card className="neu-card">
          <CardHeader>
            <RulesHeader 
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </CardHeader>
          <CardContent>
            <RulesContent searchQuery={searchQuery} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Rules;