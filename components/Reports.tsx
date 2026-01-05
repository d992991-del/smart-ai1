
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Transaction, TransactionType, Category } from '../types';

interface ReportsProps {
  transactions: Transaction[];
  categories: Category[];
}

const Reports: React.FC<ReportsProps> = ({ transactions, categories }) => {
  // Category Breakdown for Expenses
  const expenseData = categories.map(cat => {
    const total = transactions
      .filter(t => t.type === TransactionType.EXPENSE && t.category === cat.name)
      .reduce((sum, t) => sum + t.amount, 0);
    return { name: cat.name, value: total, color: cat.color };
  }).filter(d => d.value > 0);

  // Monthly Breakdown (simplified to current and last month)
  const monthlyData = [
    { name: '上個月', income: 42000, expense: 35000 },
    { name: '本月', income: transactions.filter(t => t.type === TransactionType.INCOME).reduce((s, t) => s + t.amount, 0), 
              expense: transactions.filter(t => t.type === TransactionType.EXPENSE).reduce((s, t) => s + t.amount, 0) },
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#6366f1'];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">財務報表</h2>
        <p className="text-slate-500">深入分析您的消費習慣</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <h4 className="text-lg font-bold text-slate-900 mb-6">支出分類比例</h4>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expenseData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {expenseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <h4 className="text-lg font-bold text-slate-900 mb-6">收支對比</h4>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="income" name="收入" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expense" name="支出" fill="#f43f5e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
