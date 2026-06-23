import { Bot } from "lucide-react";

const tags = ["Option one", "Option two", "Option four", "+ Add"];

export default function Header() {
  return (
    <div className="flex items-center gap-6 mb-6">
      <div className="w-12 h-12 rounded-xl bg-[#4361ee] flex items-center justify-center">
        <Bot className="text-white" />
      </div>

      <h1 className="text-[42px] font-bold text-[#141827]">
        Hi, I’m Your Agentic
      </h1>

      <div className="flex gap-3 ml-auto">
        {tags.map((tag) => (
          <button
            key={tag}
            className="px-4 py-2 rounded-full text-sm bg-[#edf2ff] text-[#4361ee]"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
