# main.py
from fastapi import HTTPException, status
from ai_explainer import explain_logs
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os

from log_watcher import read_logs

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "PhantomLogger API is running ✅"}

@app.get("/analyze-log")
def analyze_log():
    path = os.path.join("log_samples", "sample_log.txt")
    if not os.path.exists(path):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Log file not found. Please upload a log or check the file path."
        )
    try:
        logs = read_logs(path)
        explanation = explain_logs(logs)
        return {
            "suspicious_activity": logs,
            "explanation": explanation
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Internal error during log analysis: {str(e)}"
        )
    logs = read_logs(path)
    return {
        "suspicious_activity": logs,
        "explanation": explain_logs(logs)
    }

@app.post("/upload-log/")
async def upload_log(file: UploadFile = File(...)):
    if not file.filename.endswith((".log", ".txt")):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only .log or .txt files are supported."
        )
    try:
        contents = await file.read()
        lines = contents.decode("utf-8").splitlines()

        suspicious = read_logs_from_lines(lines)
        explanation = explain_logs(suspicious)

        return {
            "suspicious_activity": suspicious,
            "explanation": explanation,
            "full_log": lines
        }

    except UnicodeDecodeError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Unable to decode the uploaded file. Make sure it is a valid UTF-8 log file."
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while processing the file: {str(e)}"
        )



if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
from fastapi.responses import JSONResponse

@app.post("/export-json/")
async def export_suspicious_as_json(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        lines = contents.decode("utf-8").splitlines()
        suspicious_entries = read_logs_from_lines(lines)
        return JSONResponse(content={"suspicious": suspicious_entries})
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

