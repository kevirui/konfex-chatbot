import React, { useState, useRef, useEffect } from "react";
import { Send, Bot } from "lucide-react";
import { useBudgetChat } from "../hooks/useBudgetChat";

const App = () => {
  const { messages, sendMessage, isLoading, submitBudget } = useBudgetChat();
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll al fondo cada vez que cambian los mensajes
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    sendMessage(inputValue);
    setInputValue("");
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100 h-[600px]">
      {/* Header */}
      <div className="bg-blue-600 p-4 text-white flex items-center gap-2 shadow-sm">
        <Bot className="w-6 h-6" />
        <div>
          <h2 className="font-bold text-lg">Asistente de Ventas</h2>
          <p className="text-xs text-blue-100 opacity-80">En línea</p>
        </div>
      </div>

      {/* Área de Mensajes */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex w-full ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`flex max-w-[80%] rounded-2xl p-3 px-4 shadow-sm text-sm ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-white text-gray-800 border border-gray-200 rounded-bl-none"
              }`}
            >
              <p>{msg.text}</p>
            </div>
          </div>
        ))}

        {/* Indicador de "Escribiendo..." */}
        {isLoading && (
          <div className="flex justify-start animate-pulse">
            <div className="bg-gray-200 text-gray-500 rounded-2xl rounded-bl-none p-3 text-xs">
              Escribiendo...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form
        onSubmit={handleSubmit}
        className="p-4 bg-white border-t border-gray-100 flex gap-2"
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Escribe tu consulta..."
          className="flex-1 bg-gray-100 border-0 rounded-full px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
        />
        <button
          type="submit"
          disabled={!inputValue.trim() || isLoading}
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>

      {/* Submit Budget Button */}
      {}
    </div>
  );
};

export default App;
