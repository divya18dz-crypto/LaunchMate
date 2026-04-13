import { useEffect } from "react";

function Toast({ message, type = "error", onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === "error" ? "bg-red-500/20 border-red-500/50" : "bg-emerald-500/20 border-emerald-500/50";
  const textColor = type === "error" ? "text-red-200" : "text-emerald-200";
  const icon = type === "error" ? "⚠️" : "✅";

  return (
    <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-[9999] px-6 py-3 rounded-xl border backdrop-blur-md shadow-2xl transition-all animate-in slide-in-from-top-10 duration-500 ${bgColor} ${textColor} flex items-center gap-3 min-w-[300px] justify-center`}>
      <span className="text-xl">{icon}</span>
      <span className="font-medium">{message}</span>
      <button 
        onClick={onClose}
        className="ml-4 text-white/50 hover:text-white transition-colors"
      >
        &times;
      </button>
    </div>
  );
}

export default Toast;
