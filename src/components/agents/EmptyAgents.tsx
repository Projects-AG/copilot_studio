interface Props {
  onCreate: () => void;
}

export default function EmptyAgents({ onCreate }: Props) {
  return (
    <div className="flex flex-col items-center py-16">
      <div className="w-44 h-44 bg-white border rounded-2xl flex items-center justify-center text-6xl">
        🤖
      </div>

      <h2 className="mt-8 text-3xl font-semibold">Create an agent</h2>

      <p className="text-gray-500 mt-4 max-w-md text-center leading-7">
        This is where your team's agents will live. Select Create blank agent to
        get started.
      </p>

      <button
        onClick={onCreate}
        className="mt-8 px-8 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
      >
        + Create blank agent
      </button>
    </div>
  );
}
