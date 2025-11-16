// src/components/form/SelectInput.jsx
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  wrapper,
  labelClass,
  inputDefault,
  inputError,
  errorText,
  // dark variants
  inputDefaultDark,
  inputErrorDark,
  labelDark,
  hintTextDark,
} from "./styles"; // make sure styles.js exists at this path

/**
 * options: [{ value: '', label: '' }, ...]  OR  ['option1','option2']
 *
 * Props:
 * - dark: boolean -> use dark styles
 */
export default function SelectInput({
  name,
  label,
  options = [],
  control: controlProp,
  rules,
  defaultValue = "",
  placeholder = "Select...",
  className = "",
  dark = true, // new prop
}) {
  const methods = useFormContext();
  const control = controlProp || (methods && methods.control);
  const error = methods?.formState?.errors?.[name];

  // normalize options
  const opts = options.map((o) => (typeof o === "string" ? { value: o, label: o } : o));

  if (!control) {
    console.warn(
      "SelectInput: no control provided and no FormProvider found. Pass control or wrap with FormProvider."
    );
  }

  // pick classes based on dark prop
  const selectClass = dark ? (error ? inputErrorDark : inputDefaultDark) : (error ? inputError : inputDefault);
  const labelClassToUse = dark ? labelDark : labelClass;

  return (
    <div className={`${wrapper} ${className}`}>
      {label && <label className={labelClassToUse}>{label}</label>}

      {control ? (
        <Controller
          name={name}
          control={control}
          rules={rules}
          defaultValue={defaultValue}
          render={({ field }) => (
            <select {...field} className={selectClass}>
              <option value="">{placeholder}</option>
              {opts.map((o) => (
                <option key={String(o.value)} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          )}
        />
      ) : (
        // fallback: uncontrolled select
        <select defaultValue={defaultValue} className={selectClass}>
          <option value="">{placeholder}</option>
          {opts.map((o) => (
            <option key={String(o.value)} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      )}

      {error && <p className={errorText}>{error.message || "Invalid selection"}</p>}
    </div>
  );
}
