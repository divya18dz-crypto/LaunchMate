import { useState, useEffect } from "react";
import Home from "./Home";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Input from "./Input";
import LearnMore from "./LearnMore";
import CustomCursor from "./CustomCursor";
import Product from "./Product";
import Features from "./Features";
import History from "./History";
import Toast from "./components/Toast";

function App() {
  const [page, setPage] = useState("home");
  const [activeIdea, setActiveIdea] = useState(null); // Stores Gemini analysis
  const [toast, setToast] = useState(null);

  // Global Toast Trigger
  const showToast = (message, type = "error") => {
    setToast({ message, type });
  };

  // Session Persistence on Mount
  useEffect(() => {
    const token = localStorage.getItem("launchmate_token");
    if (token) {
      setPage("input"); // Skip home/login if already authenticated
    }
  }, []);

  let CurrentPage;

  if (page === "home") CurrentPage = <Home setPage={setPage} />;
  else if (page === "login") CurrentPage = <Login setPage={setPage} showToast={showToast} />;
  else if (page === "dashboard") CurrentPage = <Dashboard activeIdea={activeIdea} setPage={setPage} showToast={showToast} />;
  else if (page === "input") CurrentPage = <Input setPage={setPage} setActiveIdea={setActiveIdea} showToast={showToast} />;
  else if (page === "learn") CurrentPage = <LearnMore setPage={setPage} />;
  else if (page === "product") CurrentPage = <Product setPage={setPage} />;
  else if (page === "features") CurrentPage = <Features setPage={setPage} />;
  else if (page === "history") CurrentPage = <History setPage={setPage} setActiveIdea={setActiveIdea} showToast={showToast} />;
  else CurrentPage = <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>;

  return (
    <div className="cursor-none">
      <CustomCursor />
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      {CurrentPage}
    </div>
  );
}

export default App;