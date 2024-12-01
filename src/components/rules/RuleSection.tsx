import React from 'react';
import { useTranslation } from "react-i18next";

interface RuleSectionProps {
  title: string;
  content: string | React.ReactNode;
  searchQuery: string;
}

const RuleSection = ({ title, content, searchQuery }: RuleSectionProps) => {
  const { t } = useTranslation();

  const highlightText = (text: string) => {
    if (!searchQuery) return text;
    
    const parts = text.split(new RegExp(`(${searchQuery})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === searchQuery.toLowerCase() ? 
        <span key={index} className="bg-yellow-200 dark:bg-yellow-800">{part}</span> : 
        part
    );
  };

  const shouldShow = !searchQuery || 
    title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (typeof content === 'string' && content.toLowerCase().includes(searchQuery.toLowerCase()));

  if (!shouldShow) return null;

  return (
    <section>
      <h2 className="text-xl font-semibold mb-3">{highlightText(title)}</h2>
      {typeof content === 'string' ? (
        <p>{highlightText(content)}</p>
      ) : (
        content
      )}
    </section>
  );
};

export default RuleSection;