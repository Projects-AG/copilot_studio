import { ChevronRight, MessageSquare } from "lucide-react";

const topics = [
  {
    title: "Greeting",
    description: "Handle greetings and introduce the agent.",
  },
  {
    title: "Refund Requests",
    description: "Guide customers through refund processes.",
  },
  {
    title: "Order Status",
    description: "Provide shipment and order tracking information.",
  },
];

export default function TopicsSection() {
  return (
    <div className="bg-white border rounded-2xl mt-8 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Topics</h2>

        <button className="text-indigo-600 text-sm font-medium">
          View all
        </button>
      </div>

      <div className="mt-6 space-y-4">
        {topics.map((topic) => (
          <div
            key={topic.title}
            className="border rounded-xl p-5 hover:border-indigo-300 transition cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-indigo-100 flex items-center justify-center">
                  <MessageSquare size={20} className="text-indigo-600" />
                </div>

                <div>
                  <h3 className="font-medium text-gray-900">{topic.title}</h3>

                  <p className="text-sm text-gray-500 mt-1">
                    {topic.description}
                  </p>
                </div>
              </div>

              <ChevronRight size={18} className="text-gray-400" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
