import { Bell, CircleHelp, Search } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function AgentTopbar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="bg-white border-b px-6 py-3 flex items-center">
      <h1 className="text-2xl font-semibold text-[#6c7cff]">
        Kinetic Enterprise
      </h1>

      <nav className="ml-10 flex items-center gap-8 text-sm">
        <button
          onClick={() => navigate("/dashboard")}
          className={
            location.pathname === "/dashboard"
              ? "text-[#4f46e5] font-medium border-b-2 border-[#4f46e5] pb-1"
              : ""
          }
        >
          Overview
        </button>

        <button
          onClick={() => navigate("/knowledge")}
          className={
            location.pathname.startsWith("/knowledge")
              ? "text-[#4f46e5] font-medium border-b-2 border-[#4f46e5] pb-1"
              : ""
          }
        >
          Knowledge
        </button>

        <button>Tools</button>

        <button
          onClick={() => navigate("/agents")}
          className={
            location.pathname.startsWith("/agents")
              ? "text-[#4f46e5] font-medium border-b-2 border-[#4f46e5] pb-1"
              : ""
          }
        >
          Agents
        </button>
      </nav>

      <div className="ml-auto flex items-center gap-5">
        <CircleHelp size={18} />

        <Bell size={18} />

        <Search size={18} />

        <button className="px-5 py-2 border rounded-md text-sm">
          Settings
        </button>

        <button className="px-5 py-2 rounded-md bg-[#4f46e5] text-white text-sm">
          Publish
        </button>

        <div className="w-9 h-9 rounded-full bg-gray-200" />
      </div>
    </header>
  );
}
