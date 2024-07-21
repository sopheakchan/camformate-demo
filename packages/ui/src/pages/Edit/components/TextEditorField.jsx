import React, { useState } from "react";
import dynamic from "next/dynamic";
const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});
import "react-quill/dist/quill.snow.css";

import { useField } from "formik";
import { Message } from "./Message";

const modules = {
  toolbar: [
    [{ header: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

export const TextEditorField = ({ label, name }) => {
  const [field, meta, helpers] = useField({ name });

  const handleChange = (value) => {
    helpers.setValue(value);
  };

  return (
    <label className="space-y-2 flex flex-col">
      {label ? <span className="text-base font-medium">{label}</span> : null}
      <QuillNoSSRWrapper
        defaultValue={field.value}
        value={field.value}
        onChange={handleChange}
        modules={modules}
        theme="snow"
      />
      {meta.error && meta.touched ? (
        <Message variant="error">{meta.error}</Message>
      ) : null}
    </label>
  );
};
