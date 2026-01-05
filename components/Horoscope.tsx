
import React, { useState } from 'react';
import { Stars, Loader2, Sparkles, CheckCircle2, XCircle, Palette, Hash } from 'lucide-react';
import { ZODIAC_SIGNS } from '../constants';
import { getFinancialHoroscope } from '../services/geminiService';

const Horoscope: React.FC = () => {
  const [selectedSign, setSelectedSign] = useState<string | null>(null);
  const [horoscope, setHoroscope] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleFetchHoroscope = async (sign: string) => {
    setSelectedSign(sign);
    setLoading(true);
    const data = await getFinancialHoroscope(sign);
    setHoroscope(data);
    setLoading(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">星座財運</h2>
        <p className="text-slate-500">AI 占星術為您指引今日的金錢運勢</p>
      </div>

      {!selectedSign || !horoscope ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {ZODIAC_SIGNS.map((sign) => (
            <button
              key={sign.name}
              onClick={() => handleFetchHoroscope(sign.name)}
              disabled={loading && selectedSign === sign.name}
              className={`p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-md hover:border-blue-200 transition-all text-center group ${
                loading && selectedSign === sign.name ? 'opacity-50' : ''
              }`}
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                {loading && selectedSign === sign.name ? (
                  <Loader2 className="animate-spin mx-auto text-blue-600" size={40} />
                ) : (
                  sign.icon
                )}
              </div>
              <h4 className="font-bold text-slate-900">{sign.name}</h4>
              <p className="text-xs text-slate-400 mt-1">{sign.date}</p>
            </button>
          ))}
        </div>
      ) : (
        <div className="max-w-3xl mx-auto space-y-6">
          <button 
            onClick={() => { setSelectedSign(null); setHoroscope(null); }}
            className="text-blue-600 font-semibold text-sm flex items-center hover:underline"
          >
            ← 重新選擇星座
          </button>

          <div className="bg-white rounded-3xl border border-slate-100 shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Stars size={120} />
              </div>
              <div className="relative z-10">
                <div className="text-6xl mb-2">{ZODIAC_SIGNS.find(s => s.name === selectedSign)?.icon}</div>
                <h3 className="text-3xl font-bold">{selectedSign} 今日財運</h3>
                <p className="text-blue-100 mt-2">{new Date().toLocaleDateString()}</p>
              </div>
            </div>

            <div className="p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-50 p-4 rounded-2xl text-center">
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">今日財運指數</p>
                  <div className="text-3xl font-black text-blue-600">{horoscope.fortuneScore}%</div>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl text-center">
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1 flex items-center justify-center">
                    <Palette size={12} className="mr-1" /> 幸運色
                  </p>
                  <div className="text-xl font-bold text-slate-800">{horoscope.luckyColor}</div>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl text-center">
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1 flex items-center justify-center">
                    <Hash size={12} className="mr-1" /> 幸運數字
                  </p>
                  <div className="text-xl font-bold text-slate-800">{horoscope.luckyNumber}</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-indigo-600 font-bold text-lg">
                  <Sparkles size={20} />
                  <h4>運勢分析</h4>
                </div>
                <p className="text-slate-600 leading-relaxed text-lg italic">
                  "{horoscope.overview}"
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="p-6 bg-green-50 border border-green-100 rounded-2xl space-y-2">
                  <div className="flex items-center text-green-700 font-bold">
                    <CheckCircle2 size={18} className="mr-2" />
                    今日該做
                  </div>
                  <p className="text-green-800 text-sm">{horoscope.do}</p>
                </div>
                <div className="p-6 bg-rose-50 border border-rose-100 rounded-2xl space-y-2">
                  <div className="flex items-center text-rose-700 font-bold">
                    <XCircle size={18} className="mr-2" />
                    今日忌諱
                  </div>
                  <p className="text-rose-800 text-sm">{horoscope.dont}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Horoscope;
