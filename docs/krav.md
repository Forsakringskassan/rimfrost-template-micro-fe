# Krav — Mikrofrontend-mall (TMFE)

## Bakgrund och syfte

Detta är en mall, inte en driftsatt tjänst. Den ger ett team en färdig utgångspunkt för att
bygga en ny regel-mikrofrontend i Rimfrost-plattformen: en fungerande module federation-uppsättning, ett exempel på komponent-, tillstånds- och testmönster, samt konfigurationsstruktur för lokal utveckling och containerdrift. Syftet är att nya mikrofrontends ska kunna skapas snabbt och konsekvent, utan att varje team behöver lösa samma infrastrukturfrågor på nytt.

---

## Intressenter och aktörer

| Aktör | Roll |
|---|---|
| Utvecklingsteam | Klonar/kopierar mallen för att skapa en ny mikrofrontend |
| Handläggarportalen (värdapplikation) | Kommer att ladda in den färdiga mikrofrontenden som skapas från mallen |
| Handläggare | Slutanvändare av en färdig mikrofrontend byggd på mallen (inte av mallen själv) |

---

## Funktionella krav

### TMFE-FR-01 — module federation

- **TMFE-FR-01.1** Mallen ska tillhandahålla en färdig module federation-konfiguration som
  exponerar en exempelkomponent för inladdning av en värdapplikation.
- **TMFE-FR-01.2** Mallen ska demonstrera hur en mikrofrontend tar emot uppgiftens
  identifierare som indata från värdapplikationen.
- **TMFE-FR-01.3** Mallen ska demonstrera hur en mikrofrontend signalerar att en uppgift är
  slutförd till värdapplikationen.

### TMFE-FR-02 — Exempelmönster för integration och tillstånd

- **TMFE-FR-02.1** Mallen ska tillhandahålla exempel på hur anrop mot en dedikerad BFF görs och
  felhanteras.
- **TMFE-FR-02.2** Mallen ska tillhandahålla ett exempel på tillståndshantering som en ny
  mikrofrontend kan utgå från.
- **TMFE-FR-02.3** Mallen ska tillhandahålla ett fristående förhandsgranskningsläge så att en
  utvecklare kan se sin komponent utan att värdapplikationen körs.

### TMFE-FR-03 — Konfiguration för olika miljöer

- **TMFE-FR-03.1** Mallen ska demonstrera hur konfiguration läses från byggtidsvariabler vid
  lokal utveckling och från körtidsinjicerad konfiguration i containerdrift, utan att koden i
  övrigt behöver skilja på dessa fall.

---

## Icke-funktionella krav

### TMFE-NFR-01 — Testbarhet

- **TMFE-NFR-01.1** Mallen ska tillhandahålla ett fungerande exempel på enhetstester för
  komponenter, tillståndshantering och integrationsanrop, som ett team kan följa för nya
  mikrofrontends.

---

## API-gränssnitt (översikt)

| API | Målgrupp | Specifikationsartefakt |
|---|---|---|
| Exempel-BFF-anrop | Illustrativt, ingen riktig tjänst | Ingen specifikation — ersätts av den nya mikrofrontendens riktiga BFF-kontrakt |

---

## Integration med den mikrofrontend-mall-bff

Mallen är avsedd att parkopplas med motsvarande BFF-mall. En färdig mikrofrontend byggd på
denna mall ska ersätta exempelanropen med anrop mot sin egen, dedikerade BFF.
