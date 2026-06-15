export default function FilterInput({ filterTerm, onFilterChange }) {
  return (
    <div className="flex-col ">
      <label className="label-sm text-outline ml-1" htmlFor="filterInput">
        Search todos
      </label>
      <div className="relative group">
        <svg
          viewBox="0 0 24 24"
          className="w-6 h-6 absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]"
          fill="none"
        >
          <title>Ai Search SVG Icon</title>
          <g fill="none" stroke="currentColor" strokeWidth="2">
            {/* Искорка AI */}
            <path d="m16.75 2.5l.52 1.23l1.23.52l-1.23.52L16.75 6l-.52-1.23L15 4.25l1.23-.52z" />
            {/* Корпус лупы */}
            <path
              strokeLinecap="square"
              d="m15.803 15.804l5.303 5.303m-5.303-5.303A7.5 7.5 0 1 1 10 3.017m5.803 12.787A7.47 7.47 0 0 0 17.983 11"
            />
          </g>
        </svg>
        <input
        className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-10 pr-4 py-2.5 body-sm focus:ring-2 focus:ring-primary-light focus:ring-offset-2 transition-all"
          id="filterInput"
          type="text"
          value={filterTerm}
          onChange={(event) => onFilterChange(event.target.value)}
          placeholder="Search by title…"
        />
      </div>
    </div>
  );
}
