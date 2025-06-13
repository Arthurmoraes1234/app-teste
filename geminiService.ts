
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import type { AnalysisResult } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("API_KEY não encontrada. Defina process.env.API_KEY no seu ambiente.");
  // Depending on the execution environment, this might not stop the app if not handled by the caller.
  // For a client-side app, this check helps in development.
}

const ai = new GoogleGenAI({ apiKey: API_KEY || "MISSING_API_KEY" }); // Fallback to prevent crash if undefined, error will be caught later

const MODEL_NAME = 'gemini-2.5-flash-preview-04-17';

const generatePrompt = (rawComments: string): string => `
Você é um especialista em análise de sentimentos e tendências de mercado, focado em identificar oportunidades de negócios a partir de comentários de mídias sociais.
Sua tarefa é processar o texto bruto fornecido, que é uma colagem de comentários do YouTube ou TikTok, e extrair informações valiosas.
Ignore qualquer texto que não seja um comentário real (nomes de usuário, datas, curtidas, metadados, etc.).

Analise os comentários reais e forneça a seguinte estrutura em formato JSON. NÃO inclua nenhuma explicação fora do JSON. O JSON DEVE ser o único conteúdo na sua resposta.
O JSON deve seguir RIGOROSAMENTE esta estrutura:

{
  "identifiedPains": [
    { "pain": "string", "context": "string" }
  ],
  "audienceProfile": {
    "gender": "string",
    "ageRange": "string",
    "lifestyle": "string",
    "lifeStage": "string",
    "wantsToAvoid": "string"
  },
  "productIdeas": [
    {
      "name": "string",
      "promise": "string",
      "format": "string",
      "content": "string",
      "price": "string",
      "creationDifficulty": "string",
      "mentalTrigger": "string"
    }
  ],
  "extraInsights": {
    "repeatedPhrases": ["string"],
    "limitingBeliefs": ["string"],
    "funnelPotential": "string"
  }
}

Aqui estão as instruções detalhadas para cada campo:

1.  "identifiedPains": Liste de 5 a 10 dores fortes. Use linguagem emocional, como o público escreveu.
    Para cada dor, inclua 'pain' (a dor) e 'context' (breve explicação do contexto).
    Exemplo: { "pain": "Me sinto completamente perdido na academia, não sei quais exercícios fazer.", "context": "Usuário expressa frustração com a falta de direção em treinos." }

2.  "audienceProfile": Detalhe o perfil do público-alvo.
    "gender": "Gênero predominante (ex: 'Masculino', 'Feminino', 'Misto com predominância X')"
    "ageRange": "Faixa etária estimada (ex: '18-25 anos', '25-35 anos')"
    "lifestyle": "Estilo de vida ou hábitos (ex: 'Jovens universitários buscando renda extra', 'Mães recentes procurando formas de autocuidado')"
    "lifeStage": "Em que momento de vida essas pessoas estão? (ex: 'Início de carreira', 'Transição profissional', 'Buscando primeiro relacionamento sério')"
    "wantsToAvoid": "O que elas querem evitar a qualquer custo? (ex: 'Continuar sentindo-se estagnado', 'Perder mais tempo com soluções que não funcionam', 'Ser enganado novamente')"

3.  "productIdeas": Crie 5 ideias de produtos digitais low ticket (R$12-R$29 ou $5-$9) detalhadas.
    As ideias devem ser ousadas, fáceis de criar, comerciais e agressivas (pegada blackzona).
    Para cada produto:
      "name": "Nome apelativo e comercial"
      "promise": "Promessa principal forte, estilo blackzona (ex: 'O Guia Definitivo para Destruir Sua Procrastinação em 7 Dias e Dobrar Sua Produtividade')"
      "format": "Formato da entrega (ex: 'PDF e checklists', 'Série de 5 vídeos curtos + templates', 'Áudiobook + Planilha de Acompanhamento', 'Prompt de IA + Guia de Uso')"
      "content": "Conteúdo exato do produto (liste os principais tópicos ou módulos)"
      "price": "Preço sugerido (ex: 'R$19', '$7')"
      "creationDifficulty": "Nível de dificuldade de criação (ex: 'Sozinho em 2 dias', 'Com IA em 1 dia', 'Freelancer para design, conteúdo em 3 dias')"
      "mentalTrigger": "Gatilho mental predominante (ex: 'Urgência', 'Prova Social', 'Escassez', 'Novidade', 'Prazer', 'Status')"
    Exemplo de produto:
    {
      "name": "Desbloqueador de Rizz Imbatível",
      "promise": "Conquiste QUALQUER pessoa com estas 3 mensagens secretas que 99% dos homens desconhecem. Testado e validado.",
      "format": "Guia em PDF + 3 Templates de Mensagem Copia-e-Cola",
      "content": "1. A Psicologia da Atração Instantânea. 2. Os 3 Tipos de Mensagens Magnéticas. 3. Templates 'CTRL+C, CTRL+V' para WhatsApp e Instagram. Bônus: Como manter o interesse.",
      "price": "R$27",
      "creationDifficulty": "Sozinho em 1 dia (conteúdo) + IA para capa",
      "mentalTrigger": "Curiosidade + Prazer"
    }

4.  "extraInsights": Insights adicionais baseados nos comentários.
    "repeatedPhrases": Liste 3-5 palavras ou frases comuns nos comentários, úteis para copy. (ex: "não aguento mais", "preciso de ajuda urgente")
    "limitingBeliefs": Liste 2-3 crenças limitantes comuns identificadas. (ex: "isso é muito difícil para mim", "já tentei de tudo e nada funciona")
    "funnelPotential": "Breve descrição do potencial para esteira de produtos ou assinatura (ex: 'Alto potencial para upsell com mentoria individual ou curso completo sobre X', 'Pode evoluir para comunidade de assinatura com conteúdo semanal')"

A seguir, o texto bruto dos comentários para análise:
---
${rawComments}
---
Lembre-se, sua resposta DEVE SER APENAS o JSON formatado, seguindo a estrutura especificada.
`;

