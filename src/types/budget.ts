// El estado interno de lo que el bot ha recolectado hasta ahora
export interface BudgetDraft {
  step:
    | "greeting"
    | "product_selection"
    | "client_data"
    | "confirmation"
    | "finished";
  items: Array<{
    productId?: string; // ID inferido o seleccionado
    productName: string; // Nombre detectado
    quantity: number;
    notes?: string;
  }>;
  clientInfo: {
    name?: string;
    email?: string;
    phone?: string;
  };
  isReadyToSubmit: boolean;
}

// Mensaje en la UI
export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  // Opcional: Para mostrar widgets en el chat (botones, tarjetas de productos)
  widget?: "product-list" | "confirm-button" | null;
}
