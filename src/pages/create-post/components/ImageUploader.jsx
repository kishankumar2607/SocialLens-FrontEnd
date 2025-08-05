import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

const ImageUploader = ({ images, onUpload, error, errorMessage }) => {
  const [localError, setLocalError] = useState("");

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [],
      "application/pdf": [],
      "application/msword": [],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [],
    },
    onDrop: (acceptedFiles) => {
      const withPreview = acceptedFiles.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      );
      setLocalError(""); // Clear previous errors
      onUpload(withPreview);
    },
    onDropRejected: (rejectedFiles) => {
      if (rejectedFiles && rejectedFiles.length > 0) {
        setLocalError("Only images, PDFs, or Word documents are allowed.");
      }
    },
  });

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-black">
        Upload Files (Images, PDF, Word)
      </label>
      <div
        {...getRootProps()}
        className={`p-6 border-2 border-dashed rounded-md text-center cursor-pointer transition-colors ${
          isDragActive
            ? "border-primary text-black"
            : "border-border-dark text-black"
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive
          ? "Drop files here…"
          : "Drag & drop, or click to select images, PDFs, or Word docs"}
      </div>
      {error && <p className="text-error text-sm mt-1">{errorMessage}</p>}
      {localError && <p className="text-error text-sm mt-1">{localError}</p>}
    </div>
  );
};

export default ImageUploader;
