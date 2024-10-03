import requests

url = 'https://api.chucknorris.io/jokes/random?category=animal'

requisicao = requests.get(url)
resposta = requisicao.json()
piada = resposta['value']
print(resposta)
print()
print(piada)

# Consumindo API de piadas do Chuck Norris