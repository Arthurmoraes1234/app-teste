
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { InputSection } from './components/InputSection';
import { OutputSection } from './components/OutputSection';
import { ErrorMessage } from './components/ErrorMessage';
import { analyzeCommentsWithGemini } from './services/geminiService';
import type { AnalysisResult } from './types';

const App: React.FC = () => {
  const [rawComments, setRawComments] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = useCallback(async () => {
    if (!rawComments.trim()) {
      setError("Por favor, cole alguns comentários para analisar.");
      return;
    }
    setError(null);
    setIsLoading(true);
    setAnalysisResult(null);

    try {
      const result = await analyzeCommentsWithGemini(rawComments);
      setAnalysisResult(result);
    } catch (err) {
      if (err instanceof Error) {
        setError(`Erro ao analisar comentários: ${err.message}. Verifique se sua API Key do Gemini está configurada corretamente no ambiente (process.env.API_KEY).`);
      } else {
        setError("Ocorreu um erro desconhecido.");
      }
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [rawComments]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-gray-dark via-purple-900/30 to-brand-gray-dark text-brand-text p-4 sm:p-6 md:p-8">
      <div className="container mx-auto max-w-6xl"> {/* Increased max-width for a more spacious feel */}
        <Header />
        <main className="mt-6"> {/* Added margin-top to main */}
          <InputSection
            rawComments={rawComments}
            setRawComments={setRawComments}
            onAnalyze={handleAnalyze}
            isLoading={isLoading}
          />
          {error && <ErrorMessage message={error} />}
          <OutputSection analysisResult={analysisResult} isLoading={isLoading} />
        </main>
        <footer className="text-center mt-16 mb-8 py-4 text-brand-text-secondary text-xs border-t border-brand-gray-light"> {/* Refined footer */}
          <p>&copy; {new Date().getFullYear()} Analisador de Comentários Virais. Powered by Gemini.</p>
          <p>MVP Infinito 💸</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
