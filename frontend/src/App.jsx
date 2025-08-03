import { useState } from "react";
import DropZone from "./components/DropZone";
import FileUploader from "./components/FileUploader";

function App() {
  const [activeTab, setActiveTab] = useState("Live Logs");
  const [logs, setLogs] = useState([]);
  const [explanation, setExplanation] = useState('');
  const [loading, setLoading] = useState(false);
  const [fullLog, setFullLog] = useState([]);

  const runAnalysis = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/analyze-log");
      const data = await response.json();
      setLogs(data.suspicious_activity || []);
      setExplanation(data.explanation || '');
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-black text-[#00bfff] font-incon">

      {/* Sidebar */}
      <aside className="w-60 bg-[#0f172a] p-6 border-r border-cyan-800">
        <h1 className="text-2xl font-bold mb-8 hover:text-cyan-400 transition">PhantomLogger</h1>
        <nav className="space-y-4">
          {["Live Logs", "Upload Logs", "Settings"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`block w-full text-left px-3 py-2 rounded-md hover:bg-cyan-800/30 transition ${
                activeTab === tab ? "bg-cyan-800/40 text-white font-bold" : ""
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        <header className="mb-8">
          <h2 className="text-4xl font-semibold">{activeTab}</h2>
          <p className="text-sm text-cyan-300 uppercase tracking-wider">DFIR Interface</p>
        </header>

        {/* Live Logs Tab */}
        {activeTab === "Live Logs" && (
          <section className="space-y-6">
            <button
              onClick={runAnalysis}
              className="bg-[#00bfff] text-black font-semibold px-6 py-3 rounded-md hover:bg-cyan-300 hover:scale-105 transition-transform shadow-xl"
            >
              Run Log Analysis
            </button>

            <div className="bg-[#0f172a] p-5 rounded-xl border border-cyan-500">
              <h3 className="text-xl font-semibold mb-3 border-b border-cyan-700 pb-2">Suspicious Log Entries</h3>
              {loading ? (
                <p className="text-yellow-400 animate-pulse">Analyzing logs...</p>
              ) : logs.length > 0 ? (
                <ul className="space-y-2">
                  {logs.map((entry, index) => {
                    const severityColor =
                      entry.severity >= 5
                        ? "bg-red-600 text-white"
                        : entry.severity >= 3
                        ? "bg-yellow-400 text-black"
                        : "bg-green-500 text-black";

                    return (
                      <li
                        key={index}
                        className={`p-2 rounded-md flex justify-between items-center ${severityColor} border border-white`}
                      >
                        <span>
                          Line {entry.line}: {entry.message}
                        </span>
                        <span className="text-xs font-bold">Severity: {entry.severity}</span>
                      </li>

                    );
                  })}
                </ul>
              ) : (
                <p className="text-gray-500 italic">No log data yet.</p>
              )}
            </div>

            {explanation && (
              <div className="bg-[#1e293b] p-5 border-l-4 border-blue-400 rounded-md shadow-md">
                <h3 className="text-lg font-semibold text-cyan-300 mb-2">AI Explanation</h3>
                <p className="text-white">{explanation}</p>
              </div>
            )}

            {/* Full Log Viewer */}
            {fullLog.length > 0 && (
              <div className="bg-[#0f172a] mt-6 p-4 rounded-md border border-cyan-700 overflow-y-auto max-h-96">
                <h3 className="text-cyan-300 font-semibold mb-2">Full Log Viewer</h3>
                <pre className="text-sm text-left font-mono space-y-1">
                  {fullLog.map((line, index) => {
                    const isSuspicious = logs.some((entry) => entry.line === index + 1);
                    return (
                      <div
                        key={index}
                        className={`px-2 py-1 rounded-md ${
                          isSuspicious ? "bg-red-800/60 text-red-300 font-semibold" : "text-cyan-100"
                        } hover:bg-cyan-800/30 transition`}
                      >
                        <span className="text-cyan-500 mr-2">
                          {String(index + 1).padStart(3, "0")}:
                        </span>
                        {line}
                      </div>
                    );
                  })}
                </pre>
              </div>
            )}
          </section>
        )}

        {/* Upload Logs Tab */}
        {activeTab === "Upload Logs" && (
          <section className="space-y-6">
            <FileUploader
              onUpload={(data) => {
                setLogs(data.suspicious_activity || []);
                setExplanation(data.explanation || "");
                setFullLog(data.full_log || []);
                setActiveTab("Live Logs");
              }}
            />
          </section>
        )}

        {/* Settings Tab */}
        {activeTab === "Settings" && (
          <section className="space-y-4">
            <div className="bg-[#0f172a] p-5 rounded-lg border border-cyan-700">
              <p className="text-cyan-400">Settings coming soon — theme, API endpoint, and more!</p>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;

