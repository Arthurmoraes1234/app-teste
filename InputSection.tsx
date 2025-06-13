
import React from 'react';

interface InputSectionProps {
  rawComments: string;
  setRawComments: (comments: string) => void;
  onAnalyze: () => void;
  isLoading: boolean;
}

export const InputSection: React.FC<InputSectionProps> = ({ rawComments, setRawComments, onAnalyze, isLoading }) => {
  return (
    <section className="mb-8 p-6 bg-brand-gray-medium shadow-2xl rounded-xl border border-brand-gray-light">
      <h2 className="text-2xl font-semibold mb-4 text-brand-text">
        1. Cole os Comentários Aqui 👇
      </h2>
      <p className="text-sm text-brand-text-secondary mb-4">
        Copie (Ctrl+A, Ctrl+C) os comentários diretamente do YouTube/TikTok e cole (Ctrl+V) no campo abaixo. A IA vai filtrar o lixo e encontrar ouro!
      </p>
      <textarea
        value={rawComments}
        onChange={(e) => setRawComments(e.target.value)}
        placeholder="Exemplo:
        Joaozinho123 Há 2 dias 15 👍
        Nossa, tô cansado de não ter resultado na academia! Alguém me ajuda?
        Maria_Fitness Há 1 dia 8 👍
        @Joaozinho123 te entendo! Preciso de um treino pra fazer em casa.
        ..."
        rows={15}
        className="w-full p-4 bg-brand-gray-light border border-gray-600 rounded-lg text-brand-text placeholder-gray-500 focus:ring-2 focus:ring-brand-purple focus:border-transparent transition-shadow duration-150 ease-in-out shadow-inner"
        disabled={isLoading}
      />
      <button
        onClick={onAnalyze}
        disabled={isLoading}
        className="mt-6 w-full bg-gradient-to-r from-brand-purple via-pink-600 to-brand-wine text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-purple-400 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Analisando...
          </span>
        ) : (
          'ANALISAR COMENTÁRIOS E GERAR IDEIAS 🚀'
        )}
      </button>
    </section>
  );
};
