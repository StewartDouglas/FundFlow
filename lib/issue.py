import json
import requests
from requests.auth import HTTPBasicAuth
 
url = "http://localhost:14000/api/"
headers = {'content-type': 'application/json'}
auth = HTTPBasicAuth('rpc', 'foo')
 
payload = {
  "method": "create_issuance",
  "params": {"source": sys.argv[2],
             "asset": sys.argv[3],
             "quantity": 100000,
             "divisible": False,   
             "description": sys.argv[1], 
             "callable_": False,     
             "call_date": None,   
             "call_price": None,                                                                    
             "destination": None,
             "encoding" : "multisig",
             "allow_unconfirmed_inputs": False,
             "fee": None, 
             "fee_per_kb":10000,
            },
  "jsonrpc": "2.0",
  "id": 0,  
}
 
response = requests.post(
  url, data=json.dumps(payload), headers=headers, auth=auth).json()
print("CREATE_ISSUANCE: ", response)