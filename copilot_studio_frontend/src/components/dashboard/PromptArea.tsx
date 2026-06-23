export default function PromptArea() {
  return (
    <div className="border border-[#dfe7ff] rounded-3xl bg-white p-5 mb-8">
      <textarea
        placeholder="Use everyday words to describe what your agent should do"
        className="w-full h-[180px] resize-none outline-none text-gray-600"
      />

      <div className="flex justify-between mt-4">
        <div className="flex gap-3">
          <button className="px-5 py-2 bg-[#edf2ff] rounded-full text-[#4361ee]">
            Think & message
          </button>

          <button className="px-5 py-2 bg-[#edf2ff] rounded-full text-[#4361ee]">
            Search
          </button>
        </div>

        <div className="flex gap-3">
          <button className="px-5 py-2 bg-[#edf2ff] rounded-full text-[#4361ee]">
            Attached
          </button>

          <button className="px-5 py-2 bg-[#4361ee] text-white rounded-full">
            go
          </button>
        </div>
      </div>
    </div>
  );
}
