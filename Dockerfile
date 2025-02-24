# Używamy Alpine Linux jako bazowego obrazu
FROM node:18-alpine

# Ustalamy katalog roboczy w kontenerze
WORKDIR /app

# Kopiujemy pliki aplikacji do kontenera
COPY . .

# Instalujemy zależności aplikacji
RUN npm install

# Otwieramy port, na którym działa aplikacja
EXPOSE 3000

# Uruchamiamy aplikację
CMD ["npm", "start"]
