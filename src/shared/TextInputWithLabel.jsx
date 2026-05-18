import React from "react";

export default function TextInputWithLabel({
  elementId,
  labelText,
  onChange,
  inputRef,
  value,
}) {
  return (
    <>
      <label htmlFor={elementId}>{labelText}</label>
      <input
        value={value}
        onChange={onChange}
        ref={inputRef}
        type="text"
        id={elementId}
      />
    </>
  );
}
