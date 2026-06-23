import Sidebar from "../components/layout/Sidebar";
import Header from "../components/dashboard/Header";
import PromptArea from "../components/dashboard/PromptArea";
import SkillsTable from "../components/dashboard/SkillsTable";
import SuggestionPanel from "../components/dashboard/SuggestionPanel";
import ChatPanel from "../components/dashboard/ChatPanel";
import BottomCards from "../components/dashboard/BottomCards";

export default function Dashboard() {
  return (
    <div className="h-screen bg-[#f8f9fd] flex overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex">
        <div className="flex-1 px-8 py-8 overflow-auto">
          <Header />
          <PromptArea />
          <SkillsTable />
          <BottomCards />
        </div>

        <div className="w-[320px] border-l border-[#dfe7ff] bg-white flex flex-col">
          <SuggestionPanel />
          <ChatPanel />
        </div>
      </div>
    </div>
  );
}
