
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import AccountList from './components/AccountList';
import TransactionManager from './components/TransactionManager';
import Reports from './components/Reports';
import Horoscope from './components/Horoscope';
import Login from './components/Login';
import { BankAccount, Transaction, User, TransactionType } from './types';
import { MOCK_ACCOUNTS, MOCK_TRANSACTIONS, DEFAULT_CATEGORIES } from './constants';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isDemoMode, setIsDemoMode] = useState(true);
  
  // App State
  const [accounts, setAccounts] = useState<BankAccount[]>(MOCK_ACCOUNTS);
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  
  // Modals / Overlays
  const [showAddTransaction, setShowAddTransaction] = useState(false);

  // Sync state based on mode
  useEffect(() => {
    if (isDemoMode) {
      // In Demo mode, we use constants
      setAccounts(MOCK_ACCOUNTS);
      setTransactions(MOCK_TRANSACTIONS);
    } else {
      // In Production mode, we would fetch from Firebase
      // For this app, we'll use localStorage to simulate a database persistence
      const savedAccounts = localStorage.getItem('fs_accounts');
      const savedTransactions = localStorage.getItem('fs_transactions');
      
      if (savedAccounts) setAccounts(JSON.parse(savedAccounts));
      if (savedTransactions) setTransactions(JSON.parse(savedTransactions));
    }
  }, [isDemoMode]);

  // Persist data if not in demo mode
  useEffect(() => {
    if (!isDemoMode && user) {
      localStorage.setItem('fs_accounts', JSON.stringify(accounts));
      localStorage.setItem('fs_transactions', JSON.stringify(transactions));
    }
  }, [accounts, transactions, isDemoMode, user]);

  const handleLogin = (email: string) => {
    setUser({
      id: 'user-1',
      email,
      displayName: email.split('@')[0]
    });
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab('dashboard');
  };

  const addTransaction = (t: Partial<Transaction>) => {
    const newTransaction: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      accountId: t.accountId!,
      amount: Number(t.amount) || 0,
      type: t.type!,
      category: t.category!,
      date: t.date || new Date().toISOString().split('T')[0],
      note: t.note || '',
    };

    setTransactions(prev => [newTransaction, ...prev]);
    
    // Update balance
    setAccounts(prev => prev.map(acc => {
      if (acc.id === t.accountId) {
        return {
          ...acc,
          balance: t.type === TransactionType.INCOME 
            ? acc.balance + newTransaction.amount 
            : acc.balance - newTransaction.amount
        };
      }
      return acc;
    }));
    setShowAddTransaction(false);
  };

  const deleteAccount = (id: string) => {
    setAccounts(prev => prev.filter(a => a.id !== id));
    setTransactions(prev => prev.filter(t => t.accountId !== id));
  };

  if (!user) {
    return <Login onLogin={handleLogin} onDemoLogin={() => {
      setIsDemoMode(true);
      handleLogin('demo@example.com');
    }} />;
  }

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      onLogout={handleLogout}
      isDemo={isDemoMode}
      onToggleDemo={() => setIsDemoMode(!isDemoMode)}
    >
      {activeTab === 'dashboard' && (
        <Dashboard 
          accounts={accounts} 
          transactions={transactions} 
          onAddTransaction={() => setShowAddTransaction(true)} 
        />
      )}
      
      {activeTab === 'accounts' && (
        <AccountList 
          accounts={accounts} 
          onAddAccount={() => alert("Add account functionality placeholder")}
          onEditAccount={(acc) => console.log('Edit', acc)}
          onDeleteAccount={deleteAccount}
        />
      )}

      {activeTab === 'transactions' && (
        <TransactionManager 
          transactions={transactions} 
          accounts={accounts} 
          categories={DEFAULT_CATEGORIES} 
          onAddTransaction={() => setShowAddTransaction(true)}
        />
      )}

      {activeTab === 'reports' && (
        <Reports transactions={transactions} categories={DEFAULT_CATEGORIES} />
      )}

      {activeTab === 'horoscope' && (
        <Horoscope />
      )}

      {/* Quick Add Transaction Modal (Simplified) */}
      {showAddTransaction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowAddTransaction(false)} />
          <div className="relative bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl animate-in zoom-in duration-200">
            <h3 className="text-2xl font-bold mb-6">新增交易紀錄</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              addTransaction({
                accountId: formData.get('accountId') as string,
                amount: Number(formData.get('amount')),
                type: formData.get('type') as TransactionType,
                category: formData.get('category') as string,
                date: formData.get('date') as string,
                note: formData.get('note') as string,
              });
            }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">類型</label>
                <select name="type" className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500">
                  <option value={TransactionType.EXPENSE}>支出</option>
                  <option value={TransactionType.INCOME}>收入</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">金額</label>
                <input required name="amount" type="number" step="0.01" className="w-full p-3 rounded-xl border border-slate-200" placeholder="0.00" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">帳戶</label>
                <select name="accountId" className="w-full p-3 rounded-xl border border-slate-200">
                  {accounts.map(acc => <option key={acc.id} value={acc.id}>{acc.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">分類</label>
                <select name="category" className="w-full p-3 rounded-xl border border-slate-200">
                  {DEFAULT_CATEGORIES.map(cat => <option key={cat.id} value={cat.name}>{cat.icon} {cat.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">備註</label>
                <input name="note" type="text" className="w-full p-3 rounded-xl border border-slate-200" placeholder="例如：午餐、薪水..." />
              </div>
              <div className="flex space-x-3 pt-4">
                <button type="button" onClick={() => setShowAddTransaction(false)} className="flex-1 py-3 px-4 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50">取消</button>
                <button type="submit" className="flex-1 py-3 px-4 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-shadow">儲存紀錄</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default App;
