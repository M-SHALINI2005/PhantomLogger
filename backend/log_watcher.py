import re

# 💡 Configurable detection rules
DETECTION_RULES = [
    {
        "type": "keyword",
        "keyword": "unauthorized access",
        "message": "Unauthorized access attempt",
        "severity": 3,
        "tag": "unauthorized_access"
    },
    {
        "type": "keyword",
        "keyword": "failed login",
        "message": "Failed login attempt",
        "severity": 2,
        "tag": "unauthorized_access"
    },
    {
        "type": "regex",
        "pattern": r"malware.*\.exe",
        "message": "Malware executable detected",
        "severity": 5,
        "tag": "unauthorized_access"
    },
    {
        "type": "keyword",
        "keyword": "[MISSING]",
        "message": "Missing log entry",
        "severity": 4,
        "tag": "unauthorized_access"
    },
    {
        "type": "regex",
        "pattern": r"log file cleared|log.*cleared by unknown|cleared the system logs",
        "message": "Log file clearing activity",
        "severity": 4,
        "tag": "unauthorized_access"
    },
    {
        "type": "regex",
        "pattern": r"\[MISSING\]|\blog entry corrupted\b",
        "message": "Log entry missing or corrupted",
        "severity": 4,
        "tag": "unauthorized_access"
    },
    {
        "type": "regex",
        "pattern": r"log file cleared|log.*cleared by unknown|system logs manually",
        "message": "Log tampering or clearing detected",
        "severity": 5,
        "tag": "unauthorized_access"
    },
    {
        "type": "regex",
        "pattern": r"backup.*\.sh",
        "message": "Suspicious backup script execution",
        "severity": 2,
        "tag": "unauthorized_access"
    },
    {
        "type": "regex",
        "pattern": r"\b(192\.168\.1\.\d+)\b",
        "message": "Internal IP address activity",
        "severity": 1,
        "tag": "unauthorized_access"
    },
    {
        "type": "regex",
        "pattern": r"failed login attempt.*from",
        "message": "Brute-force login attempt",
        "severity": 4,
        "tag": "unauthorized_access"
    },
    {
        "type": "keyword",
        "keyword": "admin privileges granted",
        "message": "Potential privilege escalation",
        "severity": 5,
        "tag": "unauthorized_access"
    },
    {
        "type": "regex",
        "pattern": r"reverse shell initiated|nc .* -e /bin/sh",
        "message": "Backdoor or reverse shell attempt",
        "severity": 5,
        "tag": "unauthorized_access"
    }
]

# 🚀 Main function used by FastAPI
def read_logs(filepath):
    suspicious = []
    with open(filepath, "r") as f:
        lines = f.readlines()

    for i, line in enumerate(lines):
        lower_line = line.lower()

        for rule in DETECTION_RULES:
            if rule["type"] == "keyword":
                if rule["keyword"] in lower_line:
                    suspicious.append({
                        "line": i + 1,
                        "message": rule["message"],
                        "raw": line.strip(),
                        "severity": rule.get("severity", 1),
                        "tag": rule.get("tag", "general")
                    })
                    break
            elif rule["type"] == "regex":
                if re.search(rule["pattern"], lower_line):
                    suspicious.append({
                        "line": i + 1,
                        "message": rule["message"],
                        "raw": line.strip(),
                        "severity": rule.get("severity", 1),
                        "tag": rule.get("tag", "general")
                    })
                    break

    return suspicious

def read_logs_from_lines(lines):
    suspicious = []
    for i, line in enumerate(lines):
        lower_line = line.lower()
        for rule in DETECTION_RULES:
            if rule["type"] == "keyword" and rule["keyword"] in lower_line:
                suspicious.append({
                    "line": i + 1,
                    "message": rule["message"],
                    "raw": line.strip(),
                    "severity": rule.get("severity", 1),
                    "tag": rule.get("tag", "general")
                })
                break
            elif rule["type"] == "regex" and re.search(rule["pattern"], lower_line):
                suspicious.append({
                    "line": i + 1,
                    "message": rule["message"],
                    "raw": line.strip(),
                    "severity": rule.get("severity", 1),
                    "tag": rule.get("tag", "general")
                })
                break
    return suspicious



