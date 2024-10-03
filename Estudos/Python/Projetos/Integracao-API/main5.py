url = "https://api.thecatapi.com/v1/images/search?limit=1"

import requests

requisicao = requests.get(url)
resposta = requisicao.json()[0]['url']
print(resposta)

# Consumindo API de gatos