import { useState } from "react";
import { Globe, Database, Share2, Upload, X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function AddKnowledgeModal({ open, onClose }: Props) {
  const [selected, setSelected] = useState<"website" | "file">("website");

  const [websiteUrl, setWebsiteUrl] = useState("");

  const [websiteName, setWebsiteName] = useState("");

  const [description, setDescription] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div
        className="
          bg-white
          w-[900px]
          max-w-[95vw]
          max-h-[90vh]
          overflow-y-auto
          rounded-xl
          shadow-2xl
        "
      >
        {/* Header */}
        <div className="px-6 py-5 border-b flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Add Knowledge</h2>

            <p className="text-gray-500 mt-1 text-sm">
              Add knowledge so your agent can provide more relevant information
              and insights.
            </p>
          </div>

          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* Tabs */}
          <div className="flex gap-3 mb-6">
            <button className="px-4 py-2 rounded-full bg-[#eef5ff] text-[#0078d4] text-sm">
              Featured
            </button>

            <button className="px-4 py-2 rounded-full border text-sm">
              Advanced
            </button>
          </div>

          {/* Source Cards */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div
              onClick={() => setSelected("website")}
              className={`
                border
                rounded-xl
                p-4
                cursor-pointer
                transition-all
                ${
                  selected === "website"
                    ? "border-[#0078d4] bg-[#f5f9ff]"
                    : "hover:border-gray-400"
                }
              `}
            >
              <Globe size={22} className="text-[#0078d4]" />

              <h3 className="font-medium mt-3">Public Website</h3>

              <p className="text-sm text-gray-500 mt-2 leading-5">
                Add public websites for real-time answers.
              </p>
            </div>

            <div className="border rounded-xl p-4 opacity-70">
              <Share2 size={22} className="text-green-600" />

              <h3 className="font-medium mt-3">SharePoint</h3>

              <p className="text-sm text-gray-500 mt-2 leading-5">
                Securely integrate internal data.
              </p>
            </div>

            <div className="border rounded-xl p-4 opacity-70">
              <Database size={22} className="text-green-600" />

              <h3 className="font-medium mt-3">Database</h3>

              <p className="text-sm text-gray-500 mt-2 leading-5">
                Structured knowledge sources.
              </p>
            </div>
          </div>

          {/* Website Form */}
          {selected === "website" && (
            <div className="space-y-5">
              <div>
                <label className="text-sm font-medium">Knowledge Name</label>

                <input
                  value={websiteName}
                  onChange={(e) => setWebsiteName(e.target.value)}
                  className="w-full border rounded-md mt-2 px-4 py-3"
                  placeholder="Website name"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Description</label>

                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border rounded-md mt-2 p-4 h-[100px]"
                  placeholder="Description"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Website Link</label>

                <input
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  className="w-full border rounded-md mt-2 px-4 py-3"
                  placeholder="https://example.com"
                />
              </div>
            </div>
          )}

          {/* Upload */}
          <div className="mt-8">
            <h3 className="font-medium mb-4">Upload Files</h3>

            <label
              className="
                border-2
                border-dashed
                rounded-xl
                h-[140px]
                flex
                flex-col
                items-center
                justify-center
                cursor-pointer
                hover:border-[#0078d4]
              "
            >
              <Upload size={26} className="text-gray-400" />

              <p className="mt-3 text-sm">Drag and drop a file here</p>

              <span className="text-gray-500 text-xs mt-1">
                Up to 512MB per file
              </span>

              <input type="file" className="hidden" />
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t px-6 py-4 flex justify-end gap-3">
          <button onClick={onClose} className="border px-5 py-2 rounded-md">
            Cancel
          </button>

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
      </div>
    </div>
  );
}
