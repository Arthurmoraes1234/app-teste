
import React, { useState } from 'react';
import type { AnalysisResult, PainPoint, AudienceProfile, ProductIdea, ExtraInsights } from '../types';
import { ProductIdeaCard } from './ProductIdeaCard';
import { LoadingSpinner } from './LoadingSpinner';

interface OutputSectionProps {
  analysisResult: AnalysisResult | null;
  isLoading: boolean;
}

const SectionTitle: React.FC<{ title: string; emoji?: string; className?: string }> = ({ title, emoji, className = '' }) => (
  <h2 className={`text-2xl sm:text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 ${className}`}>
    {emoji && <span className="mr-2">{emoji}</span>}
    {title}
  </h2>
);

const TabButton: React.FC<{ label: string; isActive: boolean; onClick: () => void; emoji?: string }> = ({ label, isActive, onClick, emoji }) => (
  <button
    role="tab"
    aria-selected={isActive}
    onClick={onClick}
    className={`flex items-center justify-center text-sm sm:text-base font-medium py-3 px-4 sm:px-6 rounded-t-lg transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50
      ${isActive 
        ? 'bg-brand-gray-medium text-brand-text border-b-2 border-pink-500' 
        : 'text-brand-text-secondary hover:text-brand-text hover:bg-brand-gray-light/30'
      }`}
  >
    {emoji && <span className="mr-2 hidden sm:inline">{emoji}</span>}
    {label}
  </button>
);

const PainPointsDisplay: React.FC<{ items: PainPoint[] }> = ({ items }) => (
  <div className="space-y-4">
    {items.map((item, index) => (
      <div key={index} className="p-4 sm:p-5 bg-brand-gray-medium rounded-lg shadow-lg border-l-4 border-brand-wine transform hover:scale-[1.02] transition-transform duration-200">
        <p className="font-semibold text-brand-text flex items-center">
          <span className="text-xl mr-2 text-brand-wine">📌</span> "{item.pain}"
        </p>
        <p className="text-sm text-brand-text-secondary mt-1 ml-7">{item.context}</p>
      </div>
    ))}
  </div>
);

const AudienceProfileDisplay: React.FC<{ profile: AudienceProfile }> = ({ profile }) => (
  <div className="p-6 bg-brand-gray-medium rounded-lg shadow-lg border border-brand-gray-light space-y-4">
    {[
      { label: "Gênero Predominante", value: profile.gender, emoji: "🚻" },
      { label: "Faixa Etária Estimada", value: profile.ageRange, emoji: "🎂" },
      { label: "Estilo de Vida / Hábitos", value: profile.lifestyle, emoji: " lifestyles" }, // Using a descriptive emoji name if one doesn't fit
      { label: "Momento de Vida", value: profile.lifeStage, emoji: "🌱" },
      { label: "Querem Evitar a Todo Custo", value: profile.wantsToAvoid, highlight: true, emoji: "🚫" },
    ].map((item, index) => (
      <div key={index} className="flex items-start">
        <span className="text-xl mr-2">{item.emoji}</span>
        <div>
          <span className={`font-semibold ${item.highlight ? 'text-red-400' : 'text-purple-400'}`}>{item.label}: </span>
          <span className="text-brand-text">{item.value}</span>
        </div>
      </div>
    ))}
  </div>
);

