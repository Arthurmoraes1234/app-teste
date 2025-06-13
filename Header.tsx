
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="py-6 sm:py-8 text-center border-b-2 border-brand-gray-light/30 mb-8"> {/* Adjusted padding and added bottom border */}
      <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
        Analisador de Comentários Virais
      </h1>
      <p className="mt-3 text-lg text-brand-text-secondary">
        Extraia Dores, Perfil de Público e Ideias de Produtos com IA 🧠💡
      </p>
    </header>
  );
};
