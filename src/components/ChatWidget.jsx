import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import API from "../api"; // Assuming your axios instance is here

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you with gems or tools today?", sender: "ai" }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      // 🔹 Calls your Backend: router.post("/", verifyToken, authorize(["admin", "user"]), askBot);
      const res = await API.post("/chat", { message: input });
      
      const aiMsg = { text: res.data.reply, sender: "ai" };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      const status = err.response?.status;
      const serverMsg = err.response?.data?.message;
      let fallback = "Sorry, I'm having trouble connecting.";

      if (status === 401) fallback = "Please log in to use chat.";
      if (status === 404) fallback = "Chat service not found.";
      if (status === 500) fallback = "Chat service error. Try again.";

      setMessages((prev) => [...prev, { text: serverMsg || fallback, sender: "ai" }]);
      console.error("Chat error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* CHAT BOX */}
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 h-[450px] bg-white rounded-2xl shadow-2xl border flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
          <div className="bg-slate-900 p-4 text-white flex justify-between items-center">
            <div>
              <h3 className="font-bold text-sm">Gemora Assistant</h3>
              <p className="text-[10px] text-yellow-500">Online | Gem Expert</p>
            </div>
            <button onClick={() => setIsOpen(false)}><X size={20} /></button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto bg-slate-50 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm shadow-sm ${
                  msg.sender === "user" ? "bg-yellow-500 text-black rounded-tr-none" : "bg-white text-slate-700 border rounded-tl-none"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border p-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2 text-xs text-slate-400">
                  <Loader2 size={14} className="animate-spin" /> Thinking...
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </div>

          <form onSubmit={handleSend} className="p-3 border-t bg-white flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Sapphires, Loupes..." 
              className="flex-1 border rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <button type="submit" className="bg-slate-900 text-white p-2 rounded-full hover:bg-slate-800">
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      {/* FLOATING TOGGLE BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-slate-900 hover:bg-slate-800 text-yellow-500 p-4 rounded-full shadow-lg transition-all hover:scale-110 active:scale-95"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>
    </div>
  );
}