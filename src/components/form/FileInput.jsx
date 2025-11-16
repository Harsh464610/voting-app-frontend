// src/components/form/FileInput.jsx
import React, { useEffect, useRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  wrapper,
  labelClass,
  inputDefault,
  inputError,
  errorText,
  hintText,
  inputDefaultDark,
  inputErrorDark,
  labelDark,
  hintTextDark,
} from "./styles";

/**
 * FileInput props:
 * - name
 * - label
 * - control (optional) -> if provided, uses Controller and integrates with RHF
 * - onFileSelect(file | Array<File>) -> optional callback for immediate upload
 * - accept, multiple, preview (bool)
 * - initialPreview: string | [{url,name,size}] to show server-provided preview(s)
 * - dark: boolean -> use dark styling
 */
export default function FileInput({
  name,
  label,
  control: controlProp,
  rules,
  accept,
  multiple = false,
  preview = true,
  className = "",
  hint,
  onFileSelect,
  initialPreview = null,
  dark = false,
}) {
  const methods = useFormContext();
  const control = controlProp || (methods && methods.control);
  const error = methods?.formState?.errors?.[name];

  // local previews array: { url, name, size, type, fromServer:boolean }
  const [previews, setPreviews] = useState(() => {
    if (!initialPreview) return [];
    if (Array.isArray(initialPreview)) {
      return initialPreview.map((p) =>
        typeof p === "string" ? { url: p, name: "", size: 0, fromServer: true } : { ...p, fromServer: true }
      );
    }
    // single string
    return [{ url: initialPreview, name: "", size: 0, fromServer: true }];
  });

  // track created object URLs so we can revoke
  const createdUrls = useRef([]);

  useEffect(() => {
    // if initialPreview prop changes, replace previews accordingly
    if (!initialPreview) {
      setPreviews([]);
      return;
    }
    if (Array.isArray(initialPreview)) {
      setPreviews(initialPreview.map((p) => (typeof p === "string" ? { url: p, name: "", size: 0, fromServer: true } : { ...p, fromServer: true })));
    } else {
      setPreviews([{ url: initialPreview, name: "", size: 0, fromServer: true }]);
    }
  }, [initialPreview]);

  useEffect(() => {
    return () => {
      // cleanup created object URLs on unmount
      createdUrls.current.forEach((u) => {
        try {
          URL.revokeObjectURL(u);
        } catch {}
      });
      createdUrls.current = [];
    };
  }, []);

  const selectClass = dark ? (error ? inputErrorDark : inputDefaultDark) : (error ? inputError : inputDefault);
  const labelClassToUse = dark ? labelDark : labelClass;
  const hintClassToUse = dark ? hintTextDark : hintText;

  // shared change handler (for uncontrolled immediate upload)
  const handleFiles = (filesList, onChangeFn) => {
    if (!filesList) {
      if (onChangeFn) onChangeFn(multiple ? [] : null);
      setPreviews([]);
      return;
    }

    if (multiple) {
      const arr = Array.from(filesList);
      if (onChangeFn) onChangeFn(arr);
      if (preview) {
        // revoke previous created urls
        createdUrls.current.forEach((u) => URL.revokeObjectURL(u));
        createdUrls.current = [];
        const p = arr.map((f) => {
          const url = f.type && f.type.startsWith("image/") ? URL.createObjectURL(f) : null;
          if (url) createdUrls.current.push(url);
          return { url, name: f.name, size: f.size, type: f.type, fromServer: false };
        });
        setPreviews(p);
      }
    } else {
      const file = filesList[0] || null;
      if (onChangeFn) onChangeFn(file);
      if (preview) {
        createdUrls.current.forEach((u) => URL.revokeObjectURL(u));
        createdUrls.current = [];
        if (file && file.type && file.type.startsWith("image/")) {
          const url = URL.createObjectURL(file);
          createdUrls.current.push(url);
          setPreviews([{ url, name: file.name, size: file.size, type: file.type, fromServer: false }]);
        } else {
          setPreviews([]);
        }
      }
    }
  };

  // If control is provided we render Controller-managed input
  if (control) {
    return (
      <div className={`${wrapper} ${className}`}>
        {label && <label className={labelClassToUse}>{label}</label>}

        <Controller
          name={name}
          control={control}
          rules={rules}
          defaultValue={multiple ? [] : null}
          render={({ field: { onChange } }) => (
            <>
              <input
                type="file"
                accept={accept}
                multiple={multiple}
                onChange={(e) => {
                  const files = e.target.files;
                  handleFiles(files, onChange);
                  // also call external callback if provided
                  if (onFileSelect) {
                    if (multiple) onFileSelect(Array.from(files || []));
                    else onFileSelect(files?.[0] || null);
                  }
                }}
                className={selectClass}
              />

              {hint && <p className={hintClassToUse}>{hint}</p>}

              {preview && previews && previews.length > 0 && (
                <div className="mt-3 grid grid-cols-4 gap-3">
                  {previews.map((p, idx) => (
                    <div key={idx} className="border rounded p-2 flex flex-col items-center text-xs bg-white/5">
                      {p.url ? (
                        <img src={p.url} alt={p.name || `preview-${idx}`} className="w-24 h-24 object-cover rounded" />
                      ) : (
                        <div className="w-24 h-24 flex items-center justify-center bg-gray-100 rounded">
                          <span className="text-xs">No preview</span>
                        </div>
                      )}
                      <div className="mt-2 text-center break-all text-gray-200">
                        <div className="font-medium">{p.name || "file"}</div>
                        <div className="text-gray-400">{p.size ? `${Math.round(p.size / 1024)} KB` : ""}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        />

        {error && <p className={errorText}>{error.message || "File required"}</p>}
      </div>
    );
  }

  // fallback uncontrolled input -> calls onFileSelect when user picks a file
  return (
    <div className={`${wrapper} ${className}`}>
      {label && <label className={labelClassToUse}>{label}</label>}

      <input
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={(e) => {
          const files = e.target.files;
          handleFiles(files, null);
          if (onFileSelect) {
            if (multiple) onFileSelect(Array.from(files || []));
            else onFileSelect(files?.[0] || null);
          }
        }}
        className={selectClass}
      />

      {hint && <p className={hintClassToUse}>{hint}</p>}

      {preview && previews && previews.length > 0 && (
        <div className="mt-3 grid grid-cols-4 gap-3">
          {previews.map((p, idx) => (
            <div key={idx} className="border rounded p-2 flex flex-col items-center text-xs bg-white/5">
              {p.url ? (
                <img src={p.url} alt={p.name || `preview-${idx}`} className="w-24 h-24 object-cover rounded" />
              ) : (
                <div className="w-24 h-24 flex items-center justify-center bg-gray-100 rounded">
                  <span className="text-xs">No preview</span>
                </div>
              )}
              <div className="mt-2 text-center break-all text-gray-200">
                <div className="font-medium">{p.name || "file"}</div>
                <div className="text-gray-400">{p.size ? `${Math.round(p.size / 1024)} KB` : ""}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {error && <p className={errorText}>{error.message || "File required"}</p>}
    </div>
  );
}
