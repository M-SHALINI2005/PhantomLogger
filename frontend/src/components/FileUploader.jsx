// components/FileUploader.jsx
import { useState } from "react";

function FileUploader({ onUpload }) {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:8000/upload-log/", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.error) {
        setMessage("❌ Upload failed: " + data.error);
      } else {
        setMessage("✅ " + data.message + ": " + data.filename);
        onUpload(data);
      }

    } catch (err) {
      console.error(err);
      setMessage("❌ Upload error: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="text-white">
      <input type="file" onChange={handleUpload} accept=".log,.txt" />
      {uploading && <p>Uploading...</p>}
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}

export default FileUploader;
