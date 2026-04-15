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

<<<<<<< Updated upstream
  const catFact = ref('');
  const catLoading = ref(false);

=======
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
  }

  async function fetchCatFact() {
    catLoading.value = true;
    error.value = '';

    try {
      const bffUrl = import.meta.env.VITE_BFF_URL || 'http://localhost:9003';
      const response = await fetch(`${bffUrl}/api/cat-fact`);
      if (!response.ok) {
        throw new Error('Failed to fetch cat fact');
      }
      const responseData = await response.json();
      catFact.value = responseData.data[0];
    } catch (err) {
      error.value = 'Ett fel uppstod vid hämtning av kattfakta';
      console.error(err);
    } finally {
      catLoading.value = false;
    }
=======
>>>>>>> Stashed changes
  }
</script>

<template>
  <div class="container">
      <ProgressBar :steps-information="stepsInformation" />
<<<<<<< Updated upstream
=======
      <h2>Handläggnings-ID: {{ handlaggningId }}</h2>
>>>>>>> Stashed changes
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
