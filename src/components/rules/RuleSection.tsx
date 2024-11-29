import React from 'react';

interface RuleSectionProps {
  title: string;
  children: React.ReactNode;
  searchQuery: string;
}

const RuleSection = ({ title, children, searchQuery }: RuleSectionProps) => {
  const highlightText = (text: string) => {
    if (!searchQuery) return text;
    
    const parts = text.split(new RegExp(`(${searchQuery})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === searchQuery.toLowerCase() ? 
        <span key={index} className="bg-yellow-200 dark:bg-yellow-800">{part}</span> : 
        part
    );
  };

  // If there's no search query, or if the title/content includes the search term, show the section
  const shouldShow = !searchQuery || 
    title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (typeof children === 'string' && children.toLowerCase().includes(searchQuery.toLowerCase()));

  if (!shouldShow) return null;

  return (
    <section>
      <h2 className="text-xl font-semibold mb-3">{highlightText(title)}</h2>
      {typeof children === 'string' ? (
        <p>{highlightText(children)}</p>
      ) : (
        children
      )}
    </section>
  );
};

export default RuleSection;