import { useEffect } from 'react';
import { X, Trophy, Star, CheckCircle2, AlertCircle } from 'lucide-react';

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'info' | 'achievement';
  title: string;
  message?: string;
  duration?: number;
}

interface ToastProps {
  toast: Toast;
  onClose: (id: string) => void;
}

export default function ToastComponent({ toast, onClose }: ToastProps) {
  useEffect(() => {
    if (toast.duration !== 0) {
      const timer = setTimeout(() => {
        onClose(toast.id);
      }, toast.duration || 5000);

      return () => clearTimeout(timer);
    }
  }, [toast, onClose]);

  const iconMap = {
    success: CheckCircle2,
    error: AlertCircle,
    info: Star,
    achievement: Trophy,
  };

  const colorMap = {
    success: 'from-green-500/20 to-emerald-500/20 border-green-500/50 text-green-400',
    error: 'from-red-500/20 to-pink-500/20 border-red-500/50 text-red-400',
    info: 'from-blue-500/20 to-cyan-500/20 border-blue-500/50 text-blue-400',
    achievement: 'from-yellow-500/20 to-amber-500/20 border-yellow-500/50 text-yellow-400',
  };

  const Icon = iconMap[toast.type];

  return (
    <div
      className={`bg-gradient-to-br ${colorMap[toast.type]} border rounded-xl p-4 shadow-lg min-w-[300px] max-w-md animate-slide-in-right`}
    >
      <div className="flex items-start space-x-3">
        <Icon className={`w-5 h-5 ${colorMap[toast.type].split(' ')[3]} flex-shrink-0 mt-0.5`} />
        <div className="flex-1">
          <h4 className="font-semibold text-white mb-1">{toast.title}</h4>
          {toast.message && <p className="text-sm text-gray-300">{toast.message}</p>}
        </div>
        <button
          onClick={() => onClose(toast.id)}
          className="text-gray-400 hover:text-white transition-colors flex-shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

interface ToastContainerProps {
  toasts: Toast[];
  onClose: (id: string) => void;
}

export function ToastContainer({ toasts, onClose }: ToastContainerProps) {
  return (
    <div className="fixed top-20 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <ToastComponent key={toast.id} toast={toast} onClose={onClose} />
      ))}
    </div>
  );
}

