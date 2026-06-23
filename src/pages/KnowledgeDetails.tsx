import { Globe, CheckCircle } from "lucide-react";
import { useParams } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import AgentTopbar from "../components/agents/AgentTopbar";
import TestAgentPanel from "../components/agents/TestAgentPanel";

export default function KnowledgeDetails() {
  const { id } = useParams();

  return (
    <div className="h-screen bg-[#f7f8fc] flex overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <AgentTopbar />

        <div className="flex flex-1 min-h-0">
          {/* MAIN CONTENT */}
          <div className="flex-1 overflow-y-auto px-8 py-6 bg-[#f7f8fc]">
            {/* Title */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-[28px] font-semibold">Better Health</h1>

                <p className="text-gray-500 text-sm mt-1">Knowledge ID: {id}</p>
              </div>

              <button
                className="
                bg-[#0078d4]
                hover:bg-[#106ebe]
                text-white
                px-5
                py-2
                rounded-md
              "
              >
                Save
              </button>
            </div>

            {/* FORM */}
            <div className="mt-8 bg-white border border-[#e5e7eb] rounded-xl p-8 max-w-[900px]">
              <div className="space-y-6">
                {/* Knowledge Name */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Knowledge Name *
                  </label>

                  <input
                    defaultValue="https://www.betterhealth.vic.gov.au"
                    className="
                      w-full
                      border
                      rounded-md
                      px-4
                      py-3
                      outline-none
                      focus:border-[#0078d4]
                    "
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Knowledge Description *
                  </label>

                  <textarea
                    className="
                      w-full
                      border
                      rounded-md
                      p-4
                      h-[140px]
                    "
                    placeholder="Enter description..."
                  />
                </div>

                {/* Website Link */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Website Link *
                  </label>

                  <div className="relative">
                    <input
                      defaultValue="https://www.betterhealth.vic.gov.au"
                      className="
                        w-full
                        border
                        rounded-md
                        px-4
                        py-3
                      "
                    />

                    <Globe
                      size={18}
                      className="
                        absolute
                        right-4
                        top-1/2
                        -translate-y-1/2
                        text-gray-500
                      "
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT META PANEL */}
          <div className="w-[320px] border-l border-[#e5e7eb] bg-white flex flex-col shrink-0">
            <div className="p-6 border-b">
              <h3 className="font-semibold text-lg">Knowledge Info</h3>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <p className="text-gray-500 text-sm">Type</p>

                <div className="flex items-center gap-2 mt-2">
                  <Globe size={16} className="text-[#0078d4]" />

                  <span>Public Website</span>
                </div>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Modified By</p>

                <p className="mt-2">Admin User</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Status</p>

                <div className="flex items-center gap-2 mt-2 text-green-600">
                  <CheckCircle size={16} />
                  Ready
                </div>
              </div>
            </div>

            {/* Test Panel */}
            <div className="w-[320px]">
              <TestAgentPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