export const analyzeCommentsWithGemini = async (rawComments: string): Promise<AnalysisResult> => {
  if (!API_KEY || API_KEY === "MISSING_API_KEY") {
    throw new Error("API Key do Gemini não configurada. Verifique suas variáveis de ambiente.");
  }
  
  const fullPrompt = generatePrompt(rawComments);

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: fullPrompt,
        config: {
            responseMimeType: "application/json",
            temperature: 0.5, // Slightly creative but still factual for analysis
        }
    });
    
    let jsonStr = response.text.trim();
    
    // Remove potential markdown fences if Gemini wraps the JSON
    const fenceRegex = /^```(?:json)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[1]) {
      jsonStr = match[1].trim();
    }

    try {
      const parsedData = JSON.parse(jsonStr) as AnalysisResult;
      // Basic validation of structure
      if (!parsedData.identifiedPains || !parsedData.audienceProfile || !parsedData.productIdeas || !parsedData.extraInsights) {
        console.error("Resposta JSON não contem todos os campos esperados:", parsedData);
        throw new Error("Formato de resposta da IA inválido. Estrutura de dados incompleta.");
      }
      return parsedData;
    } catch (e) {
      console.error("Falha ao parsear JSON da resposta da IA:", e, "String recebida:", jsonStr);
      throw new Error(`Falha ao processar resposta da IA. Verifique o formato do JSON. Detalhes: ${(e as Error).message}`);
    }

  } catch (error) {
    console.error("Erro ao chamar API Gemini:", error);
    if (error instanceof Error && error.message.includes("API key not valid")) {
        throw new Error("API Key do Gemini inválida. Por favor, verifique.");
    }
    throw new Error(`Erro na comunicação com a API Gemini: ${(error as Error).message}`);
  }
};
