<script setup lang="ts">
import { computed, ref } from "vue";
import { FButton } from "@fkui/vue";
import { type Steg, StegIndikator } from "./StegIndikator";

// Testyta för stegindikatorn. Exponeras som egen modul så att portalen kan
// ladda den via Module Federation.

// visaRubrik: false när testytan bäddas in på en sida som redan har en rubrik.
withDefaults(defineProps<{ visaRubrik?: boolean }>(), { visaRubrik: true });

const exempelSteg: Steg[] = [
  {
    id: "kontakt",
    rubrik: "Kontaktuppgifter",
    beskrivning: "Den sökandes telefonnummer och e-post är bekräftade.",
  },
  {
    id: "uppgifter",
    rubrik: "Uppgifter om ärendet",
    beskrivning: "Grundläggande uppgifter om ärendet är registrerade.",
  },
  {
    id: "adress",
    rubrik: "Adress",
    beskrivning: "Folkbokföringsadressen kontrolleras mot Skatteverket.",
  },
  {
    id: "verifiering",
    rubrik: "Verifiering",
    beskrivning: "Handläggaren verifierar underlaget innan beslut fattas.",
  },
];

const aktivtExempel = ref(2);
const valtExempel = ref<number | null>(null);

const antal = ref(6);
const aktivtDynamiskt = ref(1);
const dynamiskaSteg = computed<Steg[]>(() =>
  Array.from({ length: antal.value }, (_, i) => ({
    id: `steg-${i + 1}`,
    rubrik: `Steg ${i + 1}`,
    beskrivning: `Detaljer om steg ${i + 1}.`,
  })),
);

function laggTill(): void {
  antal.value++;
}

function taBort(): void {
  if (antal.value <= 1) {
    return;
  }
  antal.value--;
  aktivtDynamiskt.value = Math.min(aktivtDynamiskt.value, antal.value);
}

function forega(): void {
  aktivtDynamiskt.value = Math.max(0, aktivtDynamiskt.value - 1);
}

function nasta(): void {
  aktivtDynamiskt.value = Math.min(antal.value, aktivtDynamiskt.value + 1);
}
</script>

<template>
  <div class="steg-test">
    <h1 v-if="visaRubrik">Testyta: stegindikator</h1>

    <section class="steg-test__del">
      <h2 class="h3">Exempel med fyra steg</h2>
      <p>Klicka på ett steg för att visa mer information.</p>
      <div class="steg-test__kort">
        <StegIndikator
          v-model:valt-steg="valtExempel"
          :steg="exempelSteg"
          :aktivt-steg="aktivtExempel"
          etikett="Handläggningens steg"
        >
          <template #detaljer="{ steg, status }">
            <p class="steg-test__slot">
              {{ steg.beskrivning }}
              <template v-if="status === 'aktiv'">
                Det här är steget som pågår just nu.
              </template>
            </p>
          </template>
        </StegIndikator>
      </div>
    </section>

    <section class="steg-test__del">
      <h2 class="h3">Justerbar bredd</h2>
      <p>
        Dra i hörnet nere till höger för att ändra bredden. Indikatorn blir
        vertikal när stegen inte längre får plats.
      </p>
      <div class="steg-test__kort steg-test__kort--justerbar">
        <StegIndikator :steg="dynamiskaSteg" :aktivt-steg="aktivtDynamiskt" />
      </div>
      <div class="steg-test__kontroller">
        <FButton variant="secondary" size="small" @click="taBort">
          Ta bort steg
        </FButton>
        <FButton variant="secondary" size="small" @click="laggTill">
          Lägg till steg
        </FButton>
        <FButton variant="secondary" size="small" @click="forega">
          Föregående steg
        </FButton>
        <FButton variant="secondary" size="small" @click="nasta">
          Nästa steg
        </FButton>
        <span>{{ antal }} steg, aktivt steg: {{ aktivtDynamiskt + 1 }}</span>
      </div>
    </section>

    <section class="steg-test__del">
      <h2 class="h3">Tvingad vertikal</h2>
      <div class="steg-test__kort">
        <StegIndikator
          :steg="exempelSteg"
          :aktivt-steg="1"
          orientering="vertikal"
        />
      </div>
    </section>
  </div>
</template>

<style scoped>
.steg-test {
  padding: 1.5rem 0 3rem;
}

.steg-test__del {
  margin-bottom: 2.5rem;
}

.steg-test__kort {
  padding: 1.5rem;
  border-radius: var(--f-border-radius-medium, 0.5rem);
  background: var(--fkds-color-background-primary, #fff);
  box-shadow: 0 1px 4px rgb(0 0 0 / 12%);
}

.steg-test__kort--justerbar {
  resize: horizontal;
  overflow: auto;
  min-width: 12rem;
  max-width: 100%;
}

.steg-test__kontroller {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem 1rem;
  margin-top: 1rem;
}

.steg-test__kontroller :deep(.button) {
  margin: 0;
}

.steg-test__slot {
  margin: 0;
}
</style>
