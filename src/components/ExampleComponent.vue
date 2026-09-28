<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { useProductStore } from '../stores/ExampleStore';
  import { FButton } from '@fkui/vue';
  import { type Steg, StegIndikator } from './StegIndikator';
  import StegIndikatorTest from './StegIndikatorTest.vue';

  const { handlaggningId } = defineProps<{
    handlaggningId: string;
  }>();

  const productStore = useProductStore();
  const count = computed(() => productStore.count);
  const error = computed(() => productStore.error);

  const steg: Steg[] = [
    { id: 'yrkande-skapas', rubrik: 'Yrkande skapas', beskrivning: 'Yrkandet har skapats och väntar på maskinell handläggning.' },
    { id: 'maskinell', rubrik: 'Maskinell handläggning', beskrivning: 'Yrkandet genomgår maskinell handläggning.' },
    { id: 'manuell', rubrik: 'Manuell handläggning', beskrivning: 'Yrkandet genomgår manuell handläggning.' },
    { id: 'bekrafta-beslut', rubrik: 'Bekräfta beslut', beskrivning: 'Beslutet är klart och väntar på bekräftelse.' },
    { id: 'meddela-beslut', rubrik: 'Meddela beslut', beskrivning: 'Beslutet har bekräftats och meddelats till berörda parter.' }
  ];
  // Index räknas från 0, så 2 är "Manuell handläggning".
  const aktivtSteg = 2;

  const visaStegTest = ref(false);
</script>

<template>
  <div class="container">
      <StegIndikator class="steg-indikator-exempel" :steg="steg" :aktivt-steg="aktivtSteg" etikett="Handläggningens steg" />
      <p v-if="error" class="error-message">{{ error }}</p>
      <h2>Handläggnings-ID: {{ handlaggningId }}</h2>
      <p>Räknare: {{ count }}</p>
    <div class="knapprad">
      <FButton @click="productStore.increaseCount" style="margin-right: 0.5rem;">Öka räknare</FButton>
      <!-- Native knapp med FKUI:s klasser: FButton läser sina attribut en gång
           när den skapas, så aria-expanded skulle aldrig uppdateras. -->
      <button
        type="button"
        class="button button--secondary button--medium"
        :aria-expanded="visaStegTest"
        aria-controls="steg-indikator-testyta"
        @click="visaStegTest = !visaStegTest"
      >
        {{ visaStegTest ? 'Dölj' : 'Visa' }} testkomponent för stegindikator
      </button>
    </div>
    <div v-if="visaStegTest" id="steg-indikator-testyta" class="steg-test-yta">
      <StegIndikatorTest :visa-rubrik="false" />
    </div>
  </div>
</template>

<style scoped>
.steg-indikator-exempel {
  margin-top: 1.5rem;
}

.error-message {
  color: red;
  font-size: 0.875rem;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  & .knapprad {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.75rem;
  }
}

/* Containern centrerar sitt innehåll, men testytan ska fylla bredden. */
.steg-test-yta {
  align-self: stretch;
  margin-top: 1rem;
  border-top: 1px solid var(--fkds-color-border-weak, #d1d2d3);
}
</style>
