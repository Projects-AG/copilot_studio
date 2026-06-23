import { Home, PlusCircle, Bot, Library, MoreHorizontal } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const menu = [
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

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="w-[80px] bg-white border-r border-[#dfe7ff] flex flex-col items-center py-10">
      <div className="space-y-8">
        {menu.map((item) => {
          const isActive =
            location.pathname === item.path ||
            (item.path === "/agents" &&
              location.pathname.startsWith("/agents"));

          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
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
