# Mallprojekt för Rimfrost micro frontend

## Introduktion
Det här är ett template-projekt för att skapa micro-frontends i Rimfrost-projektet. Utvald komponent exporteras med Module Federation för Vite och kan användas av olika host-projekt som också använder Module Federation.

Information om Module Federation finns [att läsa här](https://module-federation.io/index.html).

Kom ihåg att lägga till alla bibliotek som används i den exporterade komponenten under federation-inställningarna i vite.config.ts.

### Installation
Med Node.js installerat, kör ```npm install``` i en terminal öppen i mappen.

### Kör appen för utveckling
Kör ```npm run dev``` för att testa komponenten under utveckling.

### Build och preview
Kör ```npm run build``` och sedan ```npm run preview``` för att tillgängliggöra den exporterade komponenten för lokal testning