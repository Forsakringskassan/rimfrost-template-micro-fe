<script setup lang="ts">
  import { computed } from 'vue';
  import { useProductStore } from '../stores/ExampleStore';
  import { FButton } from '@fkui/vue';
  import { type Steg, StegIndikator } from './StegIndikator';

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
</script>

<template>
  <div class="container">
      <StegIndikator :steg="steg" :aktivt-steg="aktivtSteg" etikett="Handläggningens steg" />
      <p v-if="error" class="error-message">{{ error }}</p>
      <h2>Handläggnings-ID: {{ handlaggningId }}</h2>
      <p>Räknare: {{ count }}</p>
    <div>
      <FButton @click="productStore.increaseCount" style="margin-right: 0.5rem;">Öka räknare</FButton>
    </div>
  </div>
</template>

<style scoped>
.error-message {
  color: red;
  font-size: 0.875rem;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  & div {
    display: flex;
    gap: 0.75rem;
  }
}
</style>
