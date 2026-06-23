import { Bot } from "lucide-react";

interface Props {
  title: string;
  description: string;
}

export default function TemplateCard({ title, description }: Props) {
  return (
    <div className="bg-white border rounded-2xl p-6 hover:shadow-md transition cursor-pointer">
      <div className="w-14 h-14 rounded-xl bg-indigo-100 flex items-center justify-center mb-5">
        <Bot className="text-indigo-600" />
      </div>

      <h3 className="font-semibold text-lg">{title}</h3>

      <p className="text-gray-500 mt-3 text-sm leading-6">{description}</p>

      <button className="mt-6 text-indigo-600 font-medium">
        Use template →
      </button>
    </div>
  );
}
