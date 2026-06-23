import { Sparkles } from "lucide-react";

const prompts = [
  "Where is my order?",
  "How can I request a refund?",
  "I want to change my shipping address.",
  "What payment methods do you support?",
];

export default function SuggestedPrompts() {
  return (
    <div className="bg-white border rounded-2xl mt-8 p-6">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles size={20} className="text-indigo-600" />

        <h2 className="text-xl font-semibold">Suggested Prompts</h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {prompts.map((prompt) => (
          <button
            key={prompt}
            className="text-left border rounded-xl p-4 hover:border-indigo-400 hover:bg-indigo-50 transition"
          >
            <p className="text-sm font-medium">{prompt}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
