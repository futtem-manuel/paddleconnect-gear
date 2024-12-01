import React from 'react';
import { useTranslation } from "react-i18next";

interface RuleSectionProps {
  titleKey: string;
  contentKey: string;
  searchQuery: string;
}

const RuleSection = ({ titleKey, contentKey, searchQuery }: RuleSectionProps) => {
  const { t } = useTranslation();
  const title = t(titleKey);
  const content = t(contentKey);

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
    content.toLowerCase().includes(searchQuery.toLowerCase());

  if (!shouldShow) return null;

  return (
    <section>
      <h2 className="text-xl font-semibold mb-3">{highlightText(title)}</h2>
      <p>{highlightText(content)}</p>
    </section>
  );
};

export default RuleSection;