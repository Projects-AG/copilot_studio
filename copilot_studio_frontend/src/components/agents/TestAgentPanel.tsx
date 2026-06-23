import { Bot, Send, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Message {
  id: number;
  role: "user" | "assistant";
  text: string;
}

export default function TestAgentPanel() {
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      text: "Hi! I'm your Customer Support Agent. How can I help you today?",
    },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const generateReply = (userMessage: string) => {
    const lower = userMessage.toLowerCase();

    if (lower.includes("refund")) {
      return "You can request a refund within 30 days of purchase. Would you like help starting the process?";
    }

    if (lower.includes("order")) {
      return "Please provide your order number and I'll help you track it.";
    }

    if (lower.includes("payment")) {
      return "We currently support Credit Cards, UPI, and PayPal.";
    }

    if (lower.includes("shipping")) {
      return "You can update your shipping address before your order is dispatched.";
    }

    return "Thank you for your message. I'm here to help with any customer support questions you may have.";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      text: input,
    };

    setMessages((prev) => [...prev, userMessage]);

    const userInput = input;

    setInput("");

    setTimeout(() => {
      const aiReply: Message = {
        id: Date.now() + 1,
        role: "assistant",
        text: generateReply(userInput),
      };

      setMessages((prev) => [...prev, aiReply]);
    }, 800);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="border-b px-5 py-4">
        <h2 className="font-semibold text-lg">Test your agent</h2>

        <p className="text-sm text-gray-500 mt-1">
          Interact with your agent before publishing.
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-5">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${
              message.role === "user" ? "justify-end" : ""
            }`}
          >
            {message.role === "assistant" && (
              <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                <Bot size={18} className="text-indigo-600" />
              </div>
            )}

            <div
              className={`max-w-[260px] rounded-2xl px-4 py-3 text-sm leading-6 ${
                message.role === "assistant"
                  ? "bg-gray-100"
                  : "bg-indigo-600 text-white"
              }`}
            >
              {message.text}
            </div>

            {message.role === "user" && (
              <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0">
                <User size={18} className="text-white" />
              </div>
            )}
          </div>
        ))}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t p-4 shrink-0">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={input}
            placeholder="Type a message..."
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}
            className="flex-1 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            onClick={handleSend}
            className="w-12 h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
