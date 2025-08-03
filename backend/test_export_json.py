import requests

# Set the URL to your new /export-json/ endpoint
url = "http://localhost:8000/export-json/"

# Set the path to your sample log file
file_path = "sample_log.txt"

# Open the file and send a POST request
with open(file_path, "rb") as f:
    files = {"file": (file_path, f)}
    response = requests.post(url, files=files)

# Print the results
print("Status Code:", response.status_code)
print("Response JSON:")
print(response.json())
