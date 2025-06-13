
import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center py-20 text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-brand-purple mb-4"></div>
      <p className="text-xl text-brand-text font-semibold">Analisando Comentários...</p>
      <p className="text-md text-brand-text-secondary mt-1">A I.A. está buscando ouro nos dados. Por favor, aguarde!</p>
    </div>
  );
};
