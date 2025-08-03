# backend/ai_explainer.py

import openai
import os
from dotenv import load_dotenv

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

def explain_logs(suspicious_logs):
    prompt = (
        "You are a cybersecurity analyst helping explain suspicious log events to junior analysts.\n"
        "For each event below, explain what is happening, why it's suspicious, and what it could indicate.\n\n"
    )
    for log in suspicious_logs:
        prompt += f"- Line {log['line']} | Entry: \"{log['raw']}\" | Reason: {log['message']}\n"

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.3,
        max_tokens=500
    )

    explanation = response['choices'][0]['message']['content']
    return explanation

