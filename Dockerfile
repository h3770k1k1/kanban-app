# Etap budowania aplikacji
FROM node:18-alpine AS builder

# Ustalamy katalog roboczy w kontenerze
WORKDIR /app

# Kopiujemy tylko pliki package.json i package-lock.json, aby zoptymalizować cache
COPY package*.json ./

# Instalujemy zależności, ale tylko te wymagane do budowania aplikacji
RUN npm install --only=production

# Kopiujemy resztę plików aplikacji
COPY . .

# Budujemy aplikację (dla frameworków jak React, Next.js itp.)
RUN npm run build

# Etap produkcyjny - tworzymy lekki obraz
FROM node:18-alpine

# Ustalamy katalog roboczy w kontenerze
WORKDIR /app

# Kopiujemy tylko niezbędne pliki z obrazu buildera
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/build ./build

# Ustawiamy zmienną środowiskową na produkcję
ENV NODE_ENV=production

# Otwieramy port, na którym działa aplikacja
EXPOSE 3000

# Uruchamiamy aplikację
CMD ["node", "build/server.js"]
