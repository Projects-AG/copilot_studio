import { Plus } from "lucide-react";

interface Props {
  onAdd: () => void;
}

export default function KnowledgeHeader({ onAdd }: Props) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[32px] font-semibold text-[#242424]">
            Knowledge
          </h1>

          <p className="text-gray-500 mt-1">
            Manage and organize knowledge sources.
          </p>
        </div>

        <button
          onClick={onAdd}
          className="
            bg-[#0078d4]
            hover:bg-[#106ebe]
            text-white
            px-5
            py-2.5
            rounded-md
            flex
            items-center
            gap-2
          "
        >
          <Plus size={18} />
          Add Knowledge
        </button>
      </div>
    </div>
  );
}
