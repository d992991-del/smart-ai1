
import { Category, BankAccount, Transaction, TransactionType } from './types';

export const DEFAULT_CATEGORIES: Category[] = [
  { id: '1', name: '飲食', icon: '🍔', color: 'bg-orange-500' },
  { id: '2', name: '交通', icon: '🚗', color: 'bg-blue-500' },
  { id: '3', name: '購物', icon: '🛍️', color: 'bg-pink-500' },
  { id: '4', name: '娛樂', icon: '🎮', color: 'bg-purple-500' },
  { id: '5', name: '薪資', icon: '💰', color: 'bg-green-500' },
  { id: '6', name: '居住', icon: '🏠', color: 'bg-indigo-500' },
  { id: '7', name: '醫療', icon: '🏥', color: 'bg-red-500' },
  { id: '8', name: '投資', icon: '📈', color: 'bg-teal-500' },
];

export const MOCK_ACCOUNTS: BankAccount[] = [
  { id: 'acc-1', name: '玉山銀行', balance: 50000, color: '#10b981', type: 'Checking' },
  { id: 'acc-2', name: '台新 Richart', balance: 120000, color: '#f43f5e', type: 'Savings' },
  { id: 'acc-3', name: '中信 LinePay 卡', balance: -1250, color: '#3b82f6', type: 'Credit Card' },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 't-1', accountId: 'acc-1', amount: 150, type: TransactionType.EXPENSE, category: '飲食', date: new Date().toISOString().split('T')[0], note: '午餐牛肉麵' },
  { id: 't-2', accountId: 'acc-2', amount: 45000, type: TransactionType.INCOME, category: '薪資', date: new Date().toISOString().split('T')[0], note: '11月薪資' },
  { id: 't-3', accountId: 'acc-1', amount: 1200, type: TransactionType.EXPENSE, category: '居住', date: new Date().toISOString().split('T')[0], note: '水電費' },
  { id: 't-4', accountId: 'acc-3', amount: 500, type: TransactionType.EXPENSE, category: '交通', date: new Date().toISOString().split('T')[0], note: '加油' },
];

export const ZODIAC_SIGNS = [
  { name: '牡羊座', icon: '♈', date: '3/21 - 4/19' },
  { name: '金牛座', icon: '♉', date: '4/20 - 5/20' },
  { name: '雙子座', icon: '♊', date: '5/21 - 6/20' },
  { name: '巨蟹座', icon: '♋', date: '6/21 - 7/22' },
  { name: '獅子座', icon: '♌', date: '7/23 - 8/22' },
  { name: '處女座', icon: '♍', date: '8/23 - 9/22' },
  { name: '天秤座', icon: '♎', date: '9/23 - 10/22' },
  { name: '天蠍座', icon: '♏', date: '10/23 - 11/21' },
  { name: '射手座', icon: '♐', date: '11/22 - 12/21' },
  { name: '摩羯座', icon: '♑', date: '12/22 - 1/19' },
  { name: '水瓶座', icon: '♒', date: '1/20 - 2/18' },
  { name: '雙魚座', icon: '♓', date: '2/19 - 3/20' },
];
