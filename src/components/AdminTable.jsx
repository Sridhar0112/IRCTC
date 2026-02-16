export default function AdminTable({ trains }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-100 dark:bg-slate-800">
          <tr>
            {['Train', 'Route', 'Departure', 'Fare', 'Actions'].map((h) => (
              <th key={h} className="px-4 py-2 text-left">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {trains.map((train) => (
            <tr key={train.id} className="border-t border-slate-200 dark:border-slate-700">
              <td className="px-4 py-2">{train.name}</td>
              <td className="px-4 py-2">{train.from} → {train.to}</td>
              <td className="px-4 py-2">{train.departure}</td>
              <td className="px-4 py-2">₹{train.fare}</td>
              <td className="px-4 py-2">
                <button className="mr-2 rounded bg-amber-500 px-3 py-1 text-white">Edit</button>
                <button className="rounded bg-rose-600 px-3 py-1 text-white">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
