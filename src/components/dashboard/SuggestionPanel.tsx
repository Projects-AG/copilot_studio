export default function SuggestionPanel() {
  return (
    <div className="p-4 border-b border-[#dfe7ff]">
      <div className="flex items-center gap-2 mb-4">
        <button className="w-8 h-8 rounded-full border">→</button>

        <button className="px-4 py-2 border rounded-full text-sm">
          Text of needed
        </button>
      </div>

      {[1, 2].map((item) => (
        <div key={item} className="border border-[#dfe7ff] rounded-xl p-3 mb-4">
          <h4 className="text-[#4361ee] font-medium mb-2">
            Use Everyday Words To Describe What Your Agent Should Do
          </h4>

          <p className="text-xs text-gray-500 leading-6">
            Use Everyday Words To Describe What Your Agent Should Do Lorem
            Ipsum...
          </p>
        </div>
      ))}
    </div>
  );
}
