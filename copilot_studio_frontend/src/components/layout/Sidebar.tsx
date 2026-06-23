import {
  Home,
  PlusCircle,
  Bot,
  Library,
  Workflow,
  Wrench,
  MoreHorizontal,
} from "lucide-react";

import { useLocation, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isAgentPage = location.pathname.startsWith("/agents");

  const dashboardMenu = [
    {
      icon: Home,
      label: "Home",
      path: "/dashboard",
    },
    {
      icon: PlusCircle,
      label: "Create",
      path: "/agents",
    },
    {
      icon: Bot,
      label: "Agents",
      path: "/agents",
    },
    {
      icon: Library,
      label: "Library",
      path: "/knowledge-base",
    },
  ];

  const agentMenu = [
    {
      icon: Home,
      label: "Home",
      path: "/dashboard",
    },
    {
      icon: Bot,
      label: "Agents",
      path: "/agents",
    },
    {
      icon: Workflow,
      label: "Flows",
      path: "#",
    },
    {
      icon: Wrench,
      label: "Tools",
      path: "#",
    },
  ];

  const menu = isAgentPage ? agentMenu : dashboardMenu;

  return (
    <div className="w-[80px] bg-white border-r border-[#dfe7ff] flex flex-col items-center py-10">
      <div className="space-y-8">
        {menu.map((item) => {
          const isActive =
            item.path !== "#" &&
            (location.pathname === item.path ||
              (item.path === "/agents" &&
                location.pathname.startsWith("/agents")));

          return (
            <button
              key={item.label}
              onClick={() => (item.path !== "#" ? navigate(item.path) : null)}
              className={`flex flex-col items-center transition-colors ${
                isActive
                  ? "text-[#4361ee]"
                  : "text-[#7c88b5] hover:text-[#4361ee]"
              }`}
            >
              <item.icon size={22} />

              <span className="text-[11px] mt-1">{item.label}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-auto">
        <button>
          <MoreHorizontal size={22} />
        </button>
      </div>
    </div>
  );
}
