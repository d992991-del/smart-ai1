
import { GoogleGenAI, Type } from "@google/genai";
import { Transaction, BankAccount } from "../types";

// According to guidelines, create a new instance before making an API call to ensure it uses the latest API key.
// Always use new GoogleGenAI({ apiKey: process.env.API_KEY }) directly.

export const analyzeFinancialStatus = async (transactions: Transaction[], accounts: BankAccount[]) => {
  // Fix: Initialize GoogleGenAI with named apiKey parameter using process.env.API_KEY directly.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);
  const recentTransactions = transactions.slice(-10).map(t => `${t.date}: ${t.type} ${t.amount} (${t.category}) - ${t.note}`).join('\n');

  const prompt = `
    請作為一名專業的個人財務顧問，分析以下財務狀況並給予 3-5 個具體的理財建議。
    請用繁體中文回答，並以 JSON 格式回傳。
    
    當前總資產: ${totalBalance} TWD
    近期交易紀錄:
    ${recentTransactions}
  `;

  try {
    // Fix: Use ai.models.generateContent directly with model name and contents.
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview", // Use gemini-3-pro-preview for complex reasoning tasks.
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            tips: { type: Type.ARRAY, items: { type: Type.STRING } },
            healthScore: { type: Type.NUMBER }
          },
          required: ['summary', 'tips', 'healthScore']
        }
      },
    });

    // Fix: Access text directly as a property and trim it.
    const jsonStr = response.text?.trim() || '{}';
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Gemini 財務分析失敗:", error);
    return {
      summary: "AI 分析暫時不可用。",
      tips: ["請稍後再試"],
      healthScore: 50
    };
  }
};

export const getFinancialHoroscope = async (zodiacSign: string) => {
  // Fix: Initialize GoogleGenAI with named apiKey parameter using process.env.API_KEY directly.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    請作為一名專業的占星術與理財專家，為 ${zodiacSign} 提供今日的財運預測。
    包含：財運總覽、指數、幸運色、幸運數字、理財建議。
    請用繁體中文回答，並以 JSON 格式回傳。
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            overview: { type: Type.STRING },
            fortuneScore: { type: Type.NUMBER },
            luckyColor: { type: Type.STRING },
            luckyNumber: { type: Type.STRING },
            do: { type: Type.STRING },
            dont: { type: Type.STRING }
          },
          required: ['overview', 'fortuneScore', 'luckyColor', 'luckyNumber', 'do', 'dont']
        }
      },
    });

    // Fix: Access text directly as a property and trim it.
    const jsonStr = response.text?.trim() || '{}';
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Gemini 財運預測失敗:", error);
    return null;
  }
};
