
import React from 'react';
import { 
  LayoutDashboard, 
  CreditCard, 
  ArrowRightLeft, 
  PieChart, 
  Settings, 
  LogOut,
  Menu,
  X,
  Sparkles,
  Stars
} from 'lucide-react';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
      isActive 
        ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
        : 'text-gray-500 hover:bg-blue-50 hover:text-blue-600'
    }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </button>
);

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  isDemo: boolean;
  onToggleDemo: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, onLogout, isDemo, onToggleDemo }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const tabs = [
    { id: 'dashboard', label: '總覽', icon: <LayoutDashboard size={20} /> },
    { id: 'accounts', label: '銀行帳戶', icon: <CreditCard size={20} /> },
    { id: 'transactions', label: '收支紀錄', icon: <ArrowRightLeft size={20} /> },
    { id: 'reports', label: '財務報表', icon: <PieChart size={20} /> },
    { id: 'horoscope', label: '星座財運', icon: <Stars size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center space-x-2 mb-10">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Sparkles className="text-white" size={24} />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">FinSmart AI</h1>
          </div>

          <nav className="flex-1 space-y-2">
            {tabs.map(tab => (
              <SidebarItem
                key={tab.id}
                icon={tab.icon}
                label={tab.label}
                isActive={activeTab === tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setIsOpen(false);
                }}
              />
            ))}
          </nav>

          <div className="pt-6 border-t border-slate-100 space-y-2">
             <div className="flex items-center justify-between px-4 py-2 bg-slate-100 rounded-lg mb-4">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {isDemo ? '展示模式' : '正式模式'}
                </span>
                <button 
                  onClick={onToggleDemo}
                  className={`w-8 h-4 rounded-full relative transition-colors ${isDemo ? 'bg-blue-500' : 'bg-slate-300'}`}
                >
                  <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${isDemo ? 'right-0.5' : 'left-0.5'}`} />
                </button>
            </div>
            
            <button
              onClick={onLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
            >
              <LogOut size={20} />
              <span className="font-medium">登出</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="h-16 flex items-center justify-between px-8 bg-white border-b border-slate-200 md:hidden">
          <button onClick={() => setIsOpen(true)} className="p-2 -ml-2 text-slate-600">
            <Menu size={24} />
          </button>
          <div className="flex items-center space-x-2">
             <Sparkles className="text-blue-600" size={20} />
             <h1 className="text-lg font-bold">FinSmart</h1>
          </div>
          <div className="w-8" />
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
