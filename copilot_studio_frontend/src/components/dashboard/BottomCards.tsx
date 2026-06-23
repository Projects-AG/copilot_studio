import { ArrowRight } from "lucide-react";

const cards = [1, 2, 3, 4];

export default function BottomCards() {
  return (
    <div className="grid grid-cols-4 gap-4 mt-12">
      {cards.map((card) => (
        <div
          key={card}
          className="bg-white border border-[#dfe7ff] rounded-2xl p-4"
        >
          <div className="flex justify-between">
            <h3 className="font-semibold text-sm">Share posts</h3>

            <ArrowRight size={18} className="text-[#4361ee]" />
          </div>

          <p className="text-xs text-gray-500 mt-4">
            Share latest news to get connected with others.
          </p>
        </div>
      ))}
    </div>
  );
}
