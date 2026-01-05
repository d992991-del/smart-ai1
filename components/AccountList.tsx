
import React from 'react';
import { CreditCard, Trash2, Edit2, Plus, AlertCircle } from 'lucide-react';
import { BankAccount } from '../types';

interface AccountListProps {
  accounts: BankAccount[];
  onAddAccount: () => void;
  onEditAccount: (account: BankAccount) => void;
  onDeleteAccount: (id: string) => void;
}

const AccountList: React.FC<AccountListProps> = ({ accounts, onAddAccount, onEditAccount, onDeleteAccount }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">銀行帳戶</h2>
          <p className="text-slate-500">管理您的現金與卡片帳戶</p>
        </div>
        <button 
          onClick={onAddAccount}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          <span>新增帳戶</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.map((acc) => (
          <div 
            key={acc.id} 
            className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group"
          >
            <div 
              className="absolute top-0 left-0 w-1 h-full" 
              style={{ backgroundColor: acc.color }}
            />
            
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-slate-50 text-slate-600 rounded-2xl">
                <CreditCard size={24} />
              </div>
              <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => onEditAccount(acc)}
                  className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                >
                  <Edit2 size={16} />
                </button>
                <button 
                  onClick={() => onDeleteAccount(acc.id)}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{acc.type}</p>
                <h3 className="text-xl font-bold text-slate-900">{acc.name}</h3>
              </div>
              <div>
                <p className="text-slate-400 text-xs">帳戶餘額</p>
                <p className="text-2xl font-black text-slate-900">
                  ${acc.balance.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ))}

        {accounts.length === 0 && (
          <div className="col-span-full py-12 flex flex-col items-center justify-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <AlertCircle className="text-slate-300 mb-2" size={48} />
            <p className="text-slate-500">尚無帳戶資料</p>
            <button 
              onClick={onAddAccount}
              className="mt-4 text-blue-600 font-semibold hover:underline"
            >
              立即新增您的第一個帳戶
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountList;
