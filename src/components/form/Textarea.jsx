// src/components/form/Textarea.jsx
import React from "react";
import { useFormContext } from "react-hook-form";
import { wrapper, labelClass, inputDefault, inputError, errorText } from "./styles.jsx";

export default function Textarea({
  name,
  label,
  placeholder = "",
  rows = 4,
  register: registerProp,
  rules,
  defaultValue,
  className = "",
}) {
  const methods = useFormContext();
  const register = registerProp || (methods && methods.register);
  const error = methods?.formState?.errors?.[name];

  return (
    <div className={`${wrapper} ${className}`}>
      {label && <label className={labelClass} htmlFor={name}>{label}</label>}
      <textarea
        id={name}
        rows={rows}
        placeholder={placeholder}
        defaultValue={defaultValue}
        {...(register ? register(name, rules) : {})}
        className={error ? inputError : inputDefault}
      />
      {error && <p className={errorText}>{error.message || "Invalid value"}</p>}
    </div>
  );
}
