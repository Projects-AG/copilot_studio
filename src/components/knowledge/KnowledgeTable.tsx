import { Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";

const knowledge = [
  {
    id: 1,
    name: "Better Health",
    type: "Public Website",
    modified: "2 minutes ago",
    status: "Ready",
  },
  {
    id: 2,
    name: "Melbourne Pollen",
    type: "Public Website",
    modified: "5 minutes ago",
    status: "Ready",
  },
];

export default function KnowledgeTable() {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl border border-[#e5e7eb] mt-6 overflow-hidden">
      {/* Filters */}
      <div className="p-5 border-b flex items-center justify-between">
        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-full bg-[#eef5ff] text-[#0078d4] text-sm">
            All
          </button>

          <button className="px-4 py-2 rounded-full border text-sm">
            Public Website
          </button>

          <button className="px-4 py-2 rounded-full border text-sm">
            Files
          </button>
        </div>

        <input
          placeholder="Search knowledge"
          className="border rounded-md px-4 py-2 w-[280px]"
        />
      </div>

      {/* Table */}
      <table className="w-full">
        <thead>
          <tr className="bg-[#fafafa] border-b">
            <th className="text-left px-6 py-4 text-sm font-medium">
              Name
            </th>

            <th className="text-left px-6 py-4 text-sm font-medium">
              Type
            </th>

            <th className="text-left px-6 py-4 text-sm font-medium">
              Last Modified
            </th>

            <th className="text-left px-6 py-4 text-sm font-medium">
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          {knowledge.map((item) => (
            <tr
              key={item.id}
              onClick={() =>
                navigate(`/knowledge/${item.id}`)
              }
              className="
                border-b
                hover:bg-[#f8fbff]
                cursor-pointer
                transition-colors
              "
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <Globe
                    size={18}
                    className="text-[#0078d4]"
                  />

                  {item.name}
                </div>
              </td>

              <td className="px-6 py-4">
                {item.type}
              </td>

              <td className="px-6 py-4">
                {item.modified}
              </td>

              <td className="px-6 py-4">
                <span
                  className="
                    bg-green-100
                    text-green-700
                    px-3
                    py-1
                    rounded-full
                    text-xs
                  "
                >
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}