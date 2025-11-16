// src/components/form/TextInput.jsx
import React from "react";
import { useFormContext } from "react-hook-form";
import { wrapper, labelClass, inputDefault, inputError, errorText, hintText } from "./styles.jsx";

export default function TextInput({
  name,
  label,
  type = "text",
  placeholder = "",
  register: registerProp,
  rules,
  defaultValue,
  className = "",
  hint,
}) {
  const methods = useFormContext();
  const register = registerProp || (methods && methods.register);
  const error = methods?.formState?.errors?.[name];

  if (!register) {
    console.warn("TextInput: no register provided and no FormProvider found. Use useFormContext() or pass register prop.");
  }

  return (
    <div className={`${wrapper} ${className}`}>
      {label && <label className={labelClass} htmlFor={name}>{label}</label>}
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        {...(register ? register(name, rules) : {})}
        className={error ? inputError : inputDefault}
      />
      {hint && <p className={hintText}>{hint}</p>}
      {error && <p className={errorText}>{error.message || "Invalid value"}</p>}
    </div>
  );
}
