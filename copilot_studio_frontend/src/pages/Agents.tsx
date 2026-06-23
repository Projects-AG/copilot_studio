import { useState, useEffect } from "react";
import { Search } from "lucide-react";

import { useNavigate } from "react-router-dom";
import { createAgent, getAgents } from "../store/agents";

import Sidebar from "../components/layout/Sidebar";
import AgentTopbar from "../components/agents/AgentTopbar";
import AgentCard from "../components/agents/AgentCard";

import CreateAgentModal from "../components/agents/CreateAgentModal";
import TemplateCard from "../components/agents/TemplateCard";
import EmptyAgents from "../components/agents/EmptyAgents";

import { Agent } from "../components/agents/types";
// import Sidebar from "@/components/layout/Sidebar";

export default function Agents() {
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const [agents, setAgents] = useState<Agent[]>([]);

  useEffect(() => {
    setAgents(getAgents());
  }, []);

  const templates = [
    {
      id: "support",
      name: "Customer Support",
      description: "Automate repetitive queries with high precision.",
    },
    {
      id: "analysis",
      name: "Data Analysis",
      description: "Get insights from complex enterprise datasets.",
    },
    {
      id: "workflow",
      name: "Internal Workflow",
      description: "Connect your tools and automate routine tasks.",
    },
  ];

  const navigate = useNavigate();

  const handleCreateAgent = (name: string) => {
    const newAgent: Agent = {
      id: crypto.randomUUID(),
      name,
      description: "Custom Agent",
    };

    createAgent(newAgent);

    setAgents(getAgents());

    setOpenModal(false);

    navigate(`/agents/${newAgent.id}`);
  };

  const filteredAgents = agents.filter((agent) =>
    agent.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <div className="h-screen flex bg-[#f7f7f8] overflow-hidden">
        <Sidebar />

        <div className="flex-1 flex flex-col overflow-hidden">
          <AgentTopbar />

          <div className="flex-1 overflow-auto px-8 py-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-4xl font-bold">Agents</h2>

              <button
                onClick={() => setOpenModal(true)}
                className="border px-5 py-3 rounded-md bg-white hover:bg-gray-50"
              >
                + Create blank agent
              </button>
            </div>

            {/* Notification */}
            <div className="mt-6 border rounded-md bg-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span>🔔</span>

                <span className="text-sm">
                  New Copilot Studio experience. Better, more accurate responses
                  and task completion.
                </span>
              </div>

              <button className="bg-[#dfe3ff] px-4 py-2 rounded">
                Try now
              </button>
            </div>

            {/* Search */}
            <div className="mt-10 flex justify-between items-center">
              <h3 className="font-semibold text-xl">My agents</h3>

              <div className="relative">
                <Search
                  className="absolute left-3 top-3 text-gray-400"
                  size={18}
                />

                <input
                  placeholder="Search agents"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-[250px] pl-10 pr-4 py-3 border rounded-md bg-white"
                />
              </div>
            </div>

            {/* Created Agents */}
            {filteredAgents.length > 0 && (
              <div className="grid grid-cols-3 gap-6 mt-8">
                {filteredAgents.map((agent) => (
                  <AgentCard key={agent.id} agent={agent} />
                ))}
              </div>
            )}

            {/* Empty State */}
            {agents.length === 0 && (
              <EmptyAgents onCreate={() => setOpenModal(true)} />
            )}

            {/* Templates */}
            <div className="mt-16">
              <h3 className="text-xl font-semibold mb-6">
                Start with a template
              </h3>

              <div className="grid grid-cols-3 gap-6">
                {templates.map((template) => (
                  <TemplateCard
                    key={template.id}
                    title={template.name}
                    description={template.description}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <CreateAgentModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onCreate={handleCreateAgent}
      />
    </>
  );
}
