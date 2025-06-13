
import React from 'react';
import type { ProductIdea } from '../types';

interface ProductIdeaCardProps {
  idea: ProductIdea;
}

const DetailItem: React.FC<{ label: string; value: string; isContent?: boolean; emoji?: string }> = ({ label, value, isContent = false, emoji }) => (
  <div className="mb-2 flex items-start">
    {emoji && <span className="mr-2 text-purple-400">{emoji}</span>}
    <div>
      <strong className="text-purple-400">{label}:</strong>
      {isContent ? (
        <p className="text-sm text-brand-text-secondary whitespace-pre-line ml-1">{value}</p>
      ) : (
        <span className="text-brand-text-secondary ml-1">{value}</span>
      )}
    </div>
  </div>
);

export const ProductIdeaCard: React.FC<ProductIdeaCardProps> = ({ idea }) => {
  return (
    <div className="bg-brand-gray-medium p-5 sm:p-6 rounded-xl shadow-2xl border border-brand-gray-light hover:border-purple-500 transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1 hover:shadow-purple-500/30">
      <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-2">
        {idea.name}
      </h3>
      
      <blockquote className="my-3 p-3 bg-brand-gray-light/30 border-l-4 border-pink-500 rounded-r-md">
        <p className="text-sm text-brand-text italic leading-relaxed">"{idea.promise}"</p>
      </blockquote>
      
      <div className="text-sm space-y-1 mt-auto pt-3 border-t border-brand-gray-light/20">
        <DetailItem label="Formato" value={idea.format} emoji="📦" />
        <DetailItem label="Conteúdo Principal" value={idea.content} isContent={true} emoji="📚" />
        <DetailItem label="Preço Sugerido" value={idea.price} emoji="💰" />
        <DetailItem label="Criação" value={idea.creationDifficulty} emoji="🛠️" />
        <DetailItem label="Gatilho Mental" value={idea.mentalTrigger} emoji="🧠" />
      </div>
    </div>
  );
};
