
import React from 'react';
import { Transaction, TransactionType, BankAccount, Category } from '../types';
import { Search, Filter, ArrowUpRight, ArrowDownLeft, Calendar } from 'lucide-react';

interface TransactionManagerProps {
  transactions: Transaction[];
  accounts: BankAccount[];
  categories: Category[];
  onAddTransaction: () => void;
}

const TransactionManager: React.FC<TransactionManagerProps> = ({ transactions, accounts, categories, onAddTransaction }) => {
  const [filterType, setFilterType] = React.useState<TransactionType | 'ALL'>('ALL');
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredTransactions = transactions.filter(t => {
    const matchesType = filterType === 'ALL' || t.type === filterType;
    const matchesSearch = t.note.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">收支紀錄</h2>
          <p className="text-slate-500">記錄您的每一筆金流</p>
        </div>
        <button 
          onClick={onAddTransaction}
          className="bg-blue-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
        >
          新增交易
        </button>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="搜尋交易內容或分類..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex bg-slate-100 p-1 rounded-xl">
            {(['ALL', TransactionType.INCOME, TransactionType.EXPENSE] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  filterType === type 
                    ? 'bg-white text-slate-900 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {type === 'ALL' ? '全部' : type === TransactionType.INCOME ? '收入' : '支出'}
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-slate-400 text-sm uppercase tracking-wider">
                <th className="pb-4 px-4 font-semibold">日期</th>
                <th className="pb-4 px-4 font-semibold">分類</th>
                <th className="pb-4 px-4 font-semibold">描述</th>
                <th className="pb-4 px-4 font-semibold">帳戶</th>
                <th className="pb-4 px-4 font-semibold text-right">金額</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredTransactions.map((t) => {
                const account = accounts.find(a => a.id === t.accountId);
                return (
                  <tr key={t.id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center text-slate-600 font-medium">
                        <Calendar size={14} className="mr-2 text-slate-400" />
                        {t.date}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
                        {t.category}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-semibold text-slate-900">{t.note}</td>
                    <td className="py-4 px-4">
                      <span className="text-slate-500 text-sm">{account?.name || '未知帳戶'}</span>
                    </td>
                    <td className={`py-4 px-4 text-right font-black ${t.type === TransactionType.INCOME ? 'text-green-600' : 'text-slate-900'}`}>
                      <div className="flex items-center justify-end">
                        {t.type === TransactionType.INCOME ? <ArrowDownLeft size={16} className="mr-1" /> : <ArrowUpRight size={16} className="mr-1" />}
                        ${t.amount.toLocaleString()}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          
          {filteredTransactions.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-slate-400">找不到符合條件的交易紀錄</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionManager;
