import { ArrowLeft, CheckCircle2, Pencil } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { getAgentById } from "../store/agents";
import Sidebar from "../components/layout/Sidebar";
import AgentTopbar from "../components/agents/AgentTopbar";

import TopicsSection from "../components/agents/TopicsSection";
import SuggestedPrompts from "../components/agents/SuggestedPrompts";
import TestAgentPanel from "../components/agents/TestAgentPanel";

export default function AgentDetails() {
  const navigate = useNavigate();

  const { id } = useParams();

  const agent = id ? getAgentById(id) : undefined;

  if (!agent) {
    return (
      <div className="h-screen flex items-center justify-center">
        Agent not found.
      </div>
    );
  }
  return (
    <div className="h-screen flex bg-[#f5f6f8] overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <AgentTopbar />

        <div className="flex flex-1 overflow-hidden">
          {/* LEFT CONTENT */}
          <div className="flex-1 overflow-auto px-8 py-6">
            {/* Breadcrumb */}
            <button
              onClick={() => navigate("/agents")}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-black"
            >
              <ArrowLeft size={18} />
              Back to agents
            </button>

            {/* Title */}
            <div className="flex items-center justify-between mt-5">
              <div>
                <h1 className="text-4xl font-semibold text-gray-900">
                  {agent?.name || "Agent"}
                </h1>

                <p className="text-gray-500 mt-2">Agent ID: {id}</p>
              </div>

              <button className="flex items-center gap-2 border rounded-lg px-5 py-3 bg-white hover:bg-gray-50">
                <Pencil size={16} />
                Edit
              </button>
            </div>

            {/* Success Banner */}
            <div className="mt-8 bg-[#e9f8ef] border border-[#b9e6c5] rounded-xl px-5 py-4 flex items-center gap-3">
              <CheckCircle2 className="text-green-600" size={22} />

              <div>
                <p className="font-medium text-green-900">
                  Your agent has been provisioned successfully.
                </p>

                <p className="text-sm text-green-700 mt-1">
                  Test it using the panel on the right.
                </p>
              </div>
            </div>

            {/* Details */}
            <div className="bg-white rounded-2xl border mt-8 p-6">
              <h2 className="text-xl font-semibold">Details</h2>

              <div className="grid grid-cols-2 gap-8 mt-6">
                <div>
                  <label className="text-sm text-gray-500">Name</label>

                  <p className="font-medium mt-2">{agent?.name}</p>
                </div>

                <div>
                  <label className="text-sm text-gray-500">Status</label>

                  <p className="font-medium mt-2 text-green-600">Active</p>
                </div>

                <div>
                  <label className="text-sm text-gray-500">Created By</label>

                  <p className="font-medium mt-2">System</p>
                </div>

                <div>
                  <label className="text-sm text-gray-500">Last Modified</label>

                  <p className="font-medium mt-2">2 hours ago</p>
                </div>
              </div>
            </div>

            {/* Topics */}
            <TopicsSection />

            {/* Suggested Prompts */}
            <SuggestedPrompts />
          </div>

          {/* RIGHT PANEL */}
          <TestAgentPanel />
        </div>
      </div>
    </div>
  );
}
