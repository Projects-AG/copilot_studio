import { Home, Bot, Workflow, Wrench, MoreHorizontal } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function AgentSidebar() {
  return (
    <aside className="w-[180px] bg-white border-r border-gray-200 flex flex-col">
      <div className="px-4 py-5 border-b">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-[#b9c4ff] flex items-center justify-center">
            ⚡
          </div>

          <div>
            <h2 className="font-bold text-sm">Copilot Studio</h2>

            <p className="text-[11px] text-gray-500">Enterprise Platform</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-5 space-y-2">
        <NavLink
          to="/dashboard"
          className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100"
        >
          <Home size={18} />
          Home
        </NavLink>

        <NavLink
          to="/agents"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-3 rounded-lg ${
              isActive ? "bg-[#eef2ff] text-[#4f46e5]" : "hover:bg-gray-100"
            }`
          }
        >
          <Bot size={18} />
          Agents
        </NavLink>

        <button className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100">
          <Workflow size={18} />
          Flows
        </button>

        <button className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100">
          <Wrench size={18} />
          Tools
        </button>
      </nav>

      <div className="border-t p-3">
        <button className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100">
          <MoreHorizontal size={18} />
          More
        </button>
      </div>
    </aside>
  );
}
