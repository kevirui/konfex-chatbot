import { useState } from "react";
import type { BudgetDraft, ChatMessage } from "../types/budget";

export const useBudgetChat = () => {
  // Inicializamos con un saludo del Bot para mejorar la UX
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init-1",
      sender: "bot",
      text: "¡Hola! Soy tu asistente de presupuestos. Escribe 'Hola' para comenzar o dime qué necesitas.",
    },
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const [draft, setDraft] = useState<BudgetDraft>({
    step: "greeting", // El paso inicial
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

    // IMPORTANTE: Activar estado de carga
    setIsLoading(true);

    // 2. Lógica de procesamiento
    // (Tu lógica original se mantiene igual, solo he añadido el manejo de isLoading)
    let botResponseText = "";

    // Pequeño delay artificial para simular que la IA "piensa" antes de calcular la respuesta lógica
    // Nota: En una app real, esto sucedería después de recibir respuesta del servidor
    setTimeout(() => {
      if (draft.step === "greeting") {
        botResponseText = "¡Hola! ¿Qué producto te interesa cotizar hoy?";
        setDraft((prev) => ({ ...prev, step: "product_selection" }));
      } else if (draft.step === "product_selection") {
        botResponseText = `Entendido, anoto ${text}. ¿Cuántas unidades necesitas?`;
        setDraft((prev) => ({
          ...prev,
          items: [{ productName: text, quantity: 0 }],
          step: "client_data",
        }));
      } else if (draft.step === "client_data") {
        botResponseText = `Perfecto, he registrado tu interés en ${draft.items[0]?.productName || "el producto"}. ¿Podrías proporcionarme tu nombre y correo electrónico?`;
        setDraft((prev) => ({ ...prev, step: "confirmation" }));
      } else if (draft.step === "confirmation") {
        botResponseText = `Gracias por la información. ¿Deseas que te envíe la cotización a tu correo electrónico?`;
        setDraft((prev) => ({
          ...prev,
          step: "finished",
          isReadyToSubmit: true,
        }));
      } else {
        botResponseText = `¡Gracias por usar nuestro servicio! Hemos registrado tu solicitud.`;
        setDraft((prev) => ({ ...prev, step: "finished" }));
      }

      // 3. Responder y desactivar carga
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: botResponseText,
        },
      ]);

      setIsLoading(false); // IMPORTANTE: Desactivar carga
    }, 1000); // 1 segundo de delay
  };

  const submitBudget = async () => {
    const payload = {
      customer: draft.clientInfo,
      lines: draft.items,
      date: new Date().toISOString(),
    };
    console.log("Enviando al backend:", payload);
  };

  return {
    messages,
    sendMessage: processUserMessage, // ALIAS: La UI espera 'sendMessage', aquí lo conectamos
    isLoading, // Necesario para la UI
    draft,
    submitBudget,
  };
};
