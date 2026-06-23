import { Bot } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Agent } from "./types";

interface Props {
  agent: Agent;
}

export default function AgentCard({ agent }: Props) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/agents/${agent.id}`)}
      className="border rounded-xl p-5 bg-white cursor-pointer hover:shadow-md transition"
    >
      <div className="w-14 h-14 rounded-xl bg-[#eef2ff] flex items-center justify-center mb-4">
        <Bot className="text-[#4f46e5]" />
      </div>

      <h3 className="font-semibold">{agent.name}</h3>

      <p className="text-sm text-gray-500 mt-2">{agent.description}</p>
    </div>
  );
}
