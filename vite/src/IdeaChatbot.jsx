import { useState, useRef, useEffect } from "react";

function IdeaChatbot({ activeIdea }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "model", text: `Hello founder. I'm your private AI startup advisor. I've analyzed **${activeIdea?.name || "your idea"}** and I'm ready to answer any strategic questions you have about launching.` }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const suggestions = [
    "Identify my biggest risks",
    "List 3 marketing channels",
    "Explain how to monetize"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isLoading]);

  const handleSend = async (overrideText) => {
    const textToSend = typeof overrideText === 'string' ? overrideText : input;
    if (!textToSend.trim() || !activeIdea) return;

    const userMessage = { role: "user", text: textToSend.trim() };
    const chatHistory = [...messages, userMessage];
    
    setMessages(chatHistory);
    setInput("");
    if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
    }
    setIsLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/ideas/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ideaName: activeIdea.name,
          ideaSummary: activeIdea.summary,
          messages: chatHistory.filter((m, i) => i !== 0) // Skip our initial hardcoded greeting
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMessages(prev => [...prev, { role: "model", text: data.reply }]);
      } else {
        setMessages(prev => [...prev, { role: "model", text: `Error: ${data.error || "Failed to reach AI."}` }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: "model", text: "Network error. Is the server running?" }]);
    }

    setIsLoading(false);
  };

  const handleKeyDown = (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handleSend();
      }
  };

  const handleInput = (e) => {
      setInput(e.target.value);
      e.target.style.height = "auto";
      e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
  };

  // Advanced formatting parsing
  const formatText = (text) => {
    let htmlText = text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-purple-300 font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="text-purple-200 italic">$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-purple-900/60 text-pink-300 px-1.5 py-0.5 rounded text-sm border border-purple-500/30 font-mono">$1</code>')
      .replace(/^\s*[-*]\s+(.*)/gm, '<li class="ml-4 list-disc marker:text-purple-500">$1</li>')
      .replace(/\n/g, '<br/>');
      
    htmlText = htmlText.replace(/(<li.*?>.*?<\/li>(\s*<br\/>\s*)*)+/g, match => `<ul class="my-2 space-y-1 pt-1">${match.replace(/(<br\/>)+/g, '')}</ul>`);

    return <span dangerouslySetInnerHTML={{ __html: htmlText }} />;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Chat Window */}
      {isOpen && (
        <div className="w-96 h-[36rem] mb-4 bg-[#0a0014]/95 backdrop-blur-2xl rounded-3xl shadow-[0_10px_60px_-15px_rgba(128,0,255,0.6)] border border-purple-500/40 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300 ring-1 ring-white/10">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-900/80 to-[#1a0033]/80 p-4 flex justify-between items-center border-b border-purple-500/30">
            <h3 className="text-white font-bold flex items-center gap-3 text-lg">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
              </span>
              AI Co-Founder
            </h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors rounded-full p-2 hover:bg-white/10 flex items-center justify-center h-8 w-8">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-thin scrollbar-thumb-purple-600/50 scrollbar-track-transparent bg-[url('./assets/hero.png')] bg-cover bg-center bg-blend-overlay">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} group`}>
                
                {msg.role === "model" && <div className="flex-shrink-0 w-8 h-8 mr-3 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center shadow-[0_0_15px_rgba(128,0,255,0.4)] text-sm border border-purple-400/50 mt-1 shadow-purple-500/20">AI</div>}
                
                <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-[15px] leading-relaxed shadow-lg backdrop-blur-sm ${
                  msg.role === "user" 
                    ? "bg-gradient-to-br from-purple-600 to-indigo-600 text-white rounded-br-sm shadow-purple-900/20" 
                    : "bg-[#16002a]/90 text-gray-100 border border-purple-500/20 rounded-bl-sm shadow-black/40"
                }`}>
                  {formatText(msg.text)}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start items-end">
                 <div className="flex-shrink-0 w-8 h-8 mr-3 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center shadow-[0_0_15px_rgba(128,0,255,0.4)] text-sm border border-purple-400/50 mt-1 shadow-purple-500/20">AI</div>
                <div className="bg-[#16002a]/90 border border-purple-500/20 px-5 py-4 rounded-2xl rounded-bl-sm flex gap-2 items-center h-10 backdrop-blur-sm">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions / Suggestions */}
          {messages.length === 1 && !isLoading && (
            <div className="px-4 py-3 bg-[#0a0014]/90 flex flex-wrap gap-2 justify-center border-t border-purple-500/10">
              {suggestions.map((suggestion, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(suggestion)}
                  className="text-[13px] bg-purple-900/20 hover:bg-purple-600/50 border border-purple-500/30 text-purple-200 py-1.5 px-4 rounded-full transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(128,0,255,0.2)] font-medium"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 bg-[#0a0014]/95 border-t border-purple-500/30 relative">
            <div className="relative flex items-end gap-2 bg-[#1a0033]/60 rounded-2xl border border-purple-500/30 focus-within:border-purple-400 focus-within:ring-1 focus-within:ring-purple-400/50 transition-all p-1.5 shadow-inner">
                <textarea 
                  ref={textareaRef}
                  value={input}
                  onChange={handleInput}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask for business advice..."
                  className="flex-1 bg-transparent text-white px-3 py-2 text-[15px] focus:outline-none placeholder-gray-500 resize-none min-h-[44px] max-h-[120px] scrollbar-thin scrollbar-thumb-purple-700"
                  rows={1}
                />
                <button 
                  onClick={() => handleSend()}
                  disabled={isLoading || !input.trim()}
                  className="bg-gradient-to-tr from-purple-600 to-indigo-500 hover:from-purple-500 hover:to-indigo-400 disabled:opacity-40 disabled:hover:scale-100 text-white rounded-xl h-[44px] w-[44px] flex items-center justify-center transition-all shadow-[0_0_15px_rgba(128,0,255,0.4)] hover:shadow-[0_0_25px_rgba(128,0,255,0.6)] hover:scale-105"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 translate-x-px -translate-y-px">
                      <path d="M3.478 2.404a.75.75 0 00-.926.941l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.404z" />
                  </svg>
                </button>
            </div>
            <div className="text-center mt-2">
                <span className="text-[10px] text-gray-500">Press Enter ↵ to send • Shift+Enter for new line</span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(128,0,255,0.6)] transition-all duration-300 border-2 hover:scale-110 z-50 overflow-hidden
          ${isOpen 
            ? 'bg-[#0a0014] border-purple-500 text-purple-400 group' 
            : 'bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-500 border-transparent text-white group'}
        `}
      >
        {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 transition-transform group-hover:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
        ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
        )}
      </button>

    </div>
  );
}

export default IdeaChatbot;
