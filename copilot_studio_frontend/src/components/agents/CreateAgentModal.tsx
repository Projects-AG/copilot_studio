import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  onCreate: (name: string) => void;
}

export default function CreateAgentModal({ open, onClose, onCreate }: Props) {
  const [agentName, setAgentName] = useState("");
  const [description, setDescription] = useState("");
  const [showSettings, setShowSettings] = useState(false);

  const handleCreate = () => {
    if (!agentName.trim()) return;

    onCreate(agentName);

    setAgentName("");
    setDescription("");
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-[600px] rounded-2xl overflow-hidden shadow-xl">
        <div className="px-8 pt-8 pb-4">
          <h2 className="text-3xl font-semibold">Create an agent</h2>

          <p className="text-gray-500 mt-2">
            Describe your agent or start with a blank one.
          </p>
        </div>

        <div className="px-8 pb-8 space-y-6">
          <div>
            <label className="text-sm font-medium">Name</label>

            <input
              type="text"
              className="w-full mt-2 h-12 px-4 border rounded-lg"
              placeholder="Enter agent name"
              value={agentName}
              onChange={(e) => setAgentName(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Description</label>

            <textarea
              className="w-full mt-2 border rounded-lg p-4 min-h-[120px] resize-none"
              placeholder="What should your agent do?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Settings */}
          <div className="border rounded-xl">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="w-full px-4 py-4 flex justify-between items-center font-medium"
            >
              Agent settings (Optional)
              <span>{showSettings ? "−" : "+"}</span>
            </button>

            {showSettings && (
              <div className="px-4 pb-4 space-y-4">
                <div>
                  <label className="text-sm font-medium">Instructions</label>

                  <textarea
                    className="w-full mt-2 border rounded-lg p-3 min-h-[100px]"
                    placeholder="Additional instructions..."
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Welcome message</label>

                  <input
                    type="text"
                    placeholder="Hi, how can I help you?"
                    className="w-full mt-2 border rounded-lg p-3"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3">
            <button onClick={onClose} className="border px-5 py-2 rounded-lg">
              Cancel
            </button>

            <button
              onClick={handleCreate}
              disabled={!agentName.trim()}
              className="bg-indigo-600 text-white px-5 py-2 rounded-lg disabled:opacity-50"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
