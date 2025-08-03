import { useState } from "react";

function DropZone({ onUpload }) {
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");

  const handleFileChange = async (file) => {
    setError("");
    if (!file || !file.name.match(/\.(log|txt)$/i)) {
      setError("Only .log or .txt files allowed.");
      return;
    }

    setUploading(true);
    setFileName(file.name);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/upload-log", {
      method: "POST",
      body: formData,
    });
      if (!res.ok) {
        const errorText = await res.text();
        console.error("Upload failed:", res.status, errorText);
        throw new Error("Failed to upload file.");
      }

      const data = await res.json();
      onUpload(data); // Send result to parent
    } catch (err) {
      console.error(err);
      setError("Failed to upload file. Check server.");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  };

  return (
    <div
      className={`p-10 border-2 rounded-xl border-dashed transition ${
        dragOver ? "border-cyan-400 bg-cyan-900/20" : "border-cyan-700"
      } text-center text-cyan-200 font-incon`}
      onDrop={handleDrop}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
    >
      <p className="text-xl font-semibold mb-4">
        Drag and drop a <code>.log</code> or <code>.txt</code> file here
      </p>

    <input
      type="file"
      accept=".log,.txt"
      className="hidden"
      id="fileInput"
      onClick={(e) => (e.target.value = null)} // 👈 this line forces file re-selection
      onChange={(e) => handleFileChange(e.target.files[0])}
    />


      <label
        htmlFor="fileInput"
        className="inline-block cursor-pointer bg-cyan-500 text-black font-bold py-2 px-5 rounded-lg hover:bg-cyan-300 hover:scale-105 transition-transform shadow-md"
      >
        Or click to select a file
      </label>

      {fileName && (
        <p className="mt-3 text-sm text-cyan-300">Selected: {fileName}</p>
      )}

      {uploading && (
        <p className="text-yellow-400 mt-3 animate-pulse">Uploading...</p>
      )}

      {error && <p className="text-red-500 mt-3 font-semibold">{error}</p>}
    </div>
  );
}

export default DropZone;
