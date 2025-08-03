# test_upload.py

import requests

url = "http://127.0.0.1:8000/upload-log/"
files = {'file': open("log_samples/sample_log.txt", 'rb')}

response = requests.post(url, files=files)
print(response.status_code)
print(response.json())

