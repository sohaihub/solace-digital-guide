
import React from 'react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { categories } from '@/data/meditationTracks';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
      {categories.map(category => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? 'default' : 'outline'}
          className={selectedCategory === category.id ? 'bg-mindful-600' : ''}
          onClick={() => onCategoryChange(category.id)}
          size={isMobile ? "sm" : "default"}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
}