const ExtraInsightsDisplay: React.FC<{ insights: ExtraInsights }> = ({ insights }) => (
  <div className="p-6 bg-brand-gray-medium rounded-lg shadow-lg border border-brand-gray-light space-y-6">
    <div>
      <h3 className="font-semibold text-purple-400 mb-2 flex items-center"><span className="text-xl mr-2">🗣️</span>Frases/Palavras Repetidas (para Copy):</h3>
      {insights.repeatedPhrases.length > 0 ? (
        <ul className="list-disc list-inside text-brand-text space-y-1 pl-4">
          {insights.repeatedPhrases.map((phrase, i) => <li key={i}>"{phrase}"</li>)}
        </ul>
      ) : <p className="text-brand-text-secondary pl-4">Nenhuma frase repetida identificada.</p>}
    </div>
    <div>
      <h3 className="font-semibold text-purple-400 mb-2 flex items-center"><span className="text-xl mr-2">🔗</span>Crenças Limitantes Comuns:</h3>
      {insights.limitingBeliefs.length > 0 ? (
      <ul className="list-disc list-inside text-brand-text space-y-1 pl-4">
        {insights.limitingBeliefs.map((belief, i) => <li key={i}>"{belief}"</li>)}
      </ul>
      ) : <p className="text-brand-text-secondary pl-4">Nenhuma crença limitante identificada.</p>}
    </div>
    <div>
      <h3 className="font-semibold text-purple-400 mb-2 flex items-center"><span className="text-xl mr-2">🚀</span>Potencial para Esteira de Produtos / Assinatura:</h3>
      <p className="text-brand-text pl-4">{insights.funnelPotential || "Não especificado."}</p>
    </div>
  </div>
);


export const OutputSection: React.FC<OutputSectionProps> = ({ analysisResult, isLoading }) => {
  const [activeTab, setActiveTab] = useState<'pains' | 'audience' | 'ideas' | 'insights'>('pains');

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!analysisResult) {
    return (
      <div className="text-center py-12 text-brand-text-secondary bg-brand-gray-medium rounded-xl shadow-xl mt-10 p-8">
        <p className="text-2xl mb-4">✨ Analisador Aguardando ✨</p>
        <p className="text-lg">Cole os comentários e clique no botão mágico para revelar:</p>
        <ul className="mt-4 text-left inline-block list-disc list-inside">
            <li>Dores secretas do seu público</li>
            <li>Perfil detalhado de quem comenta</li>
            <li>Ideias de produtos explosivas</li>
            <li>Insights de marketing valiosos</li>
        </ul>
        <p className="mt-6 text-brand-purple animate-pulse">A mágica está a um clique de distância!</p>
      </div>
    );
  }

  const tabs = [
    { id: 'pains', label: 'Dores', emoji: '🎯', component: <PainPointsDisplay items={analysisResult.identifiedPains} /> },
    { id: 'audience', label: 'Público', emoji: '👥', component: <AudienceProfileDisplay profile={analysisResult.audienceProfile} /> },
    { id: 'ideas', label: 'Ideias de Produtos', emoji: '💡', component: (
        <>
            <p className="mb-6 text-brand-text-secondary">Pegada blackzona, comercial e fácil de criar. Preços sugeridos: R$12-R$29 / $5-$9.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {analysisResult.productIdeas.map((idea, index) => (
                <ProductIdeaCard key={index} idea={idea} />
            ))}
            </div>
        </>
    )},
    { id: 'insights', label: 'Insights Extras', emoji: '📊', component: <ExtraInsightsDisplay insights={analysisResult.extraInsights} /> },
  ];

  const currentTab = tabs.find(tab => tab.id === activeTab);

  return (
    <section className="mt-12">
      <div className="mb-1 border-b border-brand-gray-light flex space-x-1 sm:space-x-2" role="tablist" aria-label="Resultados da Análise">
        {tabs.map(tab => (
          <TabButton
            key={tab.id}
            label={tab.label}
            emoji={tab.emoji}
            isActive={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id as 'pains' | 'audience' | 'ideas' | 'insights')}
          />
        ))}
      </div>

      <div className="py-6 px-0 sm:px-2" role="tabpanel" aria-labelledby={`tab-${activeTab}`}>
        {currentTab && (
            <>
                <SectionTitle title={currentTab.label} emoji={currentTab.emoji} className="mt-0 sm:mt-4 mb-8" />
                {currentTab.component}
            </>
        )}
      </div>
    </section>
  );
};
