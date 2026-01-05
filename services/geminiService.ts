
import { GoogleGenAI, Type } from "@google/genai";
import { Transaction, BankAccount } from "../types";

const getAI = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey || apiKey === '') {
    console.warn("未偵測到 API_KEY，AI 功能將受限。");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const analyzeFinancialStatus = async (transactions: Transaction[], accounts: BankAccount[]) => {
  const ai = getAI();
  if (!ai) {
    return {
      summary: "目前為離線模式，無法使用 AI 分析功能。",
      tips: ["請於 GitHub Secrets 設定 API_KEY 以啟用功能"],
      healthScore: 0
    };
  }

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
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview", // 依規範使用 Pro Preview 模型
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

    return JSON.parse(response.text || '{}');
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
  const ai = getAI();
  if (!ai) return null;

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

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini 財運預測失敗:", error);
    return null;
  }
};
