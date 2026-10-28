<script setup lang="ts">
  import { computed } from 'vue';
  import { useProductStore } from '../stores/ExampleStore';
  import { FButton } from '@fkui/vue';

  const { handlaggningId } = defineProps<{
    handlaggningId: string;
  }>();

  const productStore = useProductStore();
  const count = computed(() => productStore.count);
  const error = computed(() => productStore.error);
</script>

<template>
  <div class="container">
      <p v-if="error" class="error-message">{{ error }}</p>
      <h2>Handläggnings-ID: {{ handlaggningId }}</h2>
      <p>Räknare: {{ count }}</p>
    <FButton @click="productStore.increaseCount">Öka räknare</FButton>
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
}
</style>
