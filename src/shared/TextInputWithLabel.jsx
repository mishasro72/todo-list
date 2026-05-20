import React, { forwardRef } from "react";

const TextInputWithLabel = forwardRef(
  ({ elementId, labelText, onChange, value }, ref) => {
    return (
      <>
        <label htmlFor={elementId}>{labelText}</label>
        <input
          value={value}
          onChange={onChange}
          ref={ref}
          type="text"
          id={elementId}
        />
      </>
    );
  },
);

export default TextInputWithLabel;
