# Teknisk spec — Mikrofrontend-mall (TMFE)

## Översikt

Vue 3 + TypeScript-mall för en module federations-mikrofrontend, med Pinia för tillstånd och
Vitest för testning. Ingen egen routing, ingen databas, ingen meddelandeintegration. Avsedd att
kopieras, inte driftsättas som den är.

## Komponentstruktur

```text
src/
├── App.vue                  # Fristående dev-skal som simulerar portalens layout
├── components/
│   ├── ExampleComponent.vue   # Exponerad exempelkomponent (den enda federerade modulen)
│   └── ProgressBar.vue        # Presentationsexempel
├── stores/ExampleStore.ts     # Pinia-exempel
├── utils/                     # Exempel på fetch mot BFF, med felhantering
└── config/env.ts               # Enhetlig läsning av bygg-/körtidskonfiguration
```

## API-specifikationer

Illustrativa exempelanrop, ingen riktig specifikation:

| Metod | Sökväg | Beskrivning |
|---|---|---|
| POST | `/api/task` | Exempel: hämta uppgiftsdata |
| GET | `/api/uppgiftsbeskrivning` | Exempel: hämta hjälptext |

## Kafka-integration

Ingen. Mallen ger inget exempel på meddelandeintegration.

## Konfiguration

| Egenskap | Beskrivning | Standardvärde |
|---|---|---|
| `VITE_BFF_URL` | BFF-url vid lokal utveckling | `http://localhost:9009` |
| `RUNTIME_BFF_URL` (`window.__TEMPLATE_MICRO_FE_ENV__`) | BFF-url vid körning i container | — |
| `VITE_DEV_HANDLAGGNING_ID` | Fallback-id vid fristående utvecklingsläge | — |

## Liveness

Ingen egen hälsokontroll — statisk frontend, hälsa avgörs av webbservern som serverar den.

## Kända begränsningar och framtida arbete

| Begränsning | Föreslagen åtgärd |
|---|---|
| README saknar dokumentation av `src/types.ts`, som inte finns i mallen | Uppdatera README eller lägg till filen |
| `vue-router` är ett beroende men används inte i mallen | Ta bort beroendet eller lägg till ett minimalt routingexempel |
| Exempel på integrationsanrop är inte kopplade till exempelkomponenten | Koppla in dem eller förtydliga att de är fristående mönsterexempel |
| Ingen licensinformation ifylld | Fyll i innan mallen används som grund för nya repon |
