import React from "react";

export default function SortBy({
  sortBy,
  sortDirection,
  onSortByChange,
  onSortDirectionChange,
}) {
  return (
    <>
      <div className="flex flex-col gap-1">
        <label className="label-sm text-outline ml-1" htmlFor="sortBy">
          Sort by
        </label>
        <select
          className="bg-slate-50 border-slate-100 rounded-xl body-sm py-2 px-3 focus:ring-primary-light"
          name="sortBy"
          id="sortBy"
          value={sortBy}
          onChange={(event) => onSortByChange(event.target.value)}
        >
          <option value="createdAt">Created Date</option>
          <option value="title">Title</option>
        </select>
      </div>
      <div className="flex flex-col gap-1">
        <label className="label-sm text-outline ml-1" htmlFor="order">
          Order:{" "}
        </label>
        <select
          className="bg-slate-50 border-slate-100 rounded-xl body-sm py-2 px-3 focus:ring-primary-light"
          name="order"
          id="order"
          value={sortDirection}
          onChange={(event) => onSortDirectionChange(event.target.value)}
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>
    </>
  );
}
