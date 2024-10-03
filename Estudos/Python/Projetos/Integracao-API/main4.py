url = "https://api.kanye.rest"

import requests

requisicao = requests.get(url)
resposta = requisicao.json()['quote']

print(resposta)

# Consumindo uma API de pérolas ditas pelo Kanye West