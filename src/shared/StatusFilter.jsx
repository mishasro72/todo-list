import { useSearchParams } from "react-router";

export default function StatusFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentStatus = searchParams.get("status") || "all";

  const handleStatusChange = (status) => {
    if (status === "all") {
      // Remove status param for 'all' to keep URL clean
      searchParams.delete("status");
    } else {
      searchParams.set("status", status);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="lex flex-col gap-1">
      <label className="label-sm text-outline ml-1" htmlFor="statusFilter">
        Show:
      </label>
      <select
        className="bg-slate-50 border-slate-100 rounded-xl body-sm py-2 px-3 focus:ring-primary-light"
        id="statusFilter"
        value={currentStatus}
        onChange={(e) => handleStatusChange(e.target.value)}
      >
        <option value="all">All Todos</option>
        <option value="active">Active Todos</option>
        <option value="completed">Completed Todos</option>
      </select>
    </div>
  );
}
