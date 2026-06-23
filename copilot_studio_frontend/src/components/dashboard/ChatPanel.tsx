export default function ChatPanel() {
  return (
    <div className="flex-1 p-4">
      <div className="h-full border border-[#dfe7ff] rounded-2xl p-4 flex flex-col">
        <div className="text-[#4361ee]">Ask!</div>

        <div className="mt-auto flex justify-end">
          <button className="px-4 py-2 bg-[#4361ee] text-white rounded-full">
            go
          </button>
        </div>
      </div>
    </div>
  );
}
