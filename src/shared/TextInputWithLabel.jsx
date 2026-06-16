import React, { forwardRef } from "react";

const TextInputWithLabel = forwardRef(
  ({ elementId, labelText, onChange, value }, ref) => {
    return (
      <>
        <div className="flex flex-col gap-1 flex-1">
          <label className="label-sm text-outline ml-1" htmlFor={elementId}>
            {labelText}
          </label>
          <input
            value={value}
            onChange={onChange}
            ref={ref}
            type="text"
            id={elementId}
            className="flex-1 border-none bg-slate-50 rounded-xl px-4 py-3 text-body-md font-body-md focus:ring-0 placeholder:text-outline w-full"
            placeholder="Add a new task..."
          />
        </div>
      </>
    );
  },
);

export default TextInputWithLabel;
