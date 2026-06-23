import { useState } from "react";

import Sidebar from "../components/layout/Sidebar";

import KnowledgeHeader from "../components/knowledge/KnowledgeHeader";
import KnowledgeTable from "../components/knowledge/KnowledgeTable";
import AddKnowledgeModal from "../components/knowledge/AddKnowledgeModal";

import TestAgentPanel from "../components/agents/TestAgentPanel";

export default function Knowledge() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="h-screen bg-[#f7f8fc] flex overflow-hidden">
        <Sidebar />

        <div className="flex-1 flex">
          {/* MAIN CONTENT */}
          <div className="flex-1 overflow-auto px-8 py-6">
            <KnowledgeHeader onAdd={() => setOpenModal(true)} />

            <KnowledgeTable />
          </div>

          {/* RIGHT PANEL */}
          <div className="w-[340px] border-l border-[#e5e7eb] bg-white">
            <TestAgentPanel />
          </div>
        </div>
      </div>

      <AddKnowledgeModal open={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
}
