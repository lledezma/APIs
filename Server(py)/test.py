import requests 

BASE = "http://127.0.0.1:3000/search/"

response = requests.get(BASE + "1")
print(response.json())
input()



