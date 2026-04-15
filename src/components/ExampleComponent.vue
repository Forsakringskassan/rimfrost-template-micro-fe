<script setup lang="ts">
  import { computed } from 'vue';
  import { useProductStore } from '../stores/ExampleStore';
  import { FButton } from '@fkui/vue';
  import ProgressBar from './ProgressBar.vue';

  const { handlaggningId } = defineProps<{
    handlaggningId: string;
  }>();

  const productStore = useProductStore();
  const count = computed(() => productStore.count);

  const stepsInformation = {
    totalSteps: 5,
    currentStep: 3,
    steps: [
      { label: 'Yrkande skapas', tooltip: 'Yrkandet har skapats och väntar på maskinell handläggning.' },
      { label: 'Maskinell handläggning', tooltip: 'Yrkandet genomgår maskinell handläggning.' },
      { label: 'Manuell handläggning', tooltip: 'Yrkandet genomgår manuell handläggning.' },
      { label: 'Bekräfta beslut', tooltip: 'Beslutet är klart och väntar på bekräftelse.' },
      { label: 'Meddela beslut', tooltip: 'Beslutet har bekräftats och meddelats till berörda parter.' }
    ]
  }
</script>

<template>
  <div class="container">
      <ProgressBar :steps-information="stepsInformation" />
      <h2>Handläggnings-ID: {{ handlaggningId }}</h2>
      <p>Räknare: {{ count }}</p>
    <div>
      <FButton @click="productStore.increaseCount" style="margin-right: 0.5rem;">Öka räknare</FButton>
    </div>
  </div>
</template>

<style scoped>
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
