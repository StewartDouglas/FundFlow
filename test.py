import json
import requests
from requests.auth import HTTPBasicAuth

url = "http://localhost:4000/api/"
headers = {'content-type': 'application/json'}
auth = HTTPBasicAuth('rpc', 'foo')

# THIS WORKS
#Fetch all balances for all assets for a specific address, using keyword-based arguments
payload1 = {
  "method": "get_balances",
  "params": {"filters": {'field': 'address', 'op': '==', 'value': "miEqHpNNQWejM4aL8MUApUcDRh51PzDaed"}},
  "jsonrpc": "2.0",
  "id": 0,
}
response = requests.post(
  url, data=json.dumps(payload1), headers=headers, auth=auth).json()
print("GET_BALANCES RESULT: ", response)

payload2 = {
  "method": "create_issuance",
  "params": {"source": "miEqHpNNQWejM4aL8MUApUcDRh51PzDaed",
             #"transfer_destination": None, 
             "asset": "VAJDHGASDDV", 
             "quantity": 10000, 
             "divisible": False,
             "callable_": False,  
             "call_date": 1449878400,
             "call_price": 10,
             "description": "abc" },
  "jsonrpc": "2.0",
  "id": 0,  
}

response2 = requests.post(
  url, data=json.dumps(payload2), headers=headers, auth=auth).json()
print("CREATE_ISSUANCE: ", response2)