import requests

url = "http://api.funtranslations.com/translate/morse?text=I'm%20Diogo%20Mello" #Traduzindo eu sou Diogo Mello para código morsa

requisicao = requests.get(url)
resposta = requisicao.json()
print(resposta)
print()

url = "http://api.funtranslations.com/translate/dolan?text=I'm%20a%20developer" #Traduzindo eu Sou um desenvolvedor para Dolan
requisicao = requests.get(url)
resposta = requisicao.json()
print(resposta)
print()
