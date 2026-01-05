
import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  Plus, 
  ArrowRight,
  BrainCircuit,
  Loader2
} from 'lucide-react';
import { BankAccount, Transaction, TransactionType } from '../types';
import { analyzeFinancialStatus } from '../services/geminiService';

interface DashboardProps {
  accounts: BankAccount[];
  transactions: Transaction[];
  onAddTransaction: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ accounts, transactions, onAddTransaction }) => {
  const [aiAnalysis, setAiAnalysis] = React.useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);
  
  const currentMonth = new Date().getMonth();
  const monthlyTransactions = transactions.filter(t => new Date(t.date).getMonth() === currentMonth);
  
  const monthlyIncome = monthlyTransactions
    .filter(t => t.type === TransactionType.INCOME)
    .reduce((sum, t) => sum + t.amount, 0);
    
  const monthlyExpense = monthlyTransactions
    .filter(t => t.type === TransactionType.EXPENSE)
    .reduce((sum, t) => sum + t.amount, 0);

  const handleAiAnalysis = async () => {
    setIsAnalyzing(true);
    const result = await analyzeFinancialStatus(transactions, accounts);
    setAiAnalysis(result);
    setIsAnalyzing(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">歡迎回來 👋</h2>
          <p className="text-slate-500">這是您目前的財務概況</p>
        </div>
        <button 
          onClick={onAddTransaction}
          className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl shadow-lg shadow-blue-200 transition-all active:scale-95"
        >
          <Plus size={20} />
          <span className="font-semibold">新增紀錄</span>
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
              <Wallet size={24} />
            </div>
            <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">總資產</span>
          </div>
          <div className="space-y-1">
            <p className="text-slate-500 text-sm font-medium">總帳戶餘額</p>
            <h3 className="text-2xl font-bold text-slate-900">
              ${totalBalance.toLocaleString()} <span className="text-sm text-slate-400 font-normal">TWD</span>
            </h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-50 text-green-600 rounded-2xl">
              <TrendingUp size={24} />
            </div>
            <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">本月收入</span>
          </div>
          <div className="space-y-1">
            <p className="text-slate-500 text-sm font-medium">Monthly Income</p>
            <h3 className="text-2xl font-bold text-slate-900">
              +${monthlyIncome.toLocaleString()}
            </h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl">
              <TrendingDown size={24} />
            </div>
            <span className="text-sm font-medium text-rose-600 bg-rose-50 px-3 py-1 rounded-full">本月支出</span>
          </div>
          <div className="space-y-1">
            <p className="text-slate-500 text-sm font-medium">Monthly Expenses</p>
            <h3 className="text-2xl font-bold text-slate-900">
              -${monthlyExpense.toLocaleString()}
            </h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Transactions */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-xl font-bold text-slate-900">最近交易紀錄</h4>
            <button className="text-blue-600 font-medium flex items-center space-x-1 hover:underline">
              <span>查看全部</span>
              <ArrowRight size={16} />
            </button>
          </div>
          <div className="space-y-4">
            {transactions.slice(0, 5).map((t) => (
              <div key={t.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 transition-colors hover:border-blue-200">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 flex items-center justify-center rounded-xl bg-white shadow-sm text-xl`}>
                    {t.type === TransactionType.INCOME ? '💰' : '🏷️'}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{t.note || t.category}</p>
                    <p className="text-sm text-slate-500">{t.date}</p>
                  </div>
                </div>
                <div className={`text-lg font-bold ${t.type === TransactionType.INCOME ? 'text-green-600' : 'text-slate-900'}`}>
                  {t.type === TransactionType.INCOME ? '+' : '-'}${t.amount.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Financial Advisor */}
        <div className="bg-indigo-600 p-8 rounded-3xl text-white shadow-xl shadow-indigo-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
             <BrainCircuit size={120} />
          </div>
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-indigo-500 rounded-lg">
                <BrainCircuit size={24} />
              </div>
              <h4 className="text-xl font-bold">AI 智慧理財助理</h4>
            </div>
            
            {!aiAnalysis ? (
              <div className="flex-1 flex flex-col items-center justify-center space-y-4 py-6">
                <p className="text-center text-indigo-100 text-lg">讓 Gemini AI 為您分析目前的財務狀況並提供建議</p>
                <button 
                  onClick={handleAiAnalysis}
                  disabled={isAnalyzing}
                  className="bg-white text-indigo-600 px-8 py-3 rounded-2xl font-bold shadow-lg flex items-center space-x-2 hover:bg-indigo-50 transition-colors disabled:opacity-50"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      <span>分析中...</span>
                    </>
                  ) : (
                    <span>立即分析</span>
                  )}
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-indigo-100 font-medium">財務健康分數</span>
                    <span className="text-2xl font-bold">{aiAnalysis.healthScore}/100</span>
                  </div>
                  <div className="w-full bg-indigo-500/50 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-white h-full transition-all duration-1000" 
                      style={{ width: `${aiAnalysis.healthScore}%` }} 
                    />
                  </div>
                </div>
                <div className="bg-indigo-500/30 p-4 rounded-2xl">
                  <p className="text-indigo-50 leading-relaxed italic">
                    "{aiAnalysis.summary}"
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="font-bold text-indigo-100 text-sm uppercase tracking-wider">AI 具體建議</p>
                  <ul className="space-y-2">
                    {aiAnalysis.tips.map((tip: string, idx: number) => (
                      <li key={idx} className="flex items-start space-x-2 text-indigo-50">
                        <span className="mt-1 flex-shrink-0 w-1.5 h-1.5 bg-white rounded-full" />
                        <span className="text-sm">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button 
                  onClick={handleAiAnalysis}
                  className="text-indigo-200 text-sm hover:text-white transition-colors flex items-center space-x-1"
                >
                  <Plus size={14} />
                  <span>重新分析數據</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
