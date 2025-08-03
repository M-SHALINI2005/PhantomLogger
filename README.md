# PhantomLogger
DFIR project

# PhantomLogger
DFIR project

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
