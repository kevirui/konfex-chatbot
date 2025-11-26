import { useState } from "react";
import type { BudgetDraft, ChatMessage } from "../types/budget";

export const useBudgetChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState<BudgetDraft>({
    step: "greeting",
    items: [],
    clientInfo: {},
    isReadyToSubmit: false,
  });

  // Función simulada de "Backend/IA"
  const processUserMessage = async (text: string) => {
    // 1. Añadir mensaje del usuario a la UI
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text,
    };
    setMessages((prev) => [...prev, userMsg]);

    // 2. Lógica de procesamiento (Aquí iría la llamada a OpenAI o tu lógica switch/case)
    // SIMULACIÓN DE IA:
    let botResponseText = "";

    if (draft.step === "greeting") {
      botResponseText = "¡Hola! ¿Qué producto te interesa cotizar hoy?";
      setDraft((prev) => ({ ...prev, step: "product_selection" }));
    } else if (draft.step === "product_selection") {
      // Aquí "extraeríamos" la info del texto
      botResponseText = `Entendido, anoto ${text}. ¿Cuántas unidades necesitas?`;
      setDraft((prev) => ({
        ...prev,
        items: [{ productName: text, quantity: 0 }], // Guardamos temporalmente
        step: "client_data", // Avanzamos (simplificado)
      }));
    }
    // ... más lógica

    // 3. Responder
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: botResponseText,
        },
      ]);
    }, 600);
  };

  const submitBudget = async () => {
    // AQUÍ ES DONDE CONVIERTES EL CHAT EN UNA PETICIÓN VÁLIDA
    const payload = {
      customer: draft.clientInfo,
      lines: draft.items,
      date: new Date().toISOString(),
    };

    console.log("Enviando al backend:", payload);
    // await axios.post('/api/budgets', payload);
  };

  return { messages, processUserMessage, draft, submitBudget };
};
