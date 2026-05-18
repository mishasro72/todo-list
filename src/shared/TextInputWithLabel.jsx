import React from "react";

export default function TextInputWithLabel({
  elementId,
  labelText,
  onChange,
  ref,
  value,
}) {
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
}
