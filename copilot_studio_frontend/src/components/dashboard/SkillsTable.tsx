const rows = Array(6).fill({
  name: "Bank account Agent 01",
  type: "Agent",
  modified: "MyAgent work Studio | 2 hour ago",
  published: "2hour ago",
  owner: "Anurag Jindal",
});

export default function SkillsTable() {
  return (
    <div className="bg-white rounded-2xl">
      <h3 className="text-center text-xs tracking-[3px] text-gray-500 font-semibold mb-5">
        SKILLS OUTPUT ✩
      </h3>

      <table className="w-full">
        <thead>
          <tr className="text-left text-xs uppercase text-gray-400">
            <th className="pb-3">Name</th>
            <th>Type</th>
            <th>Last Modified</th>
            <th>Last Published</th>
            <th>Owner</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((item, i) => (
            <tr
              key={i}
              className="border-t border-[#edf2ff] text-sm text-gray-600"
            >
              <td className="py-4">{item.name}</td>
              <td>{item.type}</td>
              <td>{item.modified}</td>
              <td>{item.published}</td>
              <td>{item.owner}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
