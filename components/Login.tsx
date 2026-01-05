
import React, { useState } from 'react';
import { Sparkles, Mail, Lock, Loader2, Eye, EyeOff } from 'lucide-react';

interface LoginProps {
  onLogin: (email: string) => void;
  onDemoLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onDemoLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate Firebase / Database latency
    setTimeout(() => {
      if (email && password.length >= 6) {
        onLogin(email);
      } else {
        setError('請輸入有效的電子郵件且密碼長度至少 6 位');
      }
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Visual Side */}
      <div className="hidden md:flex md:w-1/2 bg-blue-600 relative overflow-hidden items-center justify-center p-12">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
           <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
           <div className="absolute bottom-0 right-0 w-80 h-80 bg-white rounded-full translate-x-1/3 translate-y-1/3" />
        </div>
        <div className="relative z-10 text-white space-y-8 max-w-lg">
          <div className="flex items-center space-x-3 mb-4">
             <div className="p-3 bg-white/20 backdrop-blur-lg rounded-2xl">
                <Sparkles size={32} />
             </div>
             <h1 className="text-4xl font-bold tracking-tight">FinSmart AI</h1>
          </div>
          <h2 className="text-5xl font-black leading-tight">掌握每一分錢，預見更好的未來。</h2>
          <p className="text-xl text-blue-100/80 leading-relaxed">
            透過 AI 驅動的財務管理系統，我們幫助您追蹤收支、管理多個帳戶，並提供個人化的理財建議。
          </p>
          <div className="flex space-x-4 pt-4">
            <div className="bg-white/10 backdrop-blur p-4 rounded-2xl">
               <p className="text-2xl font-bold">100%</p>
               <p className="text-xs text-blue-200 uppercase tracking-widest font-bold">資料安全</p>
            </div>
            <div className="bg-white/10 backdrop-blur p-4 rounded-2xl">
               <p className="text-2xl font-bold">Smart</p>
               <p className="text-xs text-blue-200 uppercase tracking-widest font-bold">AI 分析</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Side */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center md:text-left space-y-2">
             <h3 className="text-3xl font-bold text-slate-900">{isRegistering ? '建立新帳號' : '歡迎回來'}</h3>
             <p className="text-slate-500">{isRegistering ? '加入我們，開始智慧理財之旅' : '請登入您的帳號以繼續'}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 text-red-600 text-sm rounded-xl font-medium border border-red-100">
                {error}
              </div>
            )}
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="email"
                  required
                  placeholder="電子郵件"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="密碼"
                  className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={24} />
                  <span>處理中...</span>
                </>
              ) : (
                <span>{isRegistering ? '立即註冊' : '登入帳號'}</span>
              )}
            </button>
          </form>

          <div className="relative">
             <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
             </div>
             <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-slate-400">或</span>
             </div>
          </div>

          <button
            onClick={onDemoLogin}
            className="w-full py-4 border-2 border-slate-100 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            以展示模式登入 (Demo Mode)
          </button>

          <p className="text-center text-slate-500">
            {isRegistering ? '已經有帳號了？' : '還沒有帳號？'}{' '}
            <button
              onClick={() => setIsRegistering(!isRegistering)}
              className="text-blue-600 font-bold hover:underline"
            >
              {isRegistering ? '立即登入' : '免費註冊'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
