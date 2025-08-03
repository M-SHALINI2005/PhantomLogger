# 🔍 PhantomLogger

**PhantomLogger** is a powerful Digital Forensics & Incident Response (DFIR) web application that analyzes system log files to detect suspicious activity such as unauthorized access, malware execution, and log tampering. It uses a combination of pattern matching and AI explanations to help security analysts quickly understand potential threats.

---

## Features

- **Secure Log Upload**: Upload `.log` or `.txt` files for analysis.
- **Suspicious Activity Detection**: Detects patterns such as:
  - Unauthorized logins
  - Malware execution commands
  - Log clearance
  - Reverse shell attempts
- **AI-Powered Explanations**: Generates human-readable summaries of suspicious entries.
- **Visual Output**: Displays suspicious logs with severity highlights and explanations.
- **Live Log Viewer**: Monitor logs in real-time (if enabled)

---

## Tech Stack

### Backend (FastAPI)
- **FastAPI** for RESTful APIs
- **Python 3** for log processing and AI logic
- **OpenAI API** for log explanation
- **Regex-based detection** for log pattern matching

### Frontend (React)
- **React** (with hooks)
- **Vite** for fast build tooling
- **Vanilla CSS** for styling
- **Axios** for API communication
- **React Toastify** for notifications

---

## 📂 Project Structure
PhantomLogger/
├── backend/
│   ├── main.py             # FastAPI entry point
│   ├── detector.py         # Suspicious log detection logic
│   ├── log_watcher.py      # Pattern matching rules for logs
│   ├── ai_explainer.py     # AI explanation logic using OpenAI API
│   ├── test_upload.py      # Script to test /upload-log endpoint with sample files
│   └── log_samples/        # Folder containing sample .log files
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx         # Main application component (tab interface)
│   │   ├── DropZone.jsx    # Drag-and-drop file upload component
│   │   ├── FileUploader.jsx# Traditional file input upload component
│   │   ├── index.css       # Core styling (no Tailwind used)
│   │   └── main.jsx        # Entry point to render React app
│   ├── index.html          # HTML template
│   ├── package.json        # Project metadata and dependencies
│   └── vite.config.js      # Proxy setup for backend API
│
└── README.md 
