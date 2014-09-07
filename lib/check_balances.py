import json
import requests
from requests.auth import HTTPBasicAuth

url = "http://localhost:14000/api/"
headers = {'content-type': 'application/json'}
auth = HTTPBasicAuth('rpc', 'foo')

#Fetch all balances for all assets for a specific address, using keyword-based arguments
payload = {
  "method": "get_balances",
  "params": {"filters": {'field': 'address', 'op': '==', 'value': "miEqHpNNQWejM4aL8MUApUcDRh51PzDaed"}},
  "jsonrpc": "2.0",
  "id": 0,
}
response = requests.post(
  url, data=json.dumps(payload), headers=headers, auth=auth).json()
print("GET_BALANCES RESULT: ", response)


#Send 1 XCP (specified in satoshis) from one address to another (you must have the sending address in your bitcoind wallet
# and it will be broadcast as a multisig transaction
payload2 = {
  "method": "create_send",
  "params": {"source": "miEqHpNNQWejM4aL8MUApUcDRh51PzDaed", 
  			 "destination": "mnedNAgowyPETk2ym4a3b8sCyzh65wEuiA",
  			 "asset": "XCP", 
  			 "quantity": 100000000},
  "jsonrpc": "2.0",
  "id": 0,
}
unsigned_tx = requests.post(url, data=json.dumps(payload2), headers=headers, auth=auth).json()
print("\nCREATE_SEND RESULT: ", unsigned_tx)
