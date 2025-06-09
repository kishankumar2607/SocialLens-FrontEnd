import React from "react";
import { useDropzone } from "react-dropzone";

const ImageUploader = ({ images, onUpload, error, errorMessage }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    onDrop: (files) => {
      const withPreview = files.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      );
      onUpload(withPreview);
    },
  });

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-black">
        Upload Images
      </label>
      <div
        {...getRootProps()}
        className={`p-6 border-2 border-dashed rounded-md text-center cursor-pointer transition-colors ${
          isDragActive ? "border-primary text-black" : "border-border-dark text-black"
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive
          ? "Drop images here…"
          : "Drag & drop, or click to select images"}
      </div>
      {error && <p className="text-error text-sm mt-1">{errorMessage}</p>}
    </div>
  );
};

export default ImageUploader;
