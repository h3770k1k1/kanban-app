# Używamy Alpine Linux jako bazowego obrazu
FROM node:18-alpine AS builder

# Ustalamy katalog roboczy w kontenerze
WORKDIR /app

# Kopiujemy tylko pliki package.json i package-lock.json, aby zoptymalizować cache
COPY package*.json ./

# Instalujemy zależności
RUN npm install

# Kopiujemy resztę plików aplikacji
COPY . .

# Budujemy aplikację
RUN npm run build

# Etap produkcyjny - tworzymy lekki obraz
FROM node:18-alpine

# Instalujemy serwer statyczny serve
RUN npm install -g serve

# Ustalamy katalog roboczy w kontenerze
WORKDIR /app

# Kopiujemy pliki z obrazu buildera (zawiera build)
COPY --from=builder /app/build ./build

# Otwieramy port, na którym działa aplikacja
EXPOSE 3000

# Uruchamiamy serwer statyczny na porcie 3000
CMD ["serve", "-s", "build", "-l", "3000"]
